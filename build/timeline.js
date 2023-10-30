"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var operation_1 = require("./operation");
var Timeline = /** @class */ (function () {
    function Timeline(book, players, lastTimeline) {
        var _this = this;
        var _a = lastTimeline || { time: 'day', turn: 1 }, time = _a.time, turn = _a.turn;
        this.turn = time === "night" ? turn + 1 : turn;
        this.time = time === "night" ? "day" : "night";
        this.players = lastTimeline ? lastTimeline.effected() : players;
        var abilities = this.players.flatMap(function (p) {
            return p.avatar.abilities.map(function (skill) {
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
                numberOfAlivePlayer: players.filter(function (p) { return !p.dead; }).length,
                players: players,
                player: ability.player
            };
            return ability.skill.valid(context);
        }).map(function (ability) {
            return (0, operation_1.CreateOperation)(ability.player, ability.skill);
        });
    }
    Timeline.from = function (book, obj) {
        var timeline = new Timeline(book, obj.players);
        timeline.turn = obj.turn;
        timeline.time = obj.time;
        timeline.operations = obj.operations;
        return timeline;
    };
    Timeline.prototype.fulfilled = function () {
        return !this.operations.some(function (op) {
            return !op.payload;
        });
    };
    Timeline.prototype.effected = function () {
        if (!this.fulfilled()) {
            throw "timeline must fulfilled";
        }
        var players = this.players;
        this.operations.forEach(function (op) {
            var payload = op.payload;
            if ("player" in payload) {
                payload.player = players.find(function (p) { return p.seat == payload.player.seat; }) || payload.player;
            }
            if ("players" in payload) {
                payload.players = payload.players.map(function (p) { return players.find(function (_p) { return _p.seat === p.seat; }) || p; });
            }
            var player = players.find(function (p) { return p.seat == op.player.seat; }) || op.player;
            op.skill.effect(player, payload);
        });
        return players;
    };
    return Timeline;
}());
exports.Timeline = Timeline;
