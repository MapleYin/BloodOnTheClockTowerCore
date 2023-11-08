import { IPlayer } from "./player";
import { ISkill, PayloadDefind } from "./skill";
type DistributeOperation<T extends ISkill["payloadKey"]> = T extends any ? {
    seat: number;
    skill: ISkill;
    payloadKey: T;
    payload?: PayloadDefind[T];
} : never;
export type IOperation = DistributeOperation<ISkill["payloadKey"]>;
export declare function CreateOperation(seat: number, skill: ISkill): IOperation;
export declare const EffectOperation: (operation: IOperation, players: IPlayer[]) => IPlayer[] | undefined;
export {};
