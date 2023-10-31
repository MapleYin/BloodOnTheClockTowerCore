"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
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
        var timeline = new Timeline(book, []);
        timeline.turn = obj.turn;
        timeline.time = obj.time;
        timeline.players = obj.players.map(function (p) { return new player_1.Player(p); });
        timeline.operations = obj.operations.map(function (op) {
            if (op.payload) {
                if ("players" in op.payload) {
                    op.payload.players = op.payload.players.map(function (player) { return new player_1.Player(player); });
                }
                if ("player" in op.payload) {
                    op.payload.player = new player_1.Player(op.payload.player);
                }
                if ("character" in op.payload) {
                    op.payload.character = book.characters.find(function (c) { return c.key === op.payload.character.key; });
                }
                if ("characters" in op.payload) {
                    op.payload.characters = book.characters.filter(function (c) { return op.payload.characters.findIndex(function (char) { return char.key === c.key; }) != -1; });
                }
            }
            return {
                player: new player_1.Player(op.player),
                skill: (0, skill_1.SkillForKey)(op.skill.key),
                payloadKey: op.payloadKey,
                payload: op.payload
            };
        });
        return timeline;
    };
    Timeline.prototype.fulfilled = function () {
        return !this.operations.some(function (op) {
            return !op.payload;
        });
    };
    Timeline.prototype.effected = function (at) {
        var progress = at || this.operations.length;
        var fulfilled = !this.operations.filter(function (_, idx) { return idx < progress; }).some(function (op) { return !op.payload; });
        if (!fulfilled) {
            throw "Operations before ".concat(progress, " are not fulfilled");
        }
        var players = this.players.map(function (p) { return new player_1.Player(p); });
        this.operations.filter(function (_, idx) { return idx < progress; }).forEach(function (op) {
            var payload = op.payload;
            if ("player" in payload) {
                payload.player = players.find(function (p) { return p.seat == payload.player.seat; }) || payload.player;
            }
            if ("players" in payload) {
                payload.players = payload.players.map(function (p) { return players.find(function (_p) { return _p.seat === p.seat; }) || p; });
            }
            var player = players.find(function (p) { return p.seat == op.player.seat; }) || op.player;
            op.player = player;
            op.skill.effect(player, payload);
        });
        return players;
    };
    return Timeline;
}());
exports.Timeline = Timeline;
