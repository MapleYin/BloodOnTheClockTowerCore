import { IPlayer } from "./player";
import { ISkill, PayloadDefind } from "./skill";
type DistributeOperation<T extends ISkill["payloadKey"]> = T extends any ? {
    player: IPlayer;
    skill: ISkill;
    payloadKey: T;
    payload?: PayloadDefind[T];
} : never;
export type IOperation = DistributeOperation<ISkill["payloadKey"]>;
export declare function CreateOperation(player: IPlayer, skill: ISkill): IOperation;
export {};
