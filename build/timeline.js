"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var Timeline = /** @class */ (function () {
    function Timeline(book, players, lastTimeline) {
        var _a = lastTimeline || { time: 'day', turn: 1 }, time = _a.time, turn = _a.turn;
        this.turn = time === "night" ? turn + 1 : turn;
        this.time = time === "night" ? "day" : "night";
        this.players = players;
        /**
        interface IContext {
            /// timeline
            turn: number
            time: "day" | "night"

            numberOfPlayer: number
            numberOfAlivePlayer: number

            player: IPlayer
            killTarget: IPlayer
            excuteInDay?: IPlayer

            players: IPlayer[]
        }
         */
        // book.skills.filter(skill => skill.valid())
    }
    return Timeline;
}());
exports.Timeline = Timeline;
