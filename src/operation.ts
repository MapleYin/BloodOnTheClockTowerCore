import { IPlayer } from "./player"
import { ISkill, PayloadDefind, SkillForKey } from "./skill"

type DistributeOperation<T extends ISkill["payloadKey"]> = T extends any ? {
    seat: number
    skill: ISkill
    payloadKey: T
    payload?: PayloadDefind[T]
} : never

export type IOperation = DistributeOperation<ISkill["payloadKey"]>

export function CreateOperation(seat: number, skill: ISkill): IOperation {
    let payload: any = undefined
    if ("character" in skill.payloadOptions && skill.payloadOptions.character.static) {
        payload = {
            character: skill.payloadOptions.character.static
        }
    }
    return {
        seat,
        payloadKey: skill.payloadKey,
        skill,
        payload
    }
}

export const EffectOperation = (operation: IOperation, players: IPlayer[]) => {
    if (!operation.payload) {
        return players;
    }
    const skill = SkillForKey(operation.skill.key) as typeof operation.skill
    skill.effect(operation.seat, operation.payload, players)
}