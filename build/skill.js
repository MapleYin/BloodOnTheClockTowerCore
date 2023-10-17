"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowTownsfolk = exports.KnowOutsiders = exports.KnowMinions = exports.KnowSeat = exports.KnowEvilAround = exports.CheckImp = exports.DigKnowCharacter = exports.Guard = exports.WakenKnowCharacter = exports.KeepAlive = exports.Scapegoat = exports.ChooseMaster = exports.Poison = exports.Peep = exports.BecomeImp = exports.Kill = exports.Tramsform = exports.KnowAbsent = void 0;
const AliveAtNight = (context) => context.player.alive && context.time == "night";
class Skill {
    key;
    valid;
    constructor(key, validHandler) {
        this.key = key;
        this.valid = validHandler;
    }
}
/// 得知不在场身份
exports.KnowAbsent = new Skill("KnowAbsent", context => context.turn == 1 &&
    context.time == "night");
/// 如果自杀，另外一个爪牙变成恶魔
exports.Tramsform = new Skill("Tramsform", context => !context.player.alive &&
    context.killTarget?.seat == context.player.seat);
/// 选择一个目标，他死亡
exports.Kill = new Skill("Kill", context => AliveAtNight(context) &&
    context.turn != 1);
/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
exports.BecomeImp = new Skill("BecomeImp", context => AliveAtNight(context) &&
    context.numberOfAlivePlayer >= 4 && /// 人数大于4人
    context.players.findIndex(p => p.alive && p.character.kind == "Demons" /* EKind.demons */) == -1 /// 没有存活的恶魔
);
/// 可以观看魔典
exports.Peep = new Skill("Peep", AliveAtNight);
/// 选择一个目标，他中毒
exports.Poison = new Skill("Poison", AliveAtNight);
/// 选择一个目标，第二天投票他投票你的票才生效
exports.ChooseMaster = new Skill("ChooseMaster", AliveAtNight);
/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
exports.Scapegoat = new Skill("Scapegoat", AliveAtNight);
/// 恶魔技能对你无效
exports.KeepAlive = new Skill("KeepAlive", context => AliveAtNight(context) &&
    context.killTarget?.seat == context.player.seat);
/// 当夜晚死亡时，可以被唤醒验证一个人身份
exports.WakenKnowCharacter = new Skill("WakenKnowCharacter", context => !context.player.alive &&
    context.killTarget?.seat == context.player.seat &&
    context.time === "night");
exports.Guard = new Skill("Guard", context => AliveAtNight(context) &&
    context.turn != 1);
exports.DigKnowCharacter = new Skill("DigKnowCharacter", context => AliveAtNight(context) &&
    !!context.excuteInDay);
exports.CheckImp = new Skill("CheckImp", AliveAtNight);
exports.KnowEvilAround = new Skill("KnowEvilAround", AliveAtNight);
exports.KnowSeat = new Skill("KnowSeat", context => AliveAtNight(context) &&
    context.turn === 1);
exports.KnowMinions = new Skill("KnowMinions", context => AliveAtNight(context) &&
    context.turn === 1);
exports.KnowOutsiders = new Skill("KnowOutsiders", context => AliveAtNight(context) &&
    context.turn === 1);
exports.KnowTownsfolk = new Skill("KnowTownsfolk", context => AliveAtNight(context) &&
    context.turn === 1);
