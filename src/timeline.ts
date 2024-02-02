import { BookForName } from "./book";
import { CharacterForKey } from "./character";
import { EffectOperation } from "./operation";
import { clearStatus } from "./player";

function NextTimeline(bookKey: string, players: IPlayer[]): ITimeline
function NextTimeline(lastTimeline: ITimeline): ITimeline
function NextTimeline(): ITimeline {
    let bookKey: string
    let players: IPlayer[]
    let time: "day" | "night"
    let turn: number
    let excuteInDay: IPlayer | undefined
    if (arguments.length === 1) {
        const lastTimeline = arguments[0] as ITimeline
        bookKey = lastTimeline.bookKey || lastTimeline.book?.key || ""
        players = MakePlayerEffect(lastTimeline)
        time = lastTimeline.time === "night" ? "day" : "night"
        turn = lastTimeline.time === "night" ? lastTimeline.turn + 1 : lastTimeline.turn

        if (lastTimeline.time == "day") {
            const beforeDay = lastTimeline.players.filter(player => player.isExecuted)
            const afterDay = MakePlayerEffect(lastTimeline).filter(player => player.isExecuted)
            excuteInDay = afterDay.find(ap => beforeDay.findIndex(bp => bp.seat === ap.seat) === -1) || undefined
        }
    } else {
        bookKey = arguments[0]
        players = arguments[1]
        time = "night"
        turn = 1
    }
    let timeline: ITimeline = {
        bookKey,
        time,
        turn,
        players,
        operatedPlayers: [],
        operations: [],
        extra: {
            excuteInDay
        }
    }

    /// clear status
    if (time === "night") {
        timeline.players.forEach(clearStatus)
    }

    UpdateOperations(timeline)
    return timeline
}

export { NextTimeline }

export const UpdateOperations = (timeline: ITimeline) => {
    const book = BookForName(timeline.bookKey)

    if (!book) {
        return
    }

    const players = timeline.players.map(player => ({ ...player }))

    /// all posible abilities
    const abilities = timeline.players
        .flatMap(player => {
            return CharacterForKey(player.avatar)?.abilities.map(skill => ({
                player,
                skill
            }))
        })
        .sort((a, b) => book.skills.findIndex(s => a?.skill?.key === s.key) - book.skills.findIndex(s => b?.skill?.key === s.key))
        .filter(ability => ability && ability.skill)

    const oldOperations = timeline.operations.slice(0)

    let oldOperation = oldOperations.shift()

    /// abilities => operations
    const operations: IOperation[] = []
    for (let idx = 0; idx < abilities.length; idx++) {

        const ability = abilities[idx]!
        const skill = ability.skill!
        const player = ability.player

        const context: IContext = {
            timeline,
            player: players[player.seat - 1],
            players: players,
        }

        /// 添加手动添加的操作
        
        while (oldOperation && oldOperation.manual) {
            EffectOperation(oldOperation, players)
            operations.push(oldOperation)
            oldOperation = oldOperations.shift()
        }

        if (!skill.valid(context)) {
            if (oldOperation && oldOperation.skill.key === skill.key && oldOperation.seat === context.player.seat) {
                oldOperation = oldOperations.shift()
            }
            continue
        }

        let operation: IOperation = oldOperation as IOperation

        if (operation && operation.skill.key === skill.key) {
            oldOperation = oldOperations.shift()
            EffectOperation(operation, players)
        } else {
            const payloadKey = skill.payloadKey || skill.type
            operation = {
                seat: ability.player.seat,
                skill,
                players: players.map(player => ({ ...player })),
                payloadKey,
            }
            if (payloadKey === "A") {
                operation.payload = timeline
                EffectOperation(operation, players)
            }
        }
        operations.push(operation)
    }
    timeline.operations = operations
    timeline.operatedPlayers = players;
}

const MakePlayerEffect = (timeline: ITimeline): IPlayer[] => {
    const players = timeline.players.map(player => ({ ...player }))
    timeline.operations.filter(operation => operation.payload).forEach(operation => {
        EffectOperation(operation, players)
    })
    return players
}