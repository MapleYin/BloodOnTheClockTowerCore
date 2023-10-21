import { OperationName } from "./operation";
import { IPlayer } from "./player";
interface IContext {
    turn: number;
    time: "day" | "night";
    numberOfPlayer: number;
    numberOfAlivePlayer: number;
    player: IPlayer;
    killTarget?: IPlayer;
    excuteInDay?: IPlayer;
    players: IPlayer[];
}
export interface ISkill {
    readonly key: OperationName;
    valid(context: IContext): boolean;
}
declare class Skill implements ISkill {
    readonly key: OperationName;
    readonly valid: (context: IContext) => boolean;
    constructor(key: OperationName, validHandler: (context: IContext) => boolean);
}
export declare const KnowAbsent: Skill;
export declare const Tramsform: Skill;
export declare const Kill: Skill;
export declare const BecomeImp: Skill;
export declare const Peep: Skill;
export declare const Poison: Skill;
export declare const ChooseMaster: Skill;
export declare const Scapegoat: Skill;
export declare const WakenKnowCharacter: Skill;
export declare const Guard: Skill;
export declare const DigKnowCharacter: Skill;
export declare const CheckImp: Skill;
export declare const KnowEvilAround: Skill;
export declare const KnowSeat: Skill;
export declare const KnowMinions: Skill;
export declare const KnowOutsiders: Skill;
export declare const KnowTownsfolk: Skill;
export {};
