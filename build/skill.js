"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excute = exports.Slay = exports.Nomination = exports.KnowTownsfolk = exports.KnowOutsiders = exports.KnowMinions = exports.KnowSeat = exports.KnowEvilAround = exports.CheckImp = exports.DigKnowCharacter = exports.Guard = exports.WakenKnowCharacter = exports.Scapegoat = exports.ChooseMaster = exports.Poison = exports.Peep = exports.BecomeImp = exports.Kill = exports.Tramsform = exports.KnowAbsent = void 0;
var AliveAtNight = function (context) { return !context.player.dead && context.time == "night"; };
var Skill = /** @class */ (function () {
    function Skill(key, payloadKey, validHandler) {
        this.key = key;
        this.payloadKey = payloadKey;
        this.valid = validHandler || (function () { return true; });
    }
    return Skill;
}());
/// 得知不在场身份
exports.KnowAbsent = new Skill("KnowAbsent", "CS", function (context) {
    return context.turn == 1 &&
        context.time == "night";
});
/// 如果自杀，另外一个爪牙变成恶魔
exports.Tramsform = new Skill("Tramsform", "P", function (context) {
    var _a;
    return context.player.dead &&
        ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat;
});
/// 选择一个目标，他死亡
exports.Kill = new Skill("Kill", "P_R", function (context) {
    return AliveAtNight(context) &&
        context.turn != 1;
});
/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
exports.BecomeImp = new Skill("BecomeImp", "C", function (context) {
    return AliveAtNight(context) &&
        context.numberOfAlivePlayer >= 4 && /// 人数大于4人
        context.players.findIndex(function (p) { var _a; return !p.dead && ((_a = p.character) === null || _a === void 0 ? void 0 : _a.kind) == "Demons"; }) == -1;
} /// 没有存活的恶魔
);
/// 可以观看魔典
exports.Peep = new Skill("Peep", "T", AliveAtNight);
/// 选择一个目标，他中毒
exports.Poison = new Skill("Poison", "P", AliveAtNight);
/// 选择一个目标，第二天投票他投票你的票才生效
exports.ChooseMaster = new Skill("ChooseMaster", "P", AliveAtNight);
/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
exports.Scapegoat = new Skill("Scapegoat", "P", AliveAtNight);
/// 当夜晚死亡时，可以被唤醒验证一个人身份
exports.WakenKnowCharacter = new Skill("WakenKnowCharacter", "P_C", function (context) {
    var _a;
    return context.player.dead &&
        ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat &&
        context.time === "night";
});
exports.Guard = new Skill("Guard", "P", function (context) {
    return AliveAtNight(context) &&
        context.turn != 1;
});
exports.DigKnowCharacter = new Skill("DigKnowCharacter", "P_C", function (context) {
    return AliveAtNight(context) &&
        !!context.excuteInDay;
});
exports.CheckImp = new Skill("CheckImp", "PS_R", AliveAtNight);
exports.KnowEvilAround = new Skill("KnowEvilAround", "N", AliveAtNight);
exports.KnowSeat = new Skill("KnowSeat", "N", function (context) {
    return AliveAtNight(context) &&
        context.turn === 1;
});
exports.KnowMinions = new Skill("KnowMinions", "PS_C", function (context) {
    return AliveAtNight(context) &&
        context.turn === 1;
});
exports.KnowOutsiders = new Skill("KnowOutsiders", "PS_C", function (context) {
    return AliveAtNight(context) &&
        context.turn === 1;
});
exports.KnowTownsfolk = new Skill("KnowTownsfolk", "PS_C", function (context) {
    return AliveAtNight(context) &&
        context.turn === 1;
});
exports.Nomination = new Skill("Nomination", "NM");
exports.Slay = new Skill("Slay", "P_R");
exports.Excute = new Skill("Excute", "P");
