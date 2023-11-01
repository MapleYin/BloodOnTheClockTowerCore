import { ISkill, PayloadDefind } from "./skill"

type DistributeOperation<T extends ISkill["payloadKey"]> = T extends any ? {
    seat: number
    skill: ISkill
    payloadKey: T
    payload?: PayloadDefind[T]
} : never

export type IOperation = DistributeOperation<ISkill["payloadKey"]>

export function CreateOperation(seat: number, skill: ISkill): IOperation {
    return {
        seat,
        payloadKey: skill.payloadKey,
        skill
    }
}