import { IBook } from "./book";
import { IPlayer, Player } from "./player";
import { ITimeline, Timeline } from "./timeline";

export class Game {
    book: IBook;
    players: IPlayer[];
    timelines: ITimeline[] = []
    constructor(book: IBook, players: IPlayer[], applyTimelines: Record<string, any>[]) {
        this.book = book
        this.players = players
        applyTimelines.forEach((item) => {
            const timeline = this.createTimeline()
            timeline?.operations.forEach(op => {
                if (item.payload) {
                    if ("players" in item.payload) {
                        item.payload.players = item.payload.players.map(player => new Player(player))
                    }
                    if ("player" in item.payload) {
                        item.payload.player = new Player(item.payload.player)
                    }
                    if ("character" in item.payload) {
                        item.payload.character = book.characters.find(c => c.key === item.payload.character.key)
                    }
                    if ("characters" in item.payload) {
                        item.payload.characters = book.characters.filter(c => item.payload.characters.findIndex(char => char.key === c.key) != -1)
                    }
                }
                op.payload = item.payload
            })
        })
    }

    createTimeline(): ITimeline | undefined {
        const laseTimeline = this.timelines.length > 0 ? this.timelines[this.timelines.length - 1] : undefined
        if (laseTimeline && !laseTimeline.fulfilled()) {
            return
        }
        const timeline = new Timeline(this.book, this.players, laseTimeline)
        this.timelines.push(timeline);
        return timeline
    }
}