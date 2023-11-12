"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillForKey = exports.ExcuteByRack = exports.Excute = exports.Slay = exports.Nomination = exports.KnowTownsfolk = exports.KnowOutsiders = exports.KnowMinions = exports.KnowSeat = exports.KnowEvilAround = exports.CheckImp = exports.DigKnowCharacter = exports.Guard = exports.WakenKnowCharacter = exports.Scapegoat = exports.ChooseMaster = exports.Poison = exports.Peep = exports.BecomeImp = exports.Kill = exports.Tramsform = exports.KnowAbsent = void 0;
var character_1 = require("./character");
var player_1 = require("./player");
var AliveAtNight = function (context) { return !(0, player_1.isDeadPlayer)(context.player) && context.time == "night"; };
var Skill = /** @class */ (function () {
    function Skill(_a) {
        var key = _a.key, payloadKey = _a.payloadKey, validHandler = _a.validHandler, effect = _a.effect, payloadOptions = _a.payloadOptions;
        this.key = key;
        this.payloadKey = payloadKey;
        this.valid = validHandler || (function () { return true; });
        this.effect = effect || (function () { });
        this.payloadOptions = payloadOptions;
    }
    return Skill;
}());
/// 得知不在场身份
exports.KnowAbsent = new Skill({
    key: "KnowAbsent",
    payloadKey: "CS",
    validHandler: function (context) {
        return context.turn == 1 &&
            context.time == "night";
    },
    payloadOptions: {
        character: {
            kinds: ["Townsfolk", "Outsiders"],
            exist: "notInGame",
            range: {
                min: 3,
                max: 3
            }
        }
    }
});
/// 如果自杀，另外一个爪牙变成恶魔
exports.Tramsform = new Skill({
    key: "Tramsform",
    payloadKey: "P",
    validHandler: function (context) {
        var _a;
        return (0, player_1.isDeadPlayer)(context.player) &&
            ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat;
    },
    effect: function (_, payload, players) {
        if (payload.seat) {
            players[payload.seat - 1].avatar = "Imp";
        }
    },
    payloadOptions: {
        player: {
            kinds: ["Minions"]
        }
    }
});
/// 选择一个目标，他死亡
exports.Kill = new Skill({
    key: "Kill",
    payloadKey: "P_R",
    validHandler: function (context) {
        var _a, _b;
        /// 1. 当晚存活或者击杀目标是自己
        /// 2. 不是第一晚
        /// 3. 当晚恶魔自刀,非新恶魔
        return (AliveAtNight(context) || ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) === context.player.seat)
            && context.turn != 1
            && ((_b = context.tramsformedImp) === null || _b === void 0 ? void 0 : _b.seat) != context.player.seat;
    },
    effect: function (_, payload, players) {
        if (payload.result) {
            players[payload.seat - 1].isKilled = true;
        }
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        result: {}
    }
});
/// 如果存活的人数大于等于5 人时，恶魔死亡时，可以变成恶魔
exports.BecomeImp = new Skill({
    key: "BecomeImp",
    payloadKey: "C",
    validHandler: function (context) {
        return !(0, player_1.isDeadPlayer)(context.player) &&
            context.time == "day" &&
            context.numberOfAlivePlayer >= 4 && /// 人数大于4人
            context.players.findIndex(function (p) { var _a; return !(0, player_1.isDeadPlayer)(p) && ((_a = (0, character_1.CharacterForKey)(p.avatar)) === null || _a === void 0 ? void 0 : _a.kind) == "Demons"; }) == -1;
    },
    effect: function (seat, payload, players) {
        players[seat - 1].avatar = payload.character;
    },
    payloadOptions: {
        character: {
            static: "Imp"
        }
    }
});
/// 可以观看魔典
exports.Peep = new Skill({ key: "Peep", payloadKey: "T", validHandler: AliveAtNight, payloadOptions: {} });
/// 选择一个目标，他中毒
exports.Poison = new Skill({
    key: "Poison",
    payloadKey: "P",
    validHandler: function (context) {
        var _a;
        return AliveAtNight(context) || ((_a = context.tramsformedImp) === null || _a === void 0 ? void 0 : _a.seat) === context.player.seat;
    },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isPoisoned = true;
    },
    payloadOptions: {
        player: {
            requireInput: true
        }
    }
});
/// 选择一个目标，第二天投票他投票你的票才生效
exports.ChooseMaster = new Skill({
    key: "ChooseMaster",
    payloadKey: "P",
    validHandler: AliveAtNight,
    effect: function (_, payload, players) {
        players[payload.seat - 1].isMaster = true;
    },
    payloadOptions: {
        player: {
            requireInput: true
        }
    }
});
/// 当恶魔技能以你为目标时，有另外一个村民会替你死亡
exports.Scapegoat = new Skill({
    key: "Scapegoat",
    payloadKey: "P",
    validHandler: function (context) {
        var _a;
        return !(0, player_1.isDeadPlayer)(context.player) &&
            ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat &&
            context.time === "night";
    },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isScapegoat = true;
    },
    payloadOptions: {
        player: {}
    }
});
/// 当夜晚死亡时，可以被唤醒验证一个人身份
exports.WakenKnowCharacter = new Skill({
    key: "WakenKnowCharacter",
    payloadKey: "P_C",
    validHandler: function (context) {
        var _a;
        return (0, player_1.isDeadPlayer)(context.player) &&
            ((_a = context.killTarget) === null || _a === void 0 ? void 0 : _a.seat) == context.player.seat &&
            context.time === "night";
    },
    payloadOptions: {
        player: {
            requireInput: true
        },
        character: {}
    }
});
exports.Guard = new Skill({
    key: "Guard",
    payloadKey: "P",
    validHandler: function (context) {
        return AliveAtNight(context) &&
            context.turn != 1;
    },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isGuarded = true;
    },
    payloadOptions: {
        player: {
            requireInput: true
        }
    }
});
exports.DigKnowCharacter = new Skill({
    key: "DigKnowCharacter",
    payloadKey: "C",
    validHandler: function (context) {
        return AliveAtNight(context) && !!context.excuteInDay;
    },
    payloadOptions: {
        character: {}
    }
});
exports.CheckImp = new Skill({
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
        result: {}
    }
});
exports.KnowEvilAround = new Skill({
    key: "KnowEvilAround",
    payloadKey: "N",
    validHandler: AliveAtNight,
    payloadOptions: {
        range: {
            min: 0,
            max: 2
        }
    }
});
exports.KnowSeat = new Skill({
    key: "KnowSeat",
    payloadKey: "N",
    validHandler: function (context) {
        return AliveAtNight(context) && context.turn === 1;
    },
    payloadOptions: {
        range: {
            min: 0,
            max: 2
        }
    }
});
exports.KnowMinions = new Skill({
    key: "KnowMinions",
    payloadKey: "PS_C",
    validHandler: function (context) {
        return AliveAtNight(context) &&
            context.turn === 1;
    },
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
    }
});
exports.KnowOutsiders = new Skill({
    key: "KnowOutsiders",
    payloadKey: "PS_C",
    validHandler: function (context) {
        return AliveAtNight(context) && context.turn === 1;
    },
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
    }
});
exports.KnowTownsfolk = new Skill({
    key: "KnowTownsfolk",
    payloadKey: "PS_C",
    validHandler: function (context) {
        return AliveAtNight(context) && context.turn === 1;
    },
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
    }
});
exports.Nomination = new Skill({
    key: "Nomination",
    payloadKey: "NM",
    effect: function (nominatorSeat, payload, players) {
        players[nominatorSeat - 1].nominationForbiden = true;
        players[payload.seat - 1].canNotBeNominated = true;
        players[payload.seat - 1].isOnGallows = payload.result;
        /// 死亡角色，如果投票后无法再投票
        players.filter(function (p) { return (0, player_1.isDeadPlayer)(p) && payload.seats.includes(p.seat); }).forEach(function (p) {
            p.forbiddenVote = true;
        });
    },
    payloadOptions: {}
});
exports.Slay = new Skill({
    key: "Slay",
    payloadKey: "P_R",
    effect: function (_, payload, players) {
        players[payload.seat - 1].isSlew = payload.result;
    },
    payloadOptions: {
        player: {},
        result: {}
    }
});
exports.Excute = new Skill({
    key: "Excute",
    payloadKey: "P",
    effect: function (_, payload, players) {
        players[payload.seat - 1].isExecuted = true;
    },
    payloadOptions: {
        player: {}
    }
});
exports.ExcuteByRack = new Skill({
    key: "ExcuteByRack",
    payloadKey: "P",
    effect: function (_, payload, players) {
        players[payload.seat - 1].isExecuted = true;
    },
    payloadOptions: {
        player: {}
    }
});
var All = [exports.KnowAbsent, exports.Tramsform, exports.Kill, exports.BecomeImp, exports.Peep, exports.Poison, exports.ChooseMaster, exports.Scapegoat, exports.WakenKnowCharacter, exports.Guard, exports.DigKnowCharacter, exports.CheckImp, exports.KnowEvilAround, exports.KnowSeat, exports.KnowMinions, exports.KnowOutsiders, exports.KnowTownsfolk, exports.Nomination, exports.Slay, exports.Excute, exports.ExcuteByRack];
var SkillForKey = function (key) { return All.find(function (sk) { return sk.key === key; }); };
exports.SkillForKey = SkillForKey;
