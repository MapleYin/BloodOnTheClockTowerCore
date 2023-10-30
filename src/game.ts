import { IBook } from "./book";
import { IPlayer } from "./player";
import { ITimeline, Timeline } from "./timeline";

export class Game {
    book: IBook;
    players: IPlayer[];
    timelines: ITimeline[] = []
    constructor(book: IBook, players: IPlayer[], timelines?: ITimeline[]) {
        this.book = book
        this.players = players
    }

    createTimeline(): ITimeline | undefined {
        const laseTimeline = this.timelines.length > 1 ? this.timelines[this.timelines.length - 1] : undefined
        if (laseTimeline && !laseTimeline.fulfilled()) {
            return
        }
        const timeline = new Timeline(this.book, this.players, laseTimeline)
        this.timelines.push(timeline);
        return timeline
    }
}