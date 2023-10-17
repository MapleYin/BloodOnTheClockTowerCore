import { IBook } from "./book";
import { IOperation } from "./operation";
import { IPlayer } from "./player";
export interface ITimeline {
    readonly players: IPlayer[];
    readonly turn: number;
    readonly time: "day" | "night";
    readonly opertions: IOperation[];
}
export declare class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    players: IPlayer[];
    opertions: IOperation[];
    constructor(book: IBook, players: IPlayer[], lastTimeline?: ITimeline);
}
