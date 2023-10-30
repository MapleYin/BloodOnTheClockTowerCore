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
                        item.payload.players = item.payload.players.map(function (player) {
                            return new player_1.Player(__assign(__assign({}, player), { avatar: book.characters.find(function (c) { return c.key === player.avatar.key; }), character: book.characters.find(function (c) { return c.key === player.character.key; }) }));
                        });
                    }
                    if ("player" in item.payload) {
                        item.payload.player = new player_1.Player(__assign(__assign({}, item.payload.player), { avatar: book.characters.find(function (c) { return c.key === item.payload.player.avatar.key; }), character: book.characters.find(function (c) { return c.key === item.payload.player.character.key; }) }));
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
