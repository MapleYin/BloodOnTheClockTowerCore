import { Excute, ExcuteByRack, getAbility, Nomination } from './abilities';
import { copyPlayers, isDeadPlayer } from './common';

export class Game implements BCT.TGame {

    players: BCT.TPlayer[]
    timelines: BCT.TTimeline[] = []

    private orderedAbilities: BCT.TAbility[]

    constructor(players: BCT.TPlayer[], abilityOrder: string[]) {
        this.players = players
        this.orderedAbilities = abilityOrder.flatMap(key => getAbility(key) || [])
    }

    nextTimeline(): BCT.TTimeline {

        let lastTimeline = this.timelines[this.timelines.length - 1]

        const timeline: BCT.TTimeline = lastTimeline ? {
            turn: lastTimeline.time === "night" ? lastTimeline.turn : lastTimeline.turn + 1,
            time: lastTimeline.time === "day" ? "night" : "day",
            operations: [],
        } : {
            turn: 1,
            time: "night",
            operations: [],
        }

        updateNomination(this.timelines, this.players)

        this.timelines.push(timeline)

        setupTimelines(this.timelines, this.players, this.orderedAbilities)

        return timeline
    }

    createOperation(abilityKey: string, effector: number, payload: Record<string, any>) {
        const timelineIdx = this.timelines.length - 1
        const timeline = this.timelines[timelineIdx]
        timeline.operations.push({
            abilityKey,
            effector,
            turn: timeline.turn,
            time: timeline.time,
            hasEffect: true,
            payload,
            manual: true
        })
        setupTimelines(this.timelines, this.players, this.orderedAbilities)
    }

    updatePayload(timelineIdx: number, operationIdx: number, payload: Record<string, any>) {
        this.timelines[timelineIdx].operations[operationIdx].payload = payload
        setupTimelines(this.timelines, this.players, this.orderedAbilities)
    }

    timelinesWithPlayerStatus() {
        return timelinesWithPlayerStatus(this.timelines, this.players)
    }
}


const setupTimelines = (timelines: BCT.TTimeline[], players: BCT.TPlayer[], orderedAbilities: BCT.TAbility[]) => {
    let effectingOperations: BCT.TOperation[] = []
    timelines.forEach(timeline => {
        /// 设置操作
        effectingOperations = effectingOperations.filter(opertion => clearInvalidEffectingOperations(opertion, players, timeline))
        effectingOperations = setupOperations(timeline, effectingOperations, players, orderedAbilities, timelines)
    })
}

const setupOperations = (timeline: BCT.TTimeline, effectingOperations: BCT.TOperation[], players: BCT.TPlayer[], orderedAbilities: BCT.TAbility[], timelines: BCT.TTimeline[]) => {
    const manualOperations = timeline.operations.filter(operation => operation.manual)
    effectingOperations = effectingOperations.concat(manualOperations)
    orderedAbilities.forEach(ability => {
        const effectors = players.filter(player => player.character.abilities.includes(ability.key))
        effectors.forEach(effector => {
            const clearStatusPlayers = copyPlayers(players)
            effectingOperations = effectingOperations.filter(opertion => clearInvalidEffectingOperations(opertion, players, timeline))
            effectingOperations.forEach(opertion => {
                effectManagedOperation(opertion, clearStatusPlayers, timelines)
            })
            const player = clearStatusPlayers.find(p => p.position === effector.position)!

            const effectingTimelinesIdx = timelines.findIndex(t => t.time === timeline.time && t.turn === timeline.turn)
            const effectingTimelines = timelines.slice(0, effectingTimelinesIdx + 1)

            const context: BCT.TContext = {
                player,
                players: clearStatusPlayers,
                turn: timeline.turn,
                time: timeline.time,
                timelines: timelinesWithPlayerStatus(effectingTimelines, players)
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
                    timeline.operations.push(operation)
                } else {
                    operation = timeline.operations[operationIdx]
                }
                if (operation.hasEffect) {
                    effectingOperations.push(operation)
                    if (ability.autoPayload) {
                        operation.payload = ability.autoPayload(context)
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

export const timelinesWithPlayerStatus = (timelines: BCT.TTimeline[], players: BCT.TPlayer[]) => {
    let effectingOperations: BCT.TOperation[] = []
    const timelinesWithPlayerStatus = timelines.map(timeline => {
        let timelineInitPlayers: BCT.TPlayer[] = []
        const operations = timeline.operations.map(operation => {
            let clearStatusPlayers = copyPlayers(players)
            effectingOperations = effectingOperations.filter(operation => clearInvalidEffectingOperations(operation, clearStatusPlayers, timeline))
            effectingOperations.forEach(opertion => {
                effectManagedOperation(opertion, clearStatusPlayers, timelines)
            })
            if (timelineInitPlayers.length) {
                timelineInitPlayers = copyPlayers(clearStatusPlayers)
            }
            const initPlayers = copyPlayers(clearStatusPlayers)
            if (operation.hasEffect) {
                effectingOperations.push(operation)

                effectManagedOperation(operation, clearStatusPlayers, timelines)
                effectingOperations = effectingOperations.filter(operation => clearInvalidEffectingOperations(operation, clearStatusPlayers, timeline))

                clearStatusPlayers = copyPlayers(players)
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


    const updateNomination = (timelines: BCT.TTimeline[], players: BCT.TPlayer[]) => {
    const timeline = timelines[timelines.length - 1]
    if (!timeline || timeline.time !== "day") {
        return
    }
    const excuteOperation = timeline.operations.find(op => op.abilityKey === Excute.key)
    if (excuteOperation) {
        return;
    }
    const statusTimelines = timelinesWithPlayerStatus(timelines, players)
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