import { ICharacter } from "./character";
import { IPlayer } from "./player";

declare namespace Payload {
    /// player
    interface Player {
        player: IPlayer
    }
    /// players
    interface Players {
        players: IPlayer[]
    }
    /// number
    interface Number {
        number: number
    }
    /// character 
    interface Character {
        character: ICharacter
    }
    /// characters
    interface Characters {
        characters: ICharacter[]
    }
    /// result
    interface Result {
        result: boolean
    }
    interface TimeLine {
        timeline: true
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

export type PayloadKey = keyof PayloadDefind

export type PayloadType = PayloadDefind[PayloadKey]

interface IContext {
    /// timeline
    turn: number
    time: "day" | "night"

    numberOfPlayer: number
    numberOfAlivePlayer: number

    player: IPlayer
    killTarget?: IPlayer
    excuteInDay?: IPlayer

    players: IPlayer[]
}

export interface ISkill {
    readonly key: string
    readonly payloadKey: PayloadKey

    valid(context: IContext): boolean
}

const AliveAtNight = (context: IContext) => context.player.alive && context.time == "night"

class Skill implements ISkill {

    readonly key: string;
    readonly payloadKey: PayloadKey;
    readonly valid: (context: IContext) => boolean

    constructor(key: string, payloadKey: PayloadKey, validHandler?: (context: IContext) => boolean) {
        this.key = key
        this.payloadKey = payloadKey
        this.valid = validHandler || (() => true)
    }
}

/// 得知不在场身份
export const KnowAbsent = new Skill("KnowAbsent", "CS", context =>
    context.turn == 1 &&
    context.time == "night"
)

/// 如果自杀，另外一个爪牙变成恶魔
export const Tramsform = new Skill("Tramsform", "P", context =>
    !context.player.alive &&
    context.killTarget?.seat == context.player.seat
)

/// 选择一个目标，他死亡
export const Kill = new Skill("Kill", "P_R", context =>
    AliveAtNight(context) &&
    context.turn != 1
)

/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
export const BecomeImp = new Skill("BecomeImp", "C", context =>
    AliveAtNight(context) &&
    context.numberOfAlivePlayer >= 4 && /// 人数大于4人
    context.players.findIndex(p => p.alive && p.character?.kind == "Demons") == -1 /// 没有存活的恶魔
)

/// 可以观看魔典
export const Peep = new Skill("Peep", "T", AliveAtNight)

/// 选择一个目标，他中毒
export const Poison = new Skill("Poison", "P", AliveAtNight)

/// 选择一个目标，第二天投票他投票你的票才生效
export const ChooseMaster = new Skill("ChooseMaster", "P", AliveAtNight)

/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
export const Scapegoat = new Skill("Scapegoat", "P", AliveAtNight)

/// 当夜晚死亡时，可以被唤醒验证一个人身份
export const WakenKnowCharacter = new Skill("WakenKnowCharacter", "P_C", context =>
    !context.player.alive &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night"
)

export const Guard = new Skill("Guard", "P", context =>
    AliveAtNight(context) &&
    context.turn != 1
)

export const DigKnowCharacter = new Skill("DigKnowCharacter", "P_C", context =>
    AliveAtNight(context) &&
    !!context.excuteInDay
)

export const CheckImp = new Skill("CheckImp", "PS_R", AliveAtNight)
export const KnowEvilAround = new Skill("KnowEvilAround", "N", AliveAtNight)

export const KnowSeat = new Skill("KnowSeat", "N", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowMinions = new Skill("KnowMinions", "PS_C", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowOutsiders = new Skill("KnowOutsiders", "PS_C", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowTownsfolk = new Skill("KnowTownsfolk", "PS_C", context =>
    AliveAtNight(context) &&
    context.turn === 1
)

export const Nomination = new Skill("Nomination", "NM")
export const Slay = new Skill("Slay", "P_R")
export const Excute = new Skill("Excute", "P")


