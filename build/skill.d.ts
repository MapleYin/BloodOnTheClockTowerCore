import { EKind } from "./character";
import { IPlayer } from "./player";
declare namespace Payload {
    interface Player {
        seat: number;
    }
    interface Players {
        seats: number[];
    }
    interface Number {
        number: number;
    }
    interface Character {
        character: string;
    }
    interface Characters {
        characters: string[];
    }
    interface Result {
        result: boolean;
    }
    interface TimeLine {
        timeline: true;
    }
    namespace Options {
        interface Character {
            character: {
                static?: string;
                kinds?: EKind[];
                exist?: "inGame" | "notInGame" | "all";
            } & Options.Range;
        }
        interface Player {
            player: {
                dead?: boolean;
                kinds?: EKind[];
            } & Options.Range;
        }
        interface Range<T = number> {
            range?: {
                min?: T;
                max?: T;
            };
        }
        interface Result {
            result: {};
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
    "N": Payload.Options.Range;
    "P": Payload.Options.Player;
    "PS": Payload.Options.Player;
    "CS": Payload.Options.Character;
    "P_C": Payload.Options.Player & Payload.Options.Character;
    "P_N": Payload.Options.Player & Payload.Options.Range;
    "P_CS": Payload.Options.Character & Payload.Options.Player;
    "P_R": Payload.Options.Player & Payload.Options.Result;
    "PS_R": Payload.Options.Player & Payload.Options.Result;
    "PS_C": Payload.Options.Character & Payload.Options.Player;
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
    effect(effector: number, payload: PayloadDefind[PayloadKey], players: IPlayer[]): void;
}
declare class Skill<Key extends PayloadKey> implements ISkill {
    readonly key: string;
    readonly payloadKey: Key;
    readonly payloadOptions: PayloadOptionDefind[Key];
    readonly valid: (context: IContext) => boolean;
    readonly effect: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void;
    constructor(key: string, payloadKey: Key, validHandler?: (context: IContext) => boolean, effect?: (effector: number, payload: PayloadDefind[Key], players: IPlayer[]) => void, payloadOptions?: PayloadOptionDefind[Key]);
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
export declare const ExcuteByRack: Skill<"P">;
export declare const SkillForKey: (key: string) => Skill<"CS"> | Skill<"P"> | Skill<"P_R"> | Skill<"C"> | Skill<"T"> | Skill<"P_C"> | Skill<"PS_R"> | Skill<"N"> | Skill<"PS_C"> | Skill<"NM"> | undefined;
export {};
