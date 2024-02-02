"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOperations = exports.NextTimeline = void 0;
var book_1 = require("./book");
var character_1 = require("./character");
var operation_1 = require("./operation");
var player_1 = require("./player");
function NextTimeline() {
    var _a;
    var bookKey;
    var players;
    var time;
    var turn;
    var excuteInDay;
    if (arguments.length === 1) {
        var lastTimeline = arguments[0];
        bookKey = lastTimeline.bookKey || ((_a = lastTimeline.book) === null || _a === void 0 ? void 0 : _a.key) || "";
        players = MakePlayerEffect(lastTimeline);
        time = lastTimeline.time === "night" ? "day" : "night";
        turn = lastTimeline.time === "night" ? lastTimeline.turn + 1 : lastTimeline.turn;
        if (lastTimeline.time == "day") {
            var beforeDay_1 = lastTimeline.players.filter(function (player) { return player.isExecuted; });
            var afterDay = MakePlayerEffect(lastTimeline).filter(function (player) { return player.isExecuted; });
            excuteInDay = afterDay.find(function (ap) { return beforeDay_1.findIndex(function (bp) { return bp.seat === ap.seat; }) === -1; }) || undefined;
        }
    }
    else {
        bookKey = arguments[0];
        players = arguments[1];
        time = "night";
        turn = 1;
    }
    var timeline = {
        bookKey: bookKey,
        time: time,
        turn: turn,
        players: players,
        operatedPlayers: [],
        operations: [],
        extra: {
            excuteInDay: excuteInDay
        }
    };
    /// clear status
    if (time === "night") {
        timeline.players.forEach(player_1.clearStatus);
    }
    (0, exports.UpdateOperations)(timeline);
    return timeline;
}
exports.NextTimeline = NextTimeline;
var UpdateOperations = function (timeline) {
    var book = (0, book_1.BookForName)(timeline.bookKey);
    if (!book) {
        return;
    }
    var players = timeline.players.map(function (player) { return (__assign({}, player)); });
    /// all posible abilities
    var abilities = timeline.players
        .flatMap(function (player) {
        var _a;
        return (_a = (0, character_1.CharacterForKey)(player.avatar)) === null || _a === void 0 ? void 0 : _a.abilities.map(function (skill) { return ({
            player: player,
            skill: skill
        }); });
    })
        .sort(function (a, b) { return book.skills.findIndex(function (s) { var _a; return ((_a = a === null || a === void 0 ? void 0 : a.skill) === null || _a === void 0 ? void 0 : _a.key) === s.key; }) - book.skills.findIndex(function (s) { var _a; return ((_a = b === null || b === void 0 ? void 0 : b.skill) === null || _a === void 0 ? void 0 : _a.key) === s.key; }); })
        .filter(function (ability) { return ability && ability.skill; });
    var oldOperations = timeline.operations.slice(0);
    var oldOperation = oldOperations.shift();
    /// abilities => operations
    var operations = [];
    for (var idx = 0; idx < abilities.length; idx++) {
        var ability = abilities[idx];
        var skill = ability.skill;
        var player = ability.player;
        var context = {
            timeline: timeline,
            player: players[player.seat - 1],
            players: players,
        };
        /// 添加手动添加的操作
        while (oldOperation && oldOperation.manual) {
            (0, operation_1.EffectOperation)(oldOperation, players);
            operations.push(oldOperation);
            oldOperation = oldOperations.shift();
        }
        if (!skill.valid(context)) {
            if (oldOperation && oldOperation.skill.key === skill.key && oldOperation.seat === context.player.seat) {
                oldOperation = oldOperations.shift();
            }
            continue;
        }
        var operation = oldOperation;
        if (operation && operation.skill.key === skill.key) {
            oldOperation = oldOperations.shift();
            (0, operation_1.EffectOperation)(operation, players);
        }
        else {
            var payloadKey = skill.payloadKey || skill.type;
            operation = {
                seat: ability.player.seat,
                skill: skill,
                players: players.map(function (player) { return (__assign({}, player)); }),
                payloadKey: payloadKey,
            };
            if (payloadKey === "A") {
                operation.payload = timeline;
                (0, operation_1.EffectOperation)(operation, players);
            }
        }
        operations.push(operation);
    }
    timeline.operations = operations;
    timeline.operatedPlayers = players;
};
exports.UpdateOperations = UpdateOperations;
var MakePlayerEffect = function (timeline) {
    var players = timeline.players.map(function (player) { return (__assign({}, player)); });
    timeline.operations.filter(function (operation) { return operation.payload; }).forEach(function (operation) {
        (0, operation_1.EffectOperation)(operation, players);
    });
    return players;
};
