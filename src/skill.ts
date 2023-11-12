import { CharacterForKey, EKind } from "./character";
import { IPlayer, isDeadPlayer } from "./player";

declare namespace Payload {
    /// player
    interface Player {
        seat: number
    }
    /// players
    interface Players {
        seats: number[]
    }
    /// number
    interface Number {
        number: number
    }
    /// character 
    interface Character {
        character: string
    }
    /// characters
    interface Characters {
        characters: string[]
    }
    /// result
    interface Result {
        result: boolean
    }
    interface TimeLine {
        timeline: true
    }

    namespace Options {
        interface Character {
            character: {
                requireInput?: boolean
                static?: string;
                kinds?: EKind[];
                exist?: "inGame" | "notInGame" | "all";
            } & Options.Range

        }
        interface Player {
            player: {
                requireInput?: boolean
                dead?: boolean;
                kinds?: EKind[];
            } & Options.Range
        }
        interface Range<T = number> {
            range?: {
                min?: T;
                max?: T;
            }
        }
        interface Result {
            result: {}
        }
    }
}

export type PayloadDefind = {
    "C": Payload.Character,
    "N": Payload.Number,
    "P": Payload.Player,
    "PS": Payload.Players,
    "CS": Payload.Characters,
    "P_C": Payload.Player & Payload.Character,
    "P_N": Payload.Player & Payload.Number,
    "P_CS": Payload.Player & Payload.Characters,
    "P_R": Payload.Player & Payload.Result,
    "PS_R": Payload.Players & Payload.Result,
    "PS_C": Payload.Players & Payload.Character,
    "T": Payload.TimeLine,
    "NM": Payload.Player & Payload.Players & Payload.Result
}

export type PayloadOptionDefind = {
    "C": Payload.Options.Character;
    "N": Payload.Options.Range;
    "P": Payload.Options.Player;
    "PS": Payload.Options.Player;
    "CS": Payload.Options.Character;
    "P_C": Payload.Options.Player & Payload.Options.Character;
    "P_N": Payload.Options.Player & Payload.Options.Range;
    "P_CS": Payload.Options.Character & Payload.Options.Player;
    "P_R": Payload.Options.Player & Payload.Options.Result;
    "PS_R": Payload.Options.Player & Payload.Options.Result;
    "PS_C": Payload.Options.Character & Payload.Options.Player;
    "T": {};
    "NM": {};
}

export type PayloadKey = keyof PayloadDefind

export type PayloadType = PayloadDefind[PayloadKey]

export type PayloadOptions = PayloadOptionDefind[PayloadKey]

export interface IContext {
    /// timeline
    turn: number
    time: "day" | "night"

    numberOfPlayer: number
    numberOfAlivePlayer: number

    player: IPlayer
    killTarget?: IPlayer
    excuteInDay?: IPlayer
    tramsformedImp?: IPlayer

    players: IPlayer[]
}

export interface ISkill {

    readonly key: string
    readonly payloadKey: PayloadKey
    readonly payloadOptions: PayloadOptions

    valid(context: IContext): boolean
    effect(effector: number, payload: PayloadDefind[PayloadKey], players: IPlayer[]): void
}

const AliveAtNight = (context: IContext) => !isDeadPlayer(context.player) && context.time == "night"

class Skill<Key extends PayloadKey> implements ISkill {

    readonly key: string;
    readonly payloadKey: Key;
    readonly payloadOptions: PayloadOptionDefind[Key];
    readonly valid: (context: IContext) => boolean
    readonly effect: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void

    constructor(key: string, payloadKey: Key, validHandler?: (context: IContext) => boolean, effect?: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void, payloadOptions?: PayloadOptionDefind[Key]) {
        this.key = key
        this.payloadKey = payloadKey
        this.valid = validHandler || (() => true)
        this.effect = effect || (() => { })
        this.payloadOptions = payloadOptions || { player: {}, character: {}, result: {} }
    }
}

/// 得知不在场身份
export const KnowAbsent = new Skill("KnowAbsent", "CS", context =>
    context.turn == 1 &&
    context.time == "night"
    , undefined, {
    character: {
        kinds: ["Townsfolk", "Outsiders"],
        exist: "notInGame",
        range: {
            min: 3,
            max: 3
        }
    }
})

/// 如果自杀，另外一个爪牙变成恶魔
export const Tramsform = new Skill("Tramsform", "P", context =>
    isDeadPlayer(context.player) &&
    context.killTarget?.seat == context.player.seat
    , (_, payload, players) => {
        if (payload.seat) {
            players[payload.seat - 1].avatar = "Imp"
        }
    }, {
    player: {
        kinds: ["Minions"]
    }
})

/// 选择一个目标，他死亡
export const Kill = new Skill("Kill", "P_R",
    context => {
        /// 1. 当晚存活或者击杀目标是自己
        /// 2. 不是第一晚
        /// 3. 当晚恶魔自刀,非新恶魔
        return (AliveAtNight(context) || context.killTarget?.seat === context.player.seat)
            && context.turn != 1
            && context.tramsformedImp?.seat != context.player.seat
    },
    (_, payload, players) => {
        if (payload.result) {
            players[payload.seat - 1].isKilled = true
        }
    }, {
    player: {
        requireInput: true
    },
    result: {}
})

/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
export const BecomeImp = new Skill("BecomeImp", "C", context =>
    !isDeadPlayer(context.player) &&
    context.time == "day" &&
    context.numberOfAlivePlayer >= 4 && /// 人数大于4人
    context.players.findIndex(p => !isDeadPlayer(p) && CharacterForKey(p.avatar)?.kind == "Demons") == -1 /// 没有存活的恶魔
    , (seat, payload, players) => {
        players[seat - 1].avatar = payload.character
    }, {
    character: {
        static: "Imp"
    }
})

/// 可以观看魔典
export const Peep = new Skill("Peep", "T", AliveAtNight, undefined, {})

/// 选择一个目标，他中毒
export const Poison = new Skill("Poison", "P", AliveAtNight, (_, payload, players) => {
    players[payload.seat - 1].isPoisoned = true
}, {
    player: {
        requireInput: true
    }
})

/// 选择一个目标，第二天投票他投票你的票才生效
export const ChooseMaster = new Skill("ChooseMaster", "P", AliveAtNight, (_, payload, players) => {
    players[payload.seat - 1].isMaster = true
}, {
    player: {
        requireInput: true
    }
})

/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
export const Scapegoat = new Skill("Scapegoat", "P", context =>
    !isDeadPlayer(context.player) &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night", (_, payload, players) => {
        players[payload.seat - 1].isScapegoat = true
    }, {
    player: {}
})

/// 当夜晚死亡时，可以被唤醒验证一个人身份
export const WakenKnowCharacter = new Skill("WakenKnowCharacter", "P_C", context =>
    isDeadPlayer(context.player) &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night"
    , undefined, {
    player: {
        requireInput: true
    },
    character: {}
})

export const Guard = new Skill("Guard", "P", context =>
    AliveAtNight(context) &&
    context.turn != 1
    , (_, payload, players) => {
        players[payload.seat - 1].isGuarded = true
    }, {
    player: {
        requireInput: true
    }
})

export const DigKnowCharacter = new Skill("DigKnowCharacter", "C", context =>
    AliveAtNight(context) && !!context.excuteInDay
    , undefined, {
    character: {}
})

export const CheckImp = new Skill("CheckImp", "PS_R", AliveAtNight, undefined, {
    player: {
        requireInput: true,
        range: {
            max: 2,
            min: 2
        },
    },
    result: {}
})
export const KnowEvilAround = new Skill("KnowEvilAround", "N", AliveAtNight, undefined, {
    range: {
        min: 0,
        max: 2
    }
})

export const KnowSeat = new Skill("KnowSeat", "N", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    range: {
        min: 0,
        max: 2
    }
})
export const KnowMinions = new Skill("KnowMinions", "PS_C", context =>
    AliveAtNight(context) &&
    context.turn === 1
    , undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Minions"]
    }
})
export const KnowOutsiders = new Skill("KnowOutsiders", "PS_C", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Outsiders"],
        range: {
            min: 0,
            max: 1
        }
    }
})
export const KnowTownsfolk = new Skill("KnowTownsfolk", "PS_C", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Townsfolk"]
    }
})

export const Nomination = new Skill("Nomination", "NM", undefined, (nominatorSeat, payload, players) => {
    players[nominatorSeat - 1].nominationForbiden = true
    players[payload.seat - 1].canNotBeNominated = true
    players[payload.seat - 1].isOnGallows = payload.result
    /// 死亡角色，如果投票后无法再投票
    players.filter(p => isDeadPlayer(p) && payload.seats.includes(p.seat)).forEach(p => {
        p.forbiddenVote = true
    })
}, {})

export const Slay = new Skill("Slay", "P_R", undefined, (_, payload, players) => {
    players[payload.seat - 1].isSlew = payload.result
}, {
    player: {},
    result: {}
})

export const Excute = new Skill("Excute", "P", undefined, (_, payload, players) => {
    players[payload.seat - 1].isExecuted = true
}, {
    player: {}
})

export const ExcuteByRack = new Skill("ExcuteByRack", "P", undefined, (_, payload, players) => {
    players[payload.seat - 1].isExecuted = true
}, {
    player: {}
})

const All = [KnowAbsent, Tramsform, Kill, BecomeImp, Peep, Poison, ChooseMaster, Scapegoat, WakenKnowCharacter, Guard, DigKnowCharacter, CheckImp, KnowEvilAround, KnowSeat, KnowMinions, KnowOutsiders, KnowTownsfolk, Nomination, Slay, Excute, ExcuteByRack]

export const SkillForKey = (key: string) => All.find(sk => sk.key === key)