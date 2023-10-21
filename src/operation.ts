import { IPlayer } from "./player"
import { ISkill, PayloadDefind } from "./skill"

type DistributeOperation<T extends ISkill["payloadKey"]> = T extends any ? {
    player: IPlayer
    skill: ISkill
    payload?: PayloadDefind[T]
} : never

export type IOperation = DistributeOperation<ISkill["payloadKey"]>


export function CreateOperation(player: IPlayer, skill: ISkill): IOperation {
    return {
        player,
        skill
    }
}