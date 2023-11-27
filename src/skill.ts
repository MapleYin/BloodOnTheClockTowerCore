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
            result: {
                display?: [string, string]
                prompt: string
                subPrompt?: string
            }
        }
        interface Output {
            output?: {
                disabled?: boolean
            }
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
    readonly payloadOptions: PayloadOptions & Payload.Options.Output
    readonly description: string

    valid(context: IContext): boolean
    effect(effector: number, payload: PayloadDefind[PayloadKey], players: IPlayer[]): void
}

const AliveAtNight = (context: IContext) => !isDeadPlayer(context.player) && context.time == "night"

interface SkillProps<Key extends PayloadKey> {
    key: string
    payloadKey: Key
    validHandler?: (context: IContext) => boolean
    effect?: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void
    payloadOptions: PayloadOptionDefind[Key] & Payload.Options.Output
    description: string
}

class Skill<Key extends PayloadKey> implements ISkill {

    readonly key: string;
    readonly payloadKey: Key;
    readonly payloadOptions: PayloadOptionDefind[Key] & Payload.Options.Output;
    readonly valid: (context: IContext) => boolean
    readonly effect: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void
    readonly description: string

    constructor({ key, payloadKey, validHandler, effect, payloadOptions, description }: SkillProps<Key>) {
        this.key = key
        this.payloadKey = payloadKey
        this.valid = validHandler || (() => true)
        this.effect = effect || (() => { })
        this.payloadOptions = payloadOptions
        this.description = description;
    }
}

/// 得知不在场身份
export const KnowAbsent = new Skill({
    key: "KnowAbsent",
    payloadKey: "CS",
    validHandler: context =>
        context.turn == 1 &&
        context.time == "night"
    ,
    payloadOptions: {
        character: {
            kinds: ["Townsfolk", "Outsiders"],
            exist: "notInGame",
            range: {
                min: 3,
                max: 3
            }
        },
        output: {
            disabled: true
        }
    },
    description: "得知三个不在场身份"
})

/// 如果自杀，另外一个爪牙变成恶魔
export const Tramsform = new Skill({
    key: "Tramsform",
    payloadKey: "P",
    validHandler: context =>
        isDeadPlayer(context.player) &&
        context.killTarget?.seat == context.player.seat,
    effect: (_, payload, players) => {
        if (payload.seat) {
            players[payload.seat - 1].avatar = "Imp"
        }
    },
    payloadOptions: {
        player: {
            kinds: ["Minions"]
        },
        output: {
            disabled: true
        }
    },
    description: "选择一个爪牙变成恶魔"
})

/// 选择一个目标，他死亡
export const Kill = new Skill({
    key: "Kill",
    payloadKey: "P_R",
    validHandler: context => {
        /// 1. 当晚存活或者击杀目标是自己
        /// 2. 不是第一晚
        /// 3. 当晚恶魔自刀,非新恶魔
        return (AliveAtNight(context) || context.killTarget?.seat === context.player.seat)
            && context.turn != 1
            && context.tramsformedImp?.seat != context.player.seat
    },
    effect: (_, payload, players) => {
        if (payload.result) {
            players[payload.seat - 1].isKilled = true
        }
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        result: {
            display: ["未能杀害", "杀害成功"],
            prompt: "杀害是否生效",
            subPrompt: "注：未生效情况可能有，士兵、市长、僧侣技能等"
        },
        output: {
            disabled: true
        }
    },
    description: "选择一个目标，他死亡"
})

/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
export const BecomeImp = new Skill({
    key: "BecomeImp",
    payloadKey: "C",
    validHandler: context =>
        !isDeadPlayer(context.player) &&
        context.time == "day" &&
        context.numberOfAlivePlayer >= 4 && /// 人数大于4人
        context.players.findIndex(p => !isDeadPlayer(p) && CharacterForKey(p.avatar)?.kind == "Demons") == -1, /// 没有存活的恶魔 
    effect: (seat, payload, players) => {
        players[seat - 1].avatar = payload.character
    },
    payloadOptions: {
        character: {
            static: "Imp"
        },
        output: {
            disabled: true
        }
    },
    description: "化身为恶魔"
})

/// 可以观看魔典
export const Peep = new Skill({
    key: "Peep",
    payloadKey: "T",
    validHandler: (context) => {
        return AliveAtNight(context) && context.player.avatar === "Spy"
    },
    payloadOptions: {},
    description: "得知所有信息"
})

/// 选择一个目标，他中毒
export const Poison = new Skill({
    key: "Poison",
    payloadKey: "P",
    validHandler: (context) => {
        return context.time == "night" && ((!isDeadPlayer(context.player) && context.player.avatar === "Poisoner") || context.tramsformedImp?.seat === context.player.seat)
    },
    effect: (_, payload, players) => {
        players[payload.seat - 1].isPoisoned = true
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        output: {
            disabled: true
        }
    },
    description: "选择1名玩家，他中毒"
})

/// 选择一个目标，第二天投票他投票你的票才生效
export const ChooseMaster = new Skill({
    key: "ChooseMaster",
    payloadKey: "P",
    validHandler: AliveAtNight,
    effect: (_, payload, players) => {
        players[payload.seat - 1].isMaster = true
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        output: {
            disabled: true
        }
    },
    description: "选择1名玩家作为主人"
})

/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
export const Scapegoat = new Skill({
    key: "Scapegoat",
    payloadKey: "P",
    validHandler: context =>
        !isDeadPlayer(context.player) &&
        context.killTarget?.seat == context.player.seat &&
        context.time === "night",
    effect: (_, payload, players) => {
        players[payload.seat - 1].isScapegoat = true
    },
    payloadOptions: {
        player: {},
        output: {
            disabled: true
        }
    },
    description: "选择1名玩家代替市长死亡"
})

/// 当夜晚死亡时，可以被唤醒验证一个人身份
export const WakenKnowCharacter = new Skill({
    key: "WakenKnowCharacter",
    payloadKey: "P_C",
    validHandler: context =>
        isDeadPlayer(context.player) &&
        context.killTarget?.seat == context.player.seat &&
        context.time === "night"
    ,
    payloadOptions: {
        player: {
            requireInput: true
        },
        character: {}
    },
    description: "选择1名玩家，得知他的身份"
})

export const Guard = new Skill({
    key: "Guard",
    payloadKey: "P_R",
    validHandler: context =>
        AliveAtNight(context) &&
        context.turn != 1
    ,
    effect: (_, payload, players) => {
        players[payload.seat - 1].isGuarded = payload.result
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        result: {
            display: ["守护成功", "守护失败"],
            prompt: "守护是否生效",
            subPrompt: "注：未生效情况可能是：被毒、是酒鬼"
        },
        output: {
            disabled: true
        }
    },
    description: "选择1名玩家，守护他"
})

export const DigKnowCharacter = new Skill({
    key: "DigKnowCharacter",
    payloadKey: "C",
    validHandler: context =>
        AliveAtNight(context) && !!context.excuteInDay,
    payloadOptions: {
        character: {}
    },
    description: "得知昨天白天被处决玩家的角色"
})

export const CheckImp = new Skill({
    key: "CheckImp",
    payloadKey: "PS_R",
    validHandler: AliveAtNight,
    payloadOptions: {
        player: {
            requireInput: true,
            range: {
                max: 2,
                min: 2
            },
        },
        result: {
            display: ["无恶魔", "有恶魔"],
            prompt: "是否存在恶魔"
        }
    },
    description: "选择2个玩家，是否存在恶魔"
})

export const KnowEvilAround = new Skill({
    key: "KnowEvilAround",
    payloadKey: "N",
    validHandler: AliveAtNight,
    payloadOptions: {
        range: {
            min: 0,
            max: 2
        }
    },
    description: "得知两边邪恶玩家人数"
})

export const KnowSeat = new Skill({
    key: "KnowSeat",
    payloadKey: "N",
    validHandler: context =>
        AliveAtNight(context) && context.turn === 1,
    payloadOptions: {
        range: {
            min: 0,
            max: 4
        }
    },
    description: "得知有多少对邪恶玩家邻座"
})

export const KnowMinions = new Skill({
    key: "KnowMinions",
    payloadKey: "PS_C",
    validHandler: context =>
        AliveAtNight(context) &&
        context.turn === 1,
    payloadOptions: {
        player: {
            range: {
                min: 2,
                max: 2
            }
        },
        character: {
            kinds: ["Minions"]
        }
    },
    description: "得知2名玩家中1个是某个爪牙"
})

export const KnowOutsiders = new Skill({
    key: "KnowOutsiders",
    payloadKey: "PS_C",
    validHandler: context =>
        AliveAtNight(context) && context.turn === 1,
    payloadOptions: {
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
    },
    description: "得知2名玩家中1个是某个外来者"
})

export const KnowTownsfolk = new Skill({
    key: "KnowTownsfolk",
    payloadKey: "PS_C",
    validHandler: context =>
        AliveAtNight(context) && context.turn === 1,
    payloadOptions: {
        player: {
            range: {
                min: 2,
                max: 2
            }
        },
        character: {
            kinds: ["Townsfolk"]
        }
    },
    description: "得知2名玩家中1个是某个村民"
})

export const Nomination = new Skill({
    key: "Nomination",
    payloadKey: "NM",
    effect: (nominatorSeat, payload, players) => {
        players[nominatorSeat - 1].nominationForbiden = true
        players[payload.seat - 1].canNotBeNominated = true
        players[payload.seat - 1].isOnGallows = payload.result
        /// 死亡角色，如果投票后无法再投票
        players.filter(p => isDeadPlayer(p) && payload.seats.includes(p.seat)).forEach(p => {
            p.forbiddenVote = true
        })
    },
    payloadOptions: {},
    description: "提名玩家"
})

export const Slay = new Skill({
    key: "Slay",
    payloadKey: "P_R",
    effect: (_, payload, players) => {
        players[payload.seat - 1].isSlew = payload.result
    },
    payloadOptions: {
        player: {},
        result: {
            display: ["无事发生", "猎杀成功"],
            prompt: "猎杀是否生效"
        }
    },
    description: "猎杀"
})

export const Excute = new Skill({
    key: "Excute",
    payloadKey: "P",
    effect: (_, payload, players) => {
        players[payload.seat - 1].isExecuted = true
    },
    payloadOptions: {
        player: {}
    },
    description: "提名圣女被处决"
})

export const ExcuteByRack = new Skill({
    key: "ExcuteByRack",
    payloadKey: "P",
    effect: (_, payload, players) => {
        players[payload.seat - 1].isExecuted = true
    },
    payloadOptions: {
        player: {}
    },
    description: "上处刑架被处决"
})

const All = [KnowAbsent, Tramsform, Kill, BecomeImp, Peep, Poison, ChooseMaster, Scapegoat, WakenKnowCharacter, Guard, DigKnowCharacter, CheckImp, KnowEvilAround, KnowSeat, KnowMinions, KnowOutsiders, KnowTownsfolk, Nomination, Slay, Excute, ExcuteByRack]

export const SkillForKey = (key: string) => All.find(sk => sk.key === key)