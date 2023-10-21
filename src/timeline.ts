import { IBook } from "./book";
import { IOperation } from "./operation";
import { IPlayer } from "./player";

export interface ITimeline {
    readonly players: IPlayer[]
    readonly turn: number
    readonly time: "day" | "night"
    readonly opertions: IOperation<any>[]
}

export class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    players: IPlayer[];
    opertions: IOperation<any>[];

    constructor(book: IBook, players: IPlayer[], lastTimeline?: ITimeline) {
        const { time, turn } = lastTimeline || { time: 'day', turn: 1 }
        this.turn = time === "night" ? turn + 1 : turn
        this.time = time === "night" ? "day" : "night"
        this.players = players

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