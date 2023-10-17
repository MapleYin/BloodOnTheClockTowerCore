import { IBook } from "./book";
import { IPlayer } from "./player";
import { ITimeline } from "./timeline";

export interface IGame {
    readonly book: IBook
    readonly players: IPlayer[]
    readonly timelines: ITimeline[]

    start()
}

export class Game implements IGame {
    book: IBook;
    players: IPlayer[];
    timelines: ITimeline[] = []
    constructor(book: IBook, players: IPlayer[]) {
        this.book = book
        this.players = players
    }

    start() {

    }

    createTimeline() {

    }

    updateTimeline() {
        
    }
}