"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var timeline_1 = require("./timeline");
var Game = /** @class */ (function () {
    function Game(book, players, applyTimelines) {
        this.timelines = [];
        this.book = book;
        this.players = players;
        this.timelines = (applyTimelines === null || applyTimelines === void 0 ? void 0 : applyTimelines.map(function (t) { return timeline_1.Timeline.from(book, t); })) || [];
    }
    Game.prototype.createTimeline = function () {
        var laseTimeline = this.timelines.length > 0 ? this.timelines[this.timelines.length - 1] : undefined;
        var timeline = new timeline_1.Timeline(this.book, this.players, laseTimeline);
        this.timelines.push(timeline);
        return timeline;
    };
    return Game;
}());
exports.Game = Game;
