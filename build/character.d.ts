export declare enum EKind {
    townsfolk = "Townsfolk",
    outsiders = "Outsiders",
    minions = "Minions",
    demons = "Demons"
}
export interface ICharacter {
    readonly key: string;
    readonly name: string;
    readonly icon: string;
    readonly skill: string;
    readonly kind: EKind;
}
declare class Character implements ICharacter {
    readonly key: string;
    readonly kind: EKind;
    readonly icon: string;
    get name(): string;
    get skill(): string;
    constructor(key: string, kind: EKind, icon: string);
}
export declare const Washerwoman: Character;
export declare const Librarian: Character;
export declare const Investigator: Character;
export declare const Chef: Character;
export declare const Empath: Character;
export declare const FortuneTeller: Character;
export declare const Undertaker: Character;
export declare const Monk: Character;
export declare const Ravenkeeper: Character;
export declare const Virgin: Character;
export declare const Slayer: Character;
export declare const Soldier: Character;
export declare const Mayor: Character;
export declare const Butler: Character;
export declare const Drunk: Character;
export declare const Recluse: Character;
export declare const Saint: Character;
export declare const Poisoner: Character;
export declare const Spy: Character;
export declare const ScarletWoman: Character;
export declare const Baron: Character;
export declare const Imp: Character;
export declare const Grandmother: Character;
export declare const Sailor: Character;
export declare const Chambermaid: Character;
export declare const Exorcist: Character;
export declare const Innkeeper: Character;
export declare const Gambler: Character;
export declare const Gossip: Character;
export declare const Courtier: Character;
export declare const Professor: Character;
export declare const Minstrel: Character;
export declare const Tealady: Character;
export declare const Pacifist: Character;
export declare const Fool: Character;
export declare const Tinker: Character;
export declare const Moonchild: Character;
export declare const Goon: Character;
export declare const Lunatic: Character;
export declare const Godfather: Character;
export declare const Devilsadvocate: Character;
export declare const Assassin: Character;
export declare const Mastermind: Character;
export declare const Zombuul: Character;
export declare const Pukka: Character;
export declare const Shabaloth: Character;
export declare const Po: Character;
export declare const Clockmaker: Character;
export declare const Dreamer: Character;
export declare const Snakecharmer: Character;
export declare const Mathematician: Character;
export declare const Flowergirl: Character;
export declare const Towncrier: Character;
export declare const Oracle: Character;
export declare const Savant: Character;
export declare const Seamstress: Character;
export declare const Philosopher: Character;
export declare const Artist: Character;
export declare const Juggler: Character;
export declare const Sage: Character;
export declare const Mutant: Character;
export declare const Sweetheart: Character;
export declare const Barber: Character;
export declare const Klutz: Character;
export declare const Eviltwin: Character;
export declare const Witch: Character;
export declare const Cerenovus: Character;
export declare const Pithag: Character;
export declare const Fanggu: Character;
export declare const Vigormortis: Character;
export declare const Nodashii: Character;
export declare const Vortox: Character;
export {};
