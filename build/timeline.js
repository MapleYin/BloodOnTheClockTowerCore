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
exports.Timeline = void 0;
var character_1 = require("./character");
var operation_1 = require("./operation");
var player_1 = require("./player");
var skill_1 = require("./skill");
var Timeline = /** @class */ (function () {
    function Timeline(book, players, lastTimeline) {
        var _this = this;
        var _a = lastTimeline || { time: 'day', turn: 1 }, time = _a.time, turn = _a.turn;
        this.turn = time === "night" ? turn + 1 : turn;
        this.time = time === "night" ? "day" : "night";
        this.players = lastTimeline ? lastTimeline.effected() : players;
        /// 进入黑夜需要清除一些状态
        if (this.time === "night") {
            this.players.forEach(player_1.clearStatus);
        }
        var abilities = this.players.flatMap(function (p) {
            var chatacter = (0, character_1.CharacterForKey)(p.avatar);
            if (!chatacter) {
                throw "unexpected character";
            }
            return chatacter.abilities.map(function (skill) {
                return {
                    player: p,
                    skill: skill
                };
            });
        });
        abilities.sort(function (a, b) {
            return book.skills.findIndex(function (skill) { return skill.key === a.skill.key; }) - book.skills.findIndex(function (skill) { return skill.key === b.skill.key; });
        });
        this.operations = abilities.filter(function (ability) {
            var context = {
                turn: _this.turn,
                time: _this.time,
                numberOfPlayer: players.length,
                numberOfAlivePlayer: players.filter(function (p) { return !(0, player_1.isDeadPlayer)(p); }).length,
                players: players,
                player: ability.player
            };
            return ability.skill.valid(context);
        }).map(function (ability) {
            return (0, operation_1.CreateOperation)(ability.player.seat, ability.skill);
        });
    }
    Timeline.from = function (book, obj) {
        var timeline = new Timeline(book, []);
        timeline.turn = obj.turn;
        timeline.time = obj.time;
        timeline.players = obj.players;
        timeline.operations = obj.operations;
        var idx = obj.operations.findIndex((function (op) { return !op.payload; }));
        var players = idx == 0 ? obj.players : timeline.effected(idx);
        var abilities = players.flatMap(function (p) {
            var chatacter = (0, character_1.CharacterForKey)(p.avatar);
            if (!chatacter) {
                throw "unexpected character";
            }
            return chatacter.abilities.map(function (skill) {
                return {
                    player: p,
                    skill: skill
                };
            });
        });
        abilities.sort(function (a, b) {
            return book.skills.findIndex(function (skill) { return skill.key === a.skill.key; }) - book.skills.findIndex(function (skill) { return skill.key === b.skill.key; });
        });
        var operations = abilities.filter(function (ability) {
            var context = {
                turn: obj.turn,
                time: obj.time,
                numberOfPlayer: players.length,
                numberOfAlivePlayer: players.filter(function (p) { return !(0, player_1.isDeadPlayer)(p); }).length,
                players: players,
                player: ability.player
            };
            return ability.skill.valid(context);
        }).map(function (ability) {
            return (0, operation_1.CreateOperation)(ability.player.seat, ability.skill);
        });
        timeline.operations = operations.map(function (op) {
            var idx = obj.operations.findIndex(function (objOp) { return objOp.skill.key === op.skill.key; });
            return idx === -1 ? op : obj.operations(idx);
        });
        return timeline;
    };
    Timeline.prototype.fulfilled = function () {
        return !this.operations.some(function (op) {
            return !op.payload;
        });
    };
    Timeline.prototype.effected = function (at) {
        var progress = typeof at === "number" ? at : this.operations.length;
        var fulfilled = !this.operations.filter(function (_, idx) { return idx < progress; }).some(function (op) { return !op.payload; });
        if (!fulfilled) {
            throw "Operations before ".concat(progress, " are not fulfilled");
        }
        var players = this.players.map(function (p) { return __assign({}, p); });
        this.operations.filter(function (_, idx) { return idx < progress; }).forEach(function (op) {
            var skill = (0, skill_1.SkillForKey)(op.skill.key);
            skill.effect(op.seat, op.payload, players);
        });
        return players;
    };
    return Timeline;
}());
exports.Timeline = Timeline;
