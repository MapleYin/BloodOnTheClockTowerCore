import { IBook } from "./book";
import { IPlayer } from "./player";
import { ITimeline } from "./timeline";
export interface IGame {
    readonly book: IBook;
    readonly players: IPlayer[];
    readonly timelines: ITimeline[];
    start(): any;
}
export declare class Game implements IGame {
    book: IBook;
    players: IPlayer[];
    timelines: ITimeline[];
    constructor(book: IBook, players: IPlayer[]);
    start(): void;
    createTimeline(): void;
    updateTimeline(): void;
}
