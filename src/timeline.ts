import { IBook } from "./book";
import { CharacterForKey } from "./character";
import { CreateOperation, IOperation } from "./operation";
import { IPlayer, isDeadPlayer } from "./player";
import { IContext, SkillForKey } from "./skill";

export interface ITimeline {
    readonly players: IPlayer[]
    readonly turn: number
    readonly time: "day" | "night"
    readonly operations: IOperation[]
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
        timeline.players = obj.players
        timeline.operations = obj.operations
        return timeline
    }

    constructor(book: IBook, players: IPlayer[], lastTimeline?: Timeline) {

        const { time, turn } = lastTimeline || { time: 'day', turn: 1 }
        this.turn = time === "night" ? turn + 1 : turn
        this.time = time === "night" ? "day" : "night"
        this.players = lastTimeline ? lastTimeline.effected() : players

        const abilities = this.players.flatMap(p => {
            const chatacter = CharacterForKey(p.avatar)
            if (!chatacter) {
                throw "unexpected character"
            }
            return chatacter.abilities.map((skill) => {
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
                numberOfAlivePlayer: players.filter(p => !isDeadPlayer(p)).length,
                players: players,
                player: ability.player
            }
            return ability.skill.valid(context)
        }).map(ability => {
            return CreateOperation(ability.player.seat, ability.skill)
        })
    }

    fulfilled(): boolean {
        return !this.operations.some((op) => {
            return !op.payload
        })
    }

    effected(at?: number): IPlayer[] {
        const progress = typeof at === "number" ? at : this.operations.length
        const fulfilled = !this.operations.filter((_, idx) => idx < progress).some(op => !op.payload)
        if (!fulfilled) {
            throw `Operations before ${progress} are not fulfilled`
        }
        const players = this.players.map(p => { return { ...p } });
        this.operations.filter((_, idx) => idx < progress).forEach((op) => {
            const skill = SkillForKey(op.skill.key) as typeof op.skill
            skill.effect(op.seat, op.payload!, players)
        })

        return players
    }
}