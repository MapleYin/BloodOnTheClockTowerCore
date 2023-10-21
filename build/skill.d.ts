import { ICharacter } from "./character";
import { IPlayer } from "./player";
declare namespace Payload {
    interface Player {
        player: IPlayer;
    }
    interface Players {
        players: IPlayer[];
    }
    interface Number {
        number: number;
    }
    interface Character {
        character: ICharacter;
    }
    interface Characters {
        characters: ICharacter[];
    }
    interface Result {
        result: boolean;
    }
    interface TimeLine {
        timeline: true;
    }
}
export type PayloadDefind = {
    "C": Payload.Character;
    "N": Payload.Number;
    "P": Payload.Player;
    "PS": Payload.Players;
    "CS": Payload.Characters;
    "P_C": Payload.Player & Payload.Character;
    "P_N": Payload.Player & Payload.Number;
    "P_CS": Payload.Player & Payload.Characters;
    "P_R": Payload.Player & Payload.Result;
    "PS_R": Payload.Players & Payload.Result;
    "PS_C": Payload.Players & Payload.Character;
    "T": Payload.TimeLine;
    "NM": Payload.Player & Payload.Players & Payload.Result;
};
export type PayloadKey = keyof PayloadDefind;
export type PayloadType = PayloadDefind[PayloadKey];
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
    readonly key: string;
    readonly payloadKey: PayloadKey;
    valid(context: IContext): boolean;
}
declare class Skill implements ISkill {
    readonly key: string;
    readonly payloadKey: PayloadKey;
    readonly valid: (context: IContext) => boolean;
    constructor(key: string, payloadKey: PayloadKey, validHandler?: (context: IContext) => boolean);
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
export declare const Nomination: Skill;
export declare const Slay: Skill;
export declare const Excute: Skill;
export {};
