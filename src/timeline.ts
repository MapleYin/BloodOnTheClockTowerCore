import { IBook } from "./book";
import { CreateOperation, IOperation } from "./operation";
import { IPlayer, Player } from "./player";
import { IContext, SkillForKey } from "./skill";

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

    static from(book: IBook, obj: Record<string, any>) {
        const timeline = new Timeline(book, [])
        timeline.turn = obj.turn
        timeline.time = obj.time
        timeline.players = obj.players.map(p => new Player(p))
        timeline.operations = obj.operations.map(op => {
            if (op.payload) {
                if ("players" in op.payload) {
                    op.payload.players = op.payload.players.map(player => new Player(player))
                }
                if ("player" in op.payload) {
                    op.payload.player = new Player(op.payload.player)
                }
                if ("character" in op.payload) {
                    op.payload.character = book.characters.find(c => c.key === op.payload.character.key)
                }
                if ("characters" in op.payload) {
                    op.payload.characters = book.characters.filter(c => op.payload.characters.findIndex(char => char.key === c.key) != -1)
                }
            }
            return {
                player: new Player(op.player),
                skill: SkillForKey(op.skill.key),
                payloadKey: op.payloadKey,
                payload: op.payload
            }
        })
        return timeline
    }

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

    effected(at?: number): IPlayer[] {
        const progress = at || this.operations.length
        const fulfilled = !this.operations.filter((_, idx) => idx < progress).some(op => !op.payload)
        if (!fulfilled) {
            throw `Operations before ${progress} are not fulfilled`
        }
        const players = this.players.map(p => { return new Player(p) });
        this.operations.filter((_, idx) => idx < progress).forEach((op) => {
            const payload = op.payload!
            if ("player" in payload) {
                payload.player = players.find(p => p.seat == payload.player.seat) || payload.player;
            }
            if ("players" in payload) {
                payload.players = payload.players.map(p => players.find(_p => _p.seat === p.seat) || p)
            }
            const player = players.find(p => p.seat == op.player.seat) || op.player;
            op.player = player
            op.skill.effect(player, payload)
        })

        return players
    }
}