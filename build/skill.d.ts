import { EKind, ICharacter } from "./character";
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
    namespace Options {
        interface Character {
            static?: ICharacter;
            kinds?: EKind[];
            exist?: "inGame" | "notInGame" | "all";
        }
        interface Number {
            min?: number;
            max?: number;
        }
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
export type PayloadOptionDefind = {
    "C": Payload.Options.Character;
    "N": Payload.Options.Number;
    "P": Payload.Options.Character;
    "PS": Payload.Options.Character & Payload.Options.Number;
    "CS": Payload.Options.Character & Payload.Options.Number;
    "P_C": Payload.Options.Character;
    "P_N": Payload.Options.Character;
    "P_CS": Payload.Options.Character & Payload.Options.Number;
    "P_R": Payload.Options.Character;
    "PS_R": Payload.Options.Number;
    "PS_C": Payload.Options.Character & Payload.Options.Number;
    "T": {};
    "NM": {};
};
export type PayloadKey = keyof PayloadDefind;
export type PayloadType = PayloadDefind[PayloadKey];
export type PayloadOptions = PayloadOptionDefind[PayloadKey];
export interface IContext {
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
    readonly payloadOptions: PayloadOptions;
    valid(context: IContext): boolean;
    effect(effector: IPlayer, payload: PayloadDefind[PayloadKey]): void;
}
declare class Skill<Key extends PayloadKey> implements ISkill {
    readonly key: string;
    readonly payloadKey: Key;
    readonly payloadOptions: PayloadOptionDefind[Key];
    readonly valid: (context: IContext) => boolean;
    readonly effect: (effector: IPlayer, payload: PayloadDefind[Key]) => void;
    constructor(key: string, payloadKey: Key, validHandler?: (context: IContext) => boolean, effect?: (effector: IPlayer, payload: PayloadDefind[Key]) => void, payloadOptions?: PayloadOptionDefind[Key]);
}
export declare const KnowAbsent: Skill<"CS">;
export declare const Tramsform: Skill<"P">;
export declare const Kill: Skill<"P_R">;
export declare const BecomeImp: Skill<"C">;
export declare const Peep: Skill<"T">;
export declare const Poison: Skill<"P">;
export declare const ChooseMaster: Skill<"P">;
export declare const Scapegoat: Skill<"P">;
export declare const WakenKnowCharacter: Skill<"P_C">;
export declare const Guard: Skill<"P">;
export declare const DigKnowCharacter: Skill<"P_C">;
export declare const CheckImp: Skill<"PS_R">;
export declare const KnowEvilAround: Skill<"N">;
export declare const KnowSeat: Skill<"N">;
export declare const KnowMinions: Skill<"PS_C">;
export declare const KnowOutsiders: Skill<"PS_C">;
export declare const KnowTownsfolk: Skill<"PS_C">;
export declare const Nomination: Skill<"NM">;
export declare const Slay: Skill<"P_R">;
export declare const Excute: Skill<"P">;
export {};
