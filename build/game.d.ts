import { IBook } from "./book";
import { IPlayer } from "./player";
import { Timeline } from "./timeline";
export declare class Game {
    book: IBook;
    players: IPlayer[];
    timelines: Timeline[];
    constructor(book: IBook, players: IPlayer[], applyTimelines: Record<string, any>[]);
    createTimeline(): Timeline | undefined;
}
