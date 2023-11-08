"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillForKey = exports.ExcuteByRack = exports.Excute = exports.Slay = exports.Nomination = exports.KnowTownsfolk = exports.KnowOutsiders = exports.KnowMinions = exports.KnowSeat = exports.KnowEvilAround = exports.CheckImp = exports.DigKnowCharacter = exports.Guard = exports.WakenKnowCharacter = exports.Scapegoat = exports.ChooseMaster = exports.Poison = exports.Peep = exports.BecomeImp = exports.Kill = exports.Tramsform = exports.KnowAbsent = void 0;
var character_1 = require("./character");
var player_1 = require("./player");
var AliveAtNight = function (context) { return !(0, player_1.isDeadPlayer)(context.player) && context.time == "night"; };
var Skill = /** @class */ (function () {
    function Skill(key, payloadKey, validHandler, effect, payloadOptions) {
        this.key = key;
        this.payloadKey = payloadKey;
        this.valid = validHandler || (function () { return true; });
        this.effect = effect || (function () { });
        this.payloadOptions = payloadOptions || { player: {}, character: {}, result: {} };
    }
    return Skill;
}());
/// 得知不在场身份
exports.KnowAbsent = new Skill("KnowAbsent", "CS", function (context) {
    return context.turn == 1 &&
        context.time == "night";
}, undefined, {
    character: {
        kinds: ["Townsfolk", "Outsiders"],
        exist: "notInGame",
        range: {
            min: 3,
            max: 3
        }
    }
});
/// 如果自杀，另外一个爪牙变成恶魔
exports.Tramsform = new Skill("Tramsform", "P", function (context) {
    var _a;
    return (0, player_1.isDeadPlayer)(context.player) &&
        ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat;
}, undefined, {
    player: {
        kinds: ["Minions"]
    }
});
/// 选择一个目标，他死亡
exports.Kill = new Skill("Kill", "P_R", function (context) {
    return AliveAtNight(context) && context.turn != 1;
}, function (_, payload, players) {
    if (payload.result) {
        players[payload.seat - 1].isKilled = true;
    }
}, {
    player: {},
    result: {}
});
/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
exports.BecomeImp = new Skill("BecomeImp", "C", function (context) {
    return !(0, player_1.isDeadPlayer)(context.player) &&
        context.numberOfAlivePlayer >= 4 && /// 人数大于4人
        context.players.findIndex(function (p) { var _a; return !(0, player_1.isDeadPlayer)(p) && ((_a = (0, character_1.CharacterForKey)(p.character)) === null || _a === void 0 ? void 0 : _a.kind) == "Demons"; }) == -1;
} /// 没有存活的恶魔
, function (seat, payload, players) {
    players[seat - 1].avatar = payload.character;
}, {
    character: {
        static: "Imp"
    }
});
/// 可以观看魔典
exports.Peep = new Skill("Peep", "T", AliveAtNight, undefined, {});
/// 选择一个目标，他中毒
exports.Poison = new Skill("Poison", "P", AliveAtNight, function (_, payload, players) {
    players[payload.seat - 1].isPoisoned = true;
}, {
    player: {}
});
/// 选择一个目标，第二天投票他投票你的票才生效
exports.ChooseMaster = new Skill("ChooseMaster", "P", AliveAtNight, function (_, payload, players) {
    players[payload.seat - 1].isMaster = true;
}, {
    player: {}
});
/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
exports.Scapegoat = new Skill("Scapegoat", "P", function (context) {
    var _a;
    return !(0, player_1.isDeadPlayer)(context.player) &&
        ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat &&
        context.time === "night";
}, function (_, payload, players) {
    players[payload.seat - 1].isScapegoat = true;
}, {
    player: {}
});
/// 当夜晚死亡时，可以被唤醒验证一个人身份
exports.WakenKnowCharacter = new Skill("WakenKnowCharacter", "P_C", function (context) {
    var _a;
    return (0, player_1.isDeadPlayer)(context.player) &&
        ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat &&
        context.time === "night";
}, undefined, {
    player: {},
    character: {}
});
exports.Guard = new Skill("Guard", "P", function (context) {
    return AliveAtNight(context) &&
        context.turn != 1;
}, function (_, payload, players) {
    players[payload.seat - 1].isGuarded = true;
}, {
    player: {}
});
exports.DigKnowCharacter = new Skill("DigKnowCharacter", "P_C", function (context) {
    return AliveAtNight(context) &&
        !!context.excuteInDay;
}, undefined, {
    player: {},
    character: {}
});
exports.CheckImp = new Skill("CheckImp", "PS_R", AliveAtNight, undefined, {
    player: {
        range: {
            max: 2,
            min: 2
        },
    },
    result: {}
});
exports.KnowEvilAround = new Skill("KnowEvilAround", "N", AliveAtNight, undefined, {
    range: {
        min: 0,
        max: 2
    }
});
exports.KnowSeat = new Skill("KnowSeat", "N", function (context) {
    return AliveAtNight(context) && context.turn === 1;
}, undefined, {
    range: {
        min: 0,
        max: 2
    }
});
exports.KnowMinions = new Skill("KnowMinions", "PS_C", function (context) {
    return AliveAtNight(context) &&
        context.turn === 1;
}, undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Minions"]
    }
});
exports.KnowOutsiders = new Skill("KnowOutsiders", "PS_C", function (context) {
    return AliveAtNight(context) && context.turn === 1;
}, undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Outsiders"]
    }
});
exports.KnowTownsfolk = new Skill("KnowTownsfolk", "PS_C", function (context) {
    return AliveAtNight(context) && context.turn === 1;
}, undefined, {
    player: {
        range: {
            min: 2,
            max: 2
        }
    },
    character: {
        kinds: ["Townsfolk"]
    }
});
exports.Nomination = new Skill("Nomination", "NM", undefined, function (nominatorSeat, payload, players) {
    players[nominatorSeat - 1].nominationForbiden = true;
    players[payload.seat - 1].canNotBeNominated = true;
    players[payload.seat - 1].isOnGallows = payload.result;
    /// 死亡角色，如果投票后无法再投票
    players.filter(function (p) { return (0, player_1.isDeadPlayer)(p) && payload.seats.includes(p.seat); }).forEach(function (p) {
        p.forbiddenVote = true;
    });
}, {});
exports.Slay = new Skill("Slay", "P_R", undefined, function (_, payload, players) {
    players[payload.seat - 1].isSlew = payload.result;
}, {
    player: {},
    result: {}
});
exports.Excute = new Skill("Excute", "P", undefined, function (_, payload, players) {
    players[payload.seat - 1].isExecuted = true;
}, {
    player: {}
});
exports.ExcuteByRack = new Skill("ExcuteByRack", "P", undefined, function (_, payload, players) {
    players[payload.seat - 1].isExecuted = true;
}, {
    player: {}
});
var All = [exports.KnowAbsent, exports.Tramsform, exports.Kill, exports.BecomeImp, exports.Peep, exports.Poison, exports.ChooseMaster, exports.Scapegoat, exports.WakenKnowCharacter, exports.Guard, exports.DigKnowCharacter, exports.CheckImp, exports.KnowEvilAround, exports.KnowSeat, exports.KnowMinions, exports.KnowOutsiders, exports.KnowTownsfolk, exports.Nomination, exports.Slay, exports.Excute, exports.ExcuteByRack];
var SkillForKey = function (key) { return All.find(function (sk) { return sk.key === key; }); };
exports.SkillForKey = SkillForKey;
