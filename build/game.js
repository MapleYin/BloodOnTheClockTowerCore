"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var timeline_1 = require("./timeline");
var Game = /** @class */ (function () {
    function Game(book, players, timelines) {
        this.timelines = [];
        this.book = book;
        this.players = players;
    }
    Game.prototype.createTimeline = function () {
        var laseTimeline = this.timelines.length > 1 ? this.timelines[this.timelines.length - 1] : undefined;
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
