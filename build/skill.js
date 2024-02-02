"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillForKey = exports.skills = exports.DreamADream = exports.TimeTick = exports.ExcuteByRack = exports.Excute = exports.Slay = exports.Nomination = exports.KnowTownsfolk = exports.KnowOutsiders = exports.KnowMinions = exports.KnowSeat = exports.KnowEvilAround = exports.CheckImp = exports.DigKnowCharacter = exports.Guard = exports.WakenKnowCharacter = exports.Scapegoat = exports.ChooseMaster = exports.Poison = exports.Peep = exports.BecomeImp = exports.Kill = exports.Tramsform = exports.KnowAbsent = void 0;
var character_1 = require("./character");
var player_1 = require("./player");
var firstNight = function (context) {
    return context.timeline.time === "night" && context.timeline.turn === 1;
};
var otherNight = function (context) {
    return context.timeline.time === "night" && context.timeline.turn > 1;
};
var isAlive = function (context) {
    return !(0, player_1.isDeadPlayer)(context.player);
};
var isAliveAtNight = function (context) {
    return isAlive(context) && context.timeline.time === "night";
};
var CreateSkill = function (params) {
    return params;
};
exports.KnowAbsent = CreateSkill({
    key: "KnowAbsent",
    description: "得知三个不在场身份",
    valid: firstNight,
    type: "CS",
    options: {
        "character": {
            "kinds": ["Townsfolk", "Outsiders"],
            "exist": "notInGame",
            "range": { "min": 3, "max": 3 }
        },
        "output": { "disabled": true }
    }
});
exports.Tramsform = CreateSkill({
    key: "Tramsform",
    description: "选择1个爪牙变成小恶魔",
    valid: function (context) {
        if (!(0, player_1.isDeadPlayer)(context.player)) {
            return false;
        }
        var timeline = context.timeline;
        if (timeline.time === "day") {
            return false;
        }
        var operation = timeline.operations.find(function (operation) { return operation.skill.key === exports.Kill.key; });
        if (!operation ||
            operation.payloadKey != "P_R" ||
            !operation.payload ||
            !operation.payload.result ||
            operation.payload.seat != context.player.seat) {
            return false;
        }
        return true;
    },
    effect: function (seat, payload, players) {
        players[payload.seat - 1].avatar = "Imp";
    },
    type: "P",
    options: {
        "player": {
            "kinds": ["Minions"]
        },
        "output": { "disabled": true }
    }
});
exports.Kill = CreateSkill({
    key: "Kill",
    description: "选择1个目标，他死亡",
    valid: function (context) { return !(0, player_1.isDeadPlayer)(context.player) && otherNight(context); },
    effect: function (seat, payload, players) {
        players[payload.seat - 1].isKilled = payload.result;
    },
    type: "P_R",
    options: {
        "player": {},
        "result": {
            "display": ["未能杀害", "杀害成功"],
            "prompt": "杀害是否生效",
            "subPrompt": "注：未生效情况可能有，士兵、市长、僧侣技能等",
            "default": true
        },
        "output": { "disabled": true }
    }
});
exports.BecomeImp = CreateSkill({
    key: "BecomeImp",
    description: "化身为恶魔",
    valid: function (context) {
        if ((0, player_1.isDeadPlayer)(context.player)) {
            return false;
        }
        var timeline = context.timeline;
        var aliveDemons = timeline.players.filter(function (player) { var _a; return ((_a = (0, character_1.CharacterForKey)(player.avatar)) === null || _a === void 0 ? void 0 : _a.kind) === "Demons" && !(0, player_1.isDeadPlayer)(player); });
        var deadDemons = context.players.filter(function (player) { var _a; return ((_a = (0, character_1.CharacterForKey)(player.avatar)) === null || _a === void 0 ? void 0 : _a.kind) === "Demons" && (0, player_1.isDeadPlayer)(player); });
        var demonsDeadToday = deadDemons.find(function (dead) { return aliveDemons.findIndex(function (alive) { return alive.seat === dead.seat; }) !== -1; });
        var numberOfAlivePlayer = context.players.filter(function (player) { return !(0, player_1.isDeadPlayer)(player); }).length;
        return !!demonsDeadToday && numberOfAlivePlayer >= 4;
    },
    effect: function (seat, payload, players) {
        var timeline = payload;
        var aliveDemons = timeline.players.filter(function (player) { var _a; return ((_a = (0, character_1.CharacterForKey)(player.avatar)) === null || _a === void 0 ? void 0 : _a.kind) === "Demons" && !(0, player_1.isDeadPlayer)(player); });
        var deadDemons = players.filter(function (player) { var _a; return ((_a = (0, character_1.CharacterForKey)(player.avatar)) === null || _a === void 0 ? void 0 : _a.kind) === "Demons" && (0, player_1.isDeadPlayer)(player); });
        var demonsDeadToday = deadDemons.find(function (dead) { return aliveDemons.findIndex(function (alive) { return alive.seat === dead.seat; }) !== -1; });
        if (demonsDeadToday) {
            players[seat - 1].avatar = demonsDeadToday.avatar;
        }
    },
    type: "A",
    options: {
        "output": { "disabled": true }
    }
});
exports.Peep = CreateSkill({
    key: "Peep",
    description: "得知所有信息",
    valid: isAliveAtNight,
    type: "T",
    options: {},
});
exports.Poison = CreateSkill({
    key: "Poison",
    description: "选择1名玩家，他中毒",
    valid: isAliveAtNight,
    effect: function (_, payload, players) {
        players[payload.seat - 1].isPoisoned = true;
    },
    type: "P",
    options: {
        "player": {},
        "output": { "disabled": true }
    }
});
exports.ChooseMaster = CreateSkill({
    key: "ChooseMaster",
    description: "选择1名玩家作为主人",
    valid: isAliveAtNight,
    effect: function (_, payload, players) {
        players[payload.seat - 1].isMaster = true;
    },
    type: "P",
    options: {
        "player": {},
        "output": { "disabled": true }
    },
});
exports.Scapegoat = CreateSkill({
    key: "Scapegoat",
    description: "选择1名玩家代替市长死亡",
    /// 即将死亡
    valid: function (_) { return true; },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isScapegoat = true;
    },
    type: "P",
    options: {
        "player": {},
        "output": { "disabled": true }
    }
});
exports.WakenKnowCharacter = CreateSkill({
    key: "WakenKnowCharacter",
    description: "选择1名玩家，得知他的身份",
    valid: function (context) {
        var atNight = context.timeline.time === "night";
        var beforeNightPlayer = context.timeline.players.find(function (player) { return player.seat === context.player.seat; });
        return atNight && !!beforeNightPlayer && !(0, player_1.isDeadPlayer)(beforeNightPlayer) && (0, player_1.isDeadPlayer)(context.player);
    },
    type: "P_C",
    options: {
        "player": {},
        "character": {}
    }
});
exports.Guard = CreateSkill({
    key: "Guard",
    description: "选择1名玩家，守护他",
    valid: function (context) { return isAliveAtNight(context) && otherNight(context); },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isGuarded = payload.result;
    },
    type: "P_R",
    options: {
        "player": {},
        "result": {
            "display": ["守护成功", "守护失败"],
            "prompt": "守护是否生效",
            "subPrompt": "注：未生效情况可能是：被毒、是酒鬼",
            "default": true
        },
        "output": { "disabled": true }
    }
});
exports.DigKnowCharacter = CreateSkill({
    key: "DigKnowCharacter",
    description: "得知昨天白天被处决玩家的角色",
    valid: function (context) { return isAliveAtNight(context) && otherNight(context); },
    type: "C",
    options: {
        "character": {},
        "display": {
            "excution": true
        }
    }
});
exports.CheckImp = CreateSkill({
    key: "CheckImp",
    description: "选择2个玩家，是否存在恶魔",
    valid: isAliveAtNight,
    type: "PS_R",
    options: {
        "player": {
            "range": { "max": 2, "min": 2 }
        },
        "result": {
            "display": ["无恶魔", "有恶魔"],
            "prompt": "是否存在恶魔"
        }
    }
});
exports.KnowEvilAround = CreateSkill({
    key: "KnowEvilAround",
    description: "得知两边邪恶玩家人数",
    valid: isAliveAtNight,
    type: "N",
    options: {
        "range": { "min": 0, "max": 2 },
        "display": { "players": true }
    }
});
exports.KnowSeat = CreateSkill({
    key: "KnowSeat",
    description: "得知有多少对邪恶玩家邻座",
    valid: isAliveAtNight,
    type: "N",
    options: {
        "range": { "min": 0, "max": 4 },
        "display": { "players": true }
    }
});
exports.KnowMinions = CreateSkill({
    key: "KnowMinions",
    description: "得知2名玩家中1个是某个爪牙",
    valid: firstNight,
    type: "PS_C",
    options: {
        "player": {
            "range": { "min": 2, "max": 2 }
        },
        "character": {
            "kinds": ["Minions"]
        }
    }
});
exports.KnowOutsiders = CreateSkill({
    key: "KnowOutsiders",
    description: "得知2名玩家中1个是某个外来者",
    valid: firstNight,
    type: "PS_C",
    options: {
        player: {
            range: { min: 2, max: 2 }
        },
        character: {
            kinds: ["Outsiders"],
            range: { min: 0, max: 1 }
        }
    }
});
exports.KnowTownsfolk = CreateSkill({
    key: "KnowTownsfolk",
    description: "得知2名玩家中1个是某个村民",
    valid: firstNight,
    type: "PS_C",
    options: {
        player: {
            range: { min: 2, max: 2 }
        },
        character: {
            kinds: ["Townsfolk"]
        }
    }
});
exports.Nomination = CreateSkill({
    key: "Nomination",
    description: "提名玩家",
    valid: function (_) { return true; },
    effect: function (nominatorSeat, payload, players) {
        players[nominatorSeat - 1].nominationForbiden = true;
        players[payload.seat - 1].canNotBeNominated = true;
        players[payload.seat - 1].isOnGallows = payload.result;
        /// 死亡角色，如果投票后无法再投票
        players.filter(function (p) { return (0, player_1.isDeadPlayer)(p) && payload.seats.includes(p.seat); }).forEach(function (p) {
            p.forbiddenVote = true;
        });
    },
    type: "NM",
    options: {}
});
exports.Slay = CreateSkill({
    key: "Slay",
    description: "猎杀",
    valid: function (_) { return true; },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isSlew = payload.result;
    },
    type: "P_R",
    options: {
        player: {},
        result: {
            display: ["无事发生", "猎杀成功"],
            prompt: "猎杀是否生效"
        }
    }
});
exports.Excute = CreateSkill({
    key: "Excute",
    description: "提名圣女被处决",
    valid: function (_) { return true; },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isExecuted = true;
    },
    type: "P",
    options: {
        player: {}
    }
});
exports.ExcuteByRack = CreateSkill({
    key: "ExcuteByRack",
    description: "上处刑架被处决",
    valid: function (_) { return true; },
    effect: function (_, payload, players) {
        players[payload.seat - 1].isExecuted = true;
    },
    type: "P",
    options: {
        "player": {}
    }
});
exports.TimeTick = CreateSkill({
    key: "TimeTick",
    description: "得知恶魔与爪牙最近的距离",
    valid: firstNight,
    type: "N",
    options: {
        "display": {
            "players": true
        }
    }
});
exports.DreamADream = CreateSkill({
    key: "DreamADream",
    description: "得知1名玩家是1个善良和1个邪恶角色中1个",
    valid: firstNight,
    type: "P_CS",
    options: {
        "player": {
            range: { min: 1, max: 1 }
        },
        character: {
            range: { min: 2, max: 2 }
        },
        "display": {
            "players": true
        }
    }
});
exports.skills = [
    exports.KnowAbsent,
    exports.Tramsform,
    exports.Kill,
    exports.BecomeImp,
    exports.Peep,
    exports.Poison,
    exports.ChooseMaster,
    exports.Scapegoat,
    exports.WakenKnowCharacter,
    exports.Guard,
    exports.DigKnowCharacter,
    exports.CheckImp,
    exports.KnowEvilAround,
    exports.KnowSeat,
    exports.KnowMinions,
    exports.KnowOutsiders,
    exports.KnowTownsfolk,
    exports.Slay,
    exports.Excute,
    exports.Nomination,
    exports.ExcuteByRack,
    exports.TimeTick,
];
var SkillForKey = function (key) { return exports.skills.find(function (s) { return s.key == key; }); };
exports.SkillForKey = SkillForKey;
