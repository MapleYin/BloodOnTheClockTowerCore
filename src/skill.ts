import { EKind, ICharacter, Imp } from "./character";
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

    namespace Options {
        interface Character {
            static?: ICharacter
            kinds?: EKind[]
            exist?: "inGame" | "notInGame" | "all"
        }
        interface Number {
            min?: number;
            max?: number
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
    "C": Payload.Options.Character,
    "N": Payload.Options.Number,
    "P": Payload.Options.Character,
    "PS": Payload.Options.Character & Payload.Options.Number,
    "CS": Payload.Options.Character & Payload.Options.Number,
    "P_C": Payload.Options.Character,
    "P_N": Payload.Options.Character,
    "P_CS": Payload.Options.Character & Payload.Options.Number,
    "P_R": Payload.Options.Character,
    "PS_R": Payload.Options.Number,
    "PS_C": Payload.Options.Character & Payload.Options.Number,
    "T": {},
    "NM": {}
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

    players: IPlayer[]
}

export interface ISkill {

    readonly key: string
    readonly payloadKey: PayloadKey
    readonly payloadOptions: PayloadOptions

    valid(context: IContext): boolean
    effect(effector: IPlayer, payload: PayloadDefind[PayloadKey]): void
}

const AliveAtNight = (context: IContext) => !context.player.dead && context.time == "night"

class Skill<Key extends PayloadKey> implements ISkill {

    readonly key: string;
    readonly payloadKey: Key;
    readonly payloadOptions: PayloadOptionDefind[Key];
    readonly valid: (context: IContext) => boolean
    readonly effect: (effector: IPlayer, payload: PayloadDefind[Key]) => void

    constructor(key: string, payloadKey: Key, validHandler?: (context: IContext) => boolean, effect?: (effector: IPlayer, payload: PayloadDefind[Key]) => void, payloadOptions?: PayloadOptionDefind[Key]) {
        this.key = key
        this.payloadKey = payloadKey
        this.valid = validHandler || (() => true)
        this.effect = effect || (() => { })
        this.payloadOptions = payloadOptions || {}
    }
}

/// 得知不在场身份
export const KnowAbsent = new Skill("KnowAbsent", "CS", context =>
    context.turn == 1 &&
    context.time == "night"
    , undefined, {
    kinds: ["Townsfolk", "Outsiders"],
    exist: "notInGame"
})

/// 如果自杀，另外一个爪牙变成恶魔
export const Tramsform = new Skill("Tramsform", "P", context =>
    context.player.dead &&
    context.killTarget?.seat == context.player.seat
    , undefined, {
    kinds: ["Minions"],
    exist: "inGame"
})

/// 选择一个目标，他死亡
export const Kill = new Skill("Kill", "P_R", context =>
    AliveAtNight(context) && context.turn != 1,
    (_, payload) => {
        if (payload.result) {
            payload.player.isKilled = true
        }
    })

/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
export const BecomeImp = new Skill("BecomeImp", "C", context =>
    AliveAtNight(context) &&
    context.numberOfAlivePlayer >= 4 && /// 人数大于4人
    context.players.findIndex(p => !p.dead && p.character?.kind == "Demons") == -1 /// 没有存活的恶魔
    , (player, payload) => {
        player.avatar = payload.character
    }, {
    static: Imp
})

/// 可以观看魔典
export const Peep = new Skill("Peep", "T", AliveAtNight)

/// 选择一个目标，他中毒
export const Poison = new Skill("Poison", "P", AliveAtNight, (_, payload) => {
    payload.player.isPoisoned = true
})

/// 选择一个目标，第二天投票他投票你的票才生效
export const ChooseMaster = new Skill("ChooseMaster", "P", AliveAtNight, (_, payload) => {
    payload.player.isMaster = true
})

/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
export const Scapegoat = new Skill("Scapegoat", "P", AliveAtNight, (_, payload) => {
    payload.player.isScapegoat = true
})

/// 当夜晚死亡时，可以被唤醒验证一个人身份
export const WakenKnowCharacter = new Skill("WakenKnowCharacter", "P_C", context =>
    context.player.dead &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night"
)

export const Guard = new Skill("Guard", "P", context =>
    AliveAtNight(context) &&
    context.turn != 1
    , (_, payload) => {
        payload.player.isGuarded = true
    })

export const DigKnowCharacter = new Skill("DigKnowCharacter", "P_C", context =>
    AliveAtNight(context) &&
    !!context.excuteInDay
)

export const CheckImp = new Skill("CheckImp", "PS_R", AliveAtNight)
export const KnowEvilAround = new Skill("KnowEvilAround", "N", AliveAtNight)

export const KnowSeat = new Skill("KnowSeat", "N", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    min: 0,
    max: 2
})
export const KnowMinions = new Skill("KnowMinions", "PS_C", context =>
    AliveAtNight(context) &&
    context.turn === 1
    , undefined, {
    kinds: ["Minions"]
})
export const KnowOutsiders = new Skill("KnowOutsiders", "PS_C", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    kinds: ["Outsiders"]
})
export const KnowTownsfolk = new Skill("KnowTownsfolk", "PS_C", context =>
    AliveAtNight(context) && context.turn === 1
    , undefined, {
    kinds: ["Townsfolk"]
})

export const Nomination = new Skill("Nomination", "NM", undefined, (nominator, payload) => {
    nominator.nominatable = false
    payload.player.canBeNominated = false
    payload.player.isOnGallows = payload.result
})

export const Slay = new Skill("Slay", "P_R", undefined, (_, payload) => {
    payload.player.isSlew = payload.result
})

export const Excute = new Skill("Excute", "P", undefined, (_, payload) => {
    payload.player.isExecuted = true
})