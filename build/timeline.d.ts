import { IBook } from "./book";
import { IOperation } from "./operation";
import { IPlayer } from "./player";
export interface ITimeline {
    readonly players: IPlayer[];
    readonly turn: number;
    readonly time: "day" | "night";
    readonly operations: IOperation[];
    readonly book: IBook;
}
export declare class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    book: IBook;
    players: IPlayer[];
    lastExcute?: IPlayer;
    operations: IOperation[];
    static from(book: IBook, obj: Record<string, any>): Timeline;
    constructor(book: IBook, players: IPlayer[], lastTimeline?: Timeline);
    private updateOperations;
    updatePayload(at: number, payload: any): void;
    fulfilled(): boolean;
    effected(at?: number): IPlayer[];
}
