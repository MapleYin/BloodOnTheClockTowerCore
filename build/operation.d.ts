import { IPlayer } from "./player";
import { ISkill, PayloadDefind } from "./skill";
export type IOperation<T extends ISkill> = {
    player: IPlayer;
    skill: T;
    payload?: PayloadDefind[T["payloadKey"]];
};
export declare function CreateOperation<T extends ISkill>(player: IPlayer, skill: T): IOperation<T>;
