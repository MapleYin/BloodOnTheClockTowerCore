import { IBook } from "./book";
import { CreateOperation, IOperation } from "./operation";
import { IPlayer } from "./player";
import { IContext, PayloadType } from "./skill";

export interface ITimeline {
    readonly players: IPlayer[]
    readonly turn: number
    readonly time: "day" | "night"
    readonly operations: IOperation[]

    fulfilled(): boolean
    effected(): IPlayer[]
}

export class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    players: IPlayer[];
    operations: IOperation[];

    constructor(book: IBook, players: IPlayer[], lastTimeline?: ITimeline) {

        const { time, turn } = lastTimeline || { time: 'day', turn: 1 }
        this.turn = time === "night" ? turn + 1 : turn
        this.time = time === "night" ? "day" : "night"
        this.players = lastTimeline ? lastTimeline.effected() : players

        const abilities = this.players.flatMap(p => {
            return p.avatar.abilities.map((skill) => {
                return {
                    player: p,
                    skill
                }
            })
        })
        abilities.sort((a, b) =>
            book.skills.findIndex(skill => skill.key === a.skill.key) - book.skills.findIndex(skill => skill.key === b.skill.key)
        )

        this.operations = abilities.filter(ability => {
            let context: IContext = {
                turn: this.turn,
                time: this.time,
                numberOfPlayer: players.length,
                numberOfAlivePlayer: players.filter(p => !p.dead).length,
                players: players,
                player: ability.player
            }
            return ability.skill.valid(context)
        }).map(ability => {
            return CreateOperation(ability.player, ability.skill)
        })
    }

    fulfilled(): boolean {
        return !this.operations.some((op) => {
            return !op.payload
        })
    }

    effected(): IPlayer[] {
        if (!this.fulfilled()) {
            throw "timeline must fulfilled"
        }
        const players = this.players;
        this.operations.forEach((op) => {
            const payload = op.payload!
            if ("player" in payload) {
                payload.player = players.find(p => p.seat == payload.player.seat) || payload.player;
            }
            if ("players" in payload) {
                payload.players = payload.players.map(p => players.find(_p => _p.seat === p.seat) || p)
            }
            const player = players.find(p => p.seat == op.player.seat) || op.player;
            op.skill.effect(player, payload)
        })

        return players
    }
}