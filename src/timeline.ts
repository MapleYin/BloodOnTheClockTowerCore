import { IBook } from "./book";
import { CharacterForKey } from "./character";
import { CreateOperation, IOperation } from "./operation";
import { IPlayer, clearStatus, isDeadPlayer } from "./player";
import { IContext, Kill, SkillForKey } from "./skill";

export interface ITimeline {
    readonly players: IPlayer[]
    readonly turn: number
    readonly time: "day" | "night"
    readonly operations: IOperation[]
    readonly book: IBook
}

export class Timeline implements ITimeline {
    turn: number;
    time: "day" | "night";
    book: IBook
    players: IPlayer[];
    operations: IOperation[] = [];

    static from(book: IBook, obj: Record<string, any>) {
        const timeline = new Timeline(book, [])
        timeline.turn = obj.turn
        timeline.time = obj.time
        timeline.players = obj.players
        timeline.operations = obj.operations
        timeline.updateOperations()
        return timeline
    }

    constructor(book: IBook, players: IPlayer[], lastTimeline?: Timeline) {
        this.book = book
        const { time, turn } = lastTimeline || { time: 'day', turn: 1 }
        this.turn = time === "night" ? turn + 1 : turn
        this.time = time === "night" ? "day" : "night"
        this.players = lastTimeline ? lastTimeline.effected() : players

        /// 进入黑夜需要清除一些状态
        if (this.time === "night") {
            this.players.forEach(clearStatus)
        }

        this.updateOperations();
    }

    private updateOperations() {
        /// 白天的时间线不存在因 operation 的变化而变化的 operation
        if (this.time === "day") {
            return;
        }
        const players = this.effected()
        const killTarget = players.find(p => {
            const operation = this.operations.find(op => op.skill.key === Kill.key)
            if (!operation || operation.payloadKey != "P_R" || !operation.payload) {
                return false
            }
            return p.seat === operation.payload.seat
        })

        const abilities = players.flatMap(p => {
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
            this.book.skills.findIndex(skill => skill.key === a.skill.key) - this.book.skills.findIndex(skill => skill.key === b.skill.key)
        )

        this.operations = abilities.filter(ability => {
            let context: IContext = {
                turn: this.turn,
                time: this.time,
                numberOfPlayer: players.length,
                numberOfAlivePlayer: players.filter(p => !isDeadPlayer(p)).length,
                players: players,
                player: ability.player,
                killTarget
            }
            return ability.skill.valid(context)
        }).map(ability => {
            return this.operations.find(op => op.skill.key === ability.skill.key) || CreateOperation(ability.player.seat, ability.skill)
        })
    }

    updatePayload(at: number, payload: any) {
        this.operations[at].payload = payload
        this.updateOperations()
    }

    fulfilled(): boolean {
        return !this.operations.some((op) => {
            return !op.payload
        })
    }

    effected(at?: number): IPlayer[] {
        const progress = typeof at === "number" ? at : this.operations.length
        const players = this.players.map(p => { return { ...p } });
        this.operations.filter((_, idx) => idx < progress).forEach((op) => {
            if (!op.payload) {
                return;
            }
            const skill = SkillForKey(op.skill.key) as typeof op.skill
            skill.effect(op.seat, op.payload, players)
        })

        return players
    }
}