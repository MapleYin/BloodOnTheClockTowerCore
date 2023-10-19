import { EKind, ICharacter } from "./character";
import { ISkill } from "./skill";
export interface IBook {
    readonly key: string;
    readonly name: string;
    readonly characters: ICharacter[];
    readonly skills: ISkill[];
}
declare class Book implements IBook {
    readonly key: string;
    readonly characters: ICharacter[];
    readonly skills: ISkill[];
    get name(): string;
    constructor(key: string, characters: ICharacter[], skills: ISkill[]);
}
export declare const TroubleBrewing: Book;
export declare const SectsViolets: Book;
export declare const BadMoonRising: Book;
type RouteNumberOption = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type TRules = {
    [key in RouteNumberOption]: {
        [key in EKind]: number;
    };
};
export declare const Rules: TRules;
export {};
