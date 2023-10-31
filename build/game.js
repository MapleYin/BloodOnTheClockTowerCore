"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var player_1 = require("./player");
var timeline_1 = require("./timeline");
var Game = /** @class */ (function () {
    function Game(book, players, applyTimelines) {
        var _this = this;
        this.timelines = [];
        this.book = book;
        this.players = players;
        applyTimelines.forEach(function (item) {
            var timeline = _this.createTimeline();
            timeline === null || timeline === void 0 ? void 0 : timeline.operations.forEach(function (op) {
                if (item.payload) {
                    if ("players" in item.payload) {
                        item.payload.players = item.payload.players.map(function (player) { return new player_1.Player(player); });
                    }
                    if ("player" in item.payload) {
                        item.payload.player = new player_1.Player(item.payload.player);
                    }
                    if ("character" in item.payload) {
                        item.payload.character = book.characters.find(function (c) { return c.key === item.payload.character.key; });
                    }
                    if ("characters" in item.payload) {
                        item.payload.characters = book.characters.filter(function (c) { return item.payload.characters.findIndex(function (char) { return char.key === c.key; }) != -1; });
                    }
                }
                op.payload = item.payload;
            });
        });
    }
    Game.prototype.createTimeline = function () {
        var laseTimeline = this.timelines.length > 0 ? this.timelines[this.timelines.length - 1] : undefined;
        if (laseTimeline && !laseTimeline.fulfilled()) {
            return;
        }
        var timeline = new timeline_1.Timeline(this.book, this.players, laseTimeline);
        this.timelines.push(timeline);
        return timeline;
    };
    return Game;
}());
exports.Game = Game;
