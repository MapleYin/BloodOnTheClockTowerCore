import { IBook } from "./book";
import { IPlayer } from "./player";
import { Timeline } from "./timeline";

export class Game {
    book: IBook;
    players: IPlayer[];
    timelines: Timeline[] = []
    constructor(book: IBook, players: IPlayer[], applyTimelines?: Record<string, any>[]) {
        this.book = book
        this.players = players
        this.timelines = applyTimelines?.map(t => Timeline.from(book, t)) || []
    }

    createTimeline(): Timeline | undefined {
        const laseTimeline = this.timelines.length > 0 ? this.timelines[this.timelines.length - 1] : undefined
        const timeline = new Timeline(this.book, this.players, laseTimeline)
        this.timelines.push(timeline);
        return timeline
    }
}