import { IBook } from "./book";
import { IOperation } from "./operation";
import { IPlayer } from "./player";
export interface ITimeline {
    readonly players: IPlayer[];
    readonly turn: number;
    readonly time: "day" | "night";
    readonly operations: IOperation[];
}
export declare class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    players: IPlayer[];
    operations: IOperation[];
    static from(book: IBook, obj: Record<string, any>): Timeline;
    constructor(book: IBook, players: IPlayer[], lastTimeline?: Timeline);
    fulfilled(): boolean;
    effected(at?: number): IPlayer[];
}
