"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
class Timeline {
    turn;
    time;
    players;
    opertions;
    constructor(book, players, lastTimeline) {
        const { time, turn } = lastTimeline || { time: 'day', turn: 1 };
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
}
exports.Timeline = Timeline;
