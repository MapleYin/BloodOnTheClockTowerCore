import { IBook } from "./book";
import { IOperation } from "./operation";
import { IPlayer } from "./player";
export interface ITimeline {
    readonly players: IPlayer[];
    readonly turn: number;
    readonly time: "day" | "night";
    readonly operations: IOperation[];
    fulfilled(): boolean;
    effected(): IPlayer[];
}
export declare class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    players: IPlayer[];
    operations: IOperation[];
    static from(book: IBook, obj: Record<string, any>): void;
    constructor(book: IBook, players: IPlayer[], lastTimeline?: ITimeline);
    fulfilled(): boolean;
    effected(at?: number): IPlayer[];
}
