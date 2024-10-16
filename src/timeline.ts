import { DrunkAbility, Enemy, Excute, ExcuteByRack, getAbility, Nomination } from './abilities';
import { Drunk as DrunkCharacter } from './characters';
import { copyPlayers, isDeadPlayer } from './common';

export const nextTimeline = (players: BCT.TPlayer[], timelines: BCT.TTimeline[], abilityOrder: string[], options?: { enemy?: string, drunk?: string }) => {
    let lastTimeline = timelines[timelines.length - 1]

    const timeline: BCT.TTimeline = lastTimeline ? {
        turn: lastTimeline.time === "night" ? lastTimeline.turn : lastTimeline.turn + 1,
        time: lastTimeline.time === "day" ? "night" : "day",
        operations: [],
    } : {
        turn: 1,
        time: "night",
        operations: [],
    }

    updateNomination(timelines, players, options)

    timelines.push(timeline)

    setupTimelines(timelines, players, abilityOrder, options)
}

/// need setupTimelines
export const createOperation = (abilityKey: string, effector: number, payload: Record<string, any>, timeline: BCT.TTimeline) => {
    timeline.operations.push({
        abilityKey,
        effector,
        turn: timeline.turn,
        time: timeline.time,
        hasEffect: true,
        payload,
        manual: true
    })
}

/**
 * 更新操作的payload
 * @param timeline 
 * @param operationIdx 
 * @param payload 
 */
export const updatePayload = (timeline: BCT.TTimeline, operationIdx: number, payload: Record<string, any>) => {
    timeline.operations[operationIdx].payload = payload
}

/**
 * 获取每个timeline的初始玩家和受影响的玩家
 * @param timelines 时间线
 * @param players 玩家
 * @returns 每个时间线以及相关操作的初始玩家和受影响的玩家
 */
export const timelinesWithPlayerStatus = (timelines: BCT.TTimeline[], players: BCT.TPlayer[], options?: { drunk?: string, enemy?: string }) => {
    let effectingOperations: BCT.TOperation[] = []
    setupOperationOnGameStart(players, effectingOperations, options)
    const waitOperationPlayers = copyPlayers(players)
    effectingOperations.forEach(opertion => {
        effectManagedOperation(opertion, waitOperationPlayers, timelines)
    })
    const timelinesWithPlayerStatus = timelines.map(timeline => {
        let timelineInitPlayers: BCT.TPlayer[] = []
        const operations = timeline.operations.map(operation => {
            let clearStatusPlayers = copyPlayers(waitOperationPlayers)
            effectingOperations = effectingOperations.filter(operation => clearInvalidEffectingOperations(operation, clearStatusPlayers, timeline))
            effectingOperations.forEach(opertion => {
                effectManagedOperation(opertion, clearStatusPlayers, timelines)
            })
            if (timelineInitPlayers.length) {
                timelineInitPlayers = copyPlayers(clearStatusPlayers)
            }
            const initPlayers = copyPlayers(clearStatusPlayers)
            if (operation.hasEffect) {
                const ability = getAbility(operation.abilityKey)

                if (ability && (!ability.effecting || ability.effecting(operation, clearStatusPlayers, timelines))) {
                    effectingOperations.push(operation)
                    effectManagedOperation(operation, clearStatusPlayers, timelines)
                }

                effectingOperations = effectingOperations.filter(operation => clearInvalidEffectingOperations(operation, clearStatusPlayers, timeline))

                clearStatusPlayers = copyPlayers(waitOperationPlayers)
                effectingOperations.forEach(opertion => {
                    effectManagedOperation(opertion, clearStatusPlayers, timelines)
                })
            }
            const effectedPlayers = copyPlayers(clearStatusPlayers);
            return {
                ...operation,
                initPlayers,
                effectedPlayers
            }
        })
        const firstOperation = operations[0]
        const lastOperation = operations[operations.length - 1]
        const initPlayers = firstOperation ? firstOperation.initPlayers : []
        const effectedPlayers = lastOperation ? lastOperation.effectedPlayers : []
        return {
            ...timeline,
            initPlayers,
            effectedPlayers,
            operations: operations
        }
    })
    return timelinesWithPlayerStatus.reduce((acc, nextTimeline) => {
        const lastTimeline = acc[acc.length - 1]
        if (lastTimeline) {
            nextTimeline.initPlayers = nextTimeline.initPlayers.length ? nextTimeline.initPlayers : lastTimeline.effectedPlayers
            nextTimeline.effectedPlayers = nextTimeline.effectedPlayers.length ? nextTimeline.effectedPlayers : nextTimeline.initPlayers
        }
        acc.push({ ...nextTimeline })
        return acc
    }, [] as typeof timelinesWithPlayerStatus)
}

export const setupTimelines = (timelines: BCT.TTimeline[], players: BCT.TPlayer[], abilityOrder: string[], options?: { enemy?: string, drunk?: string }) => {
    const orderedAbilities = abilityOrder.flatMap(key => getAbility(key) || [])
    let effectingOperations: BCT.TOperation[] = []
    setupOperationOnGameStart(players, effectingOperations, options)
    timelines.forEach(timeline => {
        /// 设置操作
        effectingOperations = effectingOperations.filter(opertion => clearInvalidEffectingOperations(opertion, players, timeline))
        effectingOperations = setupOperations(timeline, effectingOperations, players, orderedAbilities, timelines, options)
    })
}

const setupOperations = (timeline: BCT.TTimeline, effectingOperations: BCT.TOperation[], players: BCT.TPlayer[], orderedAbilities: BCT.TAbility[], timelines: BCT.TTimeline[], options?: { enemy?: string, drunk?: string }) => {
    const manualOperations = timeline.operations.filter(operation => operation.manual)
    effectingOperations = effectingOperations.concat(manualOperations)
    const waitOperationPlayers = copyPlayers(players)
    effectingOperations.forEach(opertion => {
        effectManagedOperation(opertion, waitOperationPlayers, timelines)
    })
    orderedAbilities.forEach((ability, idx) => {
        const clearStatusPlayers = copyPlayers(waitOperationPlayers)
        effectingOperations = effectingOperations.filter(opertion => clearInvalidEffectingOperations(opertion, players, timeline))
        effectingOperations.forEach(opertion => {
            effectManagedOperation(opertion, clearStatusPlayers, timelines)
        })
        const effectors = clearStatusPlayers.filter(player => player.character.abilities.includes(ability.key))
        effectors.forEach(effector => {

            const player = clearStatusPlayers.find(p => p.position === effector.position)!

            const effectingTimelinesIdx = timelines.findIndex(t => t.time === timeline.time && t.turn === timeline.turn)
            const effectingTimelines = timelines.slice(0, effectingTimelinesIdx + 1)

            const context: BCT.TContext = {
                player,
                players: clearStatusPlayers,
                turn: timeline.turn,
                time: timeline.time,
                timelines: timelinesWithPlayerStatus(effectingTimelines, players, options)
            }
            /// test ability should be executed
            if (ability.validate(context)) {
                const operationIdx = timeline.operations.findIndex(operation => operation.abilityKey === ability.key && operation.effector === effector.position)
                let operation: BCT.TOperation
                if (operationIdx === -1) {
                    operation = {
                        abilityKey: ability.key,
                        effector: effector.position,
                        turn: timeline.turn,
                        time: timeline.time,
                        hasEffect: !!ability.effect,
                    }
                    const order = orderedAbilities.map(a => a.key)
                    const targetIndex = timeline.operations.findIndex(op => {
                        return order.indexOf(op.abilityKey) > idx
                    })
                    if (targetIndex === -1) {
                        timeline.operations.push(operation)
                    } else {
                        timeline.operations.splice(targetIndex, 0, operation)
                    }
                } else {
                    operation = timeline.operations[operationIdx]
                }
                if (operation.hasEffect) {
                    if (ability.autoPayload) {
                        operation.payload = ability.autoPayload(context)
                    }
                    if (!ability.effecting || ability.effecting?.(operation, clearStatusPlayers, timelines)) {
                        effectingOperations.push(operation)
                    }
                }
            } else {
                timeline.operations = timeline.operations.filter(operation => operation.abilityKey !== ability.key || operation.effector !== effector.position)
            }
        })
    })

    return effectingOperations
}

/// 清除无效的已管理操作
const clearInvalidEffectingOperations = (effectingOperation: BCT.TOperation, players: BCT.TPlayer[], currentTimeline: BCT.TTimeline) => {
    const ability = getAbility(effectingOperation.abilityKey)
    /// 如果执行条件是存活，并且玩家已经死亡，则不执行
    if (ability?.effectCondition === "alive") {
        const player = players[effectingOperation.effector]
        if (isDeadPlayer(player)) {
            return false
        }
    }

    /// 如果执行条件是时间，并且时间不是当前时间，则不执行
    if (ability?.effectDuration === "ntd") {
        if (currentTimeline.turn != effectingOperation.turn) {
            return false
        }
    }

    return true
}

const effectManagedOperation = (effectingOperation: BCT.TOperation, players: BCT.TPlayer[], timelines: BCT.TTimeline[]) => {
    const ability = getAbility(effectingOperation.abilityKey)
    if (ability) {
        ability.effect?.(effectingOperation, players, timelines)
    }
}


const updateNomination = (timelines: BCT.TTimeline[], players: BCT.TPlayer[], options?: { enemy?: string, drunk?: string }) => {
    const timeline = timelines[timelines.length - 1]
    if (!timeline || timeline.time !== "day") {
        return
    }
    const excuteOperation = timeline.operations.find(op => op.abilityKey === Excute.key)
    if (excuteOperation) {
        return;
    }
    const statusTimelines = timelinesWithPlayerStatus(timelines, players, options)
    const lastTimeline = statusTimelines[statusTimelines.length - 1]
    const playersOnRack = lastTimeline.effectedPlayers.filter(p => p.isOnGallows)


    if (playersOnRack.length === 0) {
        return;
    }

    let target: number = -1
    if (playersOnRack.length > 1) {
        const nominations = timeline.operations.filter(op => op.abilityKey === Nomination.key && Array.isArray(op.payload?.voters))
        const voteCount = nominations.flatMap(op => {
            const voters: number[] = op.payload?.voters || []
            return Array.isArray(voters) ? voters.length : []
        })
        const maxVoteCount = Math.max(...voteCount)
        const matchNominations = nominations.filter(op => op.payload?.voters.length === maxVoteCount)
        if (matchNominations.length != 1) {
            target = -1
        } else {
            target = matchNominations[0].payload?.target
        }
    } else {
        target = playersOnRack[0].position
    }

    if (target === -1) {
        return;
    }

    timeline.operations.push({
        abilityKey: ExcuteByRack.key,
        effector: -1,
        turn: timeline.turn,
        time: timeline.time,
        hasEffect: true,
        manual: true,
        payload: {
            target
        },
    })
}

const setupOperationOnGameStart = (players: BCT.TPlayer[], effectingOperations: BCT.TOperation[], options?: { enemy?: string, drunk?: string }) => {
    const drunkPlayerIdx = players.findIndex(p => p.character.key === DrunkCharacter.key)
    if (drunkPlayerIdx !== -1) {
        effectingOperations.push({
            abilityKey: DrunkAbility.key,
            effector: -1,
            turn: 1,
            time: "night",
            hasEffect: true,
            payload: {
                target: drunkPlayerIdx,
                character: options?.drunk
            },
            manual: true
        })
    }

    const enemyPlayerIdx = players.findIndex(p => p.character.key === options?.enemy)
    if (enemyPlayerIdx !== -1) {
        effectingOperations.push({
            abilityKey: Enemy.key,
            effector: -1,
            turn: 1,
            time: "night",
            hasEffect: true,
            manual: true,
            payload: {
                target: enemyPlayerIdx
            },
        })
    }

}