import { ICharacter } from "./character";
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
export {};
