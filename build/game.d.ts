import { IBook } from "./book";
import { IPlayer } from "./player";
import { ITimeline } from "./timeline";
export declare class Game {
    book: IBook;
    players: IPlayer[];
    timelines: ITimeline[];
    constructor(book: IBook, players: IPlayer[], applyTimelines: Record<string, any>[]);
    createTimeline(): ITimeline | undefined;
}
