import { OperationName } from "./operation";
import { IPlayer } from "./player";

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
    readonly key: OperationName

    valid(context: IContext): boolean
}

const AliveAtNight = (context: IContext) => context.player.alive && context.time == "night"

class Skill implements ISkill {

    readonly key: OperationName;
    readonly valid: (context: IContext) => boolean

    constructor(key: OperationName, validHandler: (context: IContext) => boolean) {
        this.key = key
        this.valid = validHandler
    }
}

/// 得知不在场身份
export const KnowAbsent = new Skill("KnowAbsent", context =>
    context.turn == 1 &&
    context.time == "night"
)

/// 如果自杀，另外一个爪牙变成恶魔
export const Tramsform = new Skill("Tramsform", context =>
    !context.player.alive &&
    context.killTarget?.seat == context.player.seat
)

/// 选择一个目标，他死亡
export const Kill = new Skill("Kill", context =>
    AliveAtNight(context) &&
    context.turn != 1
)

/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
export const BecomeImp = new Skill("BecomeImp", context =>
    AliveAtNight(context) &&
    context.numberOfAlivePlayer >= 4 && /// 人数大于4人
    context.players.findIndex(p => p.alive && p.character?.kind == "Demons") == -1 /// 没有存活的恶魔
)

/// 可以观看魔典
export const Peep = new Skill("Peep", AliveAtNight)

/// 选择一个目标，他中毒
export const Poison = new Skill("Poison", AliveAtNight)

/// 选择一个目标，第二天投票他投票你的票才生效
export const ChooseMaster = new Skill("ChooseMaster", AliveAtNight)

/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
export const Scapegoat = new Skill("Scapegoat", AliveAtNight)

/// 当夜晚死亡时，可以被唤醒验证一个人身份
export const WakenKnowCharacter = new Skill("WakenKnowCharacter", context =>
    !context.player.alive &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night"
)

export const Guard = new Skill("Guard", context =>
    AliveAtNight(context) &&
    context.turn != 1
)

export const DigKnowCharacter = new Skill("DigKnowCharacter", context =>
    AliveAtNight(context) &&
    !!context.excuteInDay
)

export const CheckImp = new Skill("CheckImp", AliveAtNight)
export const KnowEvilAround = new Skill("KnowEvilAround", AliveAtNight)

export const KnowSeat = new Skill("KnowSeat", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowMinions = new Skill("KnowMinions", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowOutsiders = new Skill("KnowOutsiders", context =>
    AliveAtNight(context) &&
    context.turn === 1
)
export const KnowTownsfolk = new Skill("KnowTownsfolk", context =>
    AliveAtNight(context) &&
    context.turn === 1
)



