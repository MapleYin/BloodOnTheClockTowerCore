import { Artist, Assassin, Barber, Baron, Butler, Cerenovus, Chambermaid, Chef, Clockmaker, Courtier, Devilsadvocate, Dreamer, Drunk, EKind, Empath, Eviltwin, Exorcist, Fanggu, Flowergirl, Fool, FortuneTeller, Gambler, Godfather, Goon, Gossip, Grandmother, ICharacter, Imp, Innkeeper, Investigator, Juggler, Klutz, Librarian, Lunatic, Mastermind, Mathematician, Mayor, Minstrel, Monk, Moonchild, Mutant, Nodashii, Oracle, Pacifist, Philosopher, Pithag, Po, Poisoner, Professor, Pukka, Ravenkeeper, Recluse, Sage, Sailor, Saint, Savant, ScarletWoman, Seamstress, Shabaloth, Slayer, Snakecharmer, Soldier, Spy, Sweetheart, Tealady, Tinker, Towncrier, Undertaker, Vigormortis, Virgin, Vortox, Washerwoman, Witch, Zombuul } from "./character"
import { BecomeImp, CheckImp, ChooseMaster, DigKnowCharacter, Guard, ISkill, Kill, KnowAbsent, KnowEvilAround, KnowMinions, KnowOutsiders, KnowSeat, KnowTownsfolk, Peep, Poison, Scapegoat, Tramsform, WakenKnowCharacter } from "./skill"
import { zh as BookLocals } from "./locals/book"
export interface IBook {
    readonly key: string
    readonly name: string
    readonly characters: ICharacter[]
    readonly skills: ISkill[]
}

class Book implements IBook {
    readonly key: string
    readonly characters: ICharacter[]
    readonly skills: ISkill[]


    public get name(): string {
        return BookLocals[this.key]
    }


    constructor(key: string, characters: ICharacter[], skills: ISkill[]) {
        this.key = key
        this.characters = characters
        this.skills = skills
    }
}

export const TroubleBrewing = new Book("TroubleBrewing", [
    Washerwoman, Librarian, Investigator, Chef, Empath, FortuneTeller, Undertaker, Monk, Ravenkeeper, Virgin, Slayer, Soldier, Mayor,
    Butler, Drunk, Recluse, Saint,
    Poisoner, Spy, ScarletWoman, Baron,
    Imp
], [
    KnowAbsent, Poison, KnowTownsfolk, KnowOutsiders, KnowMinions,
    KnowSeat, Guard, BecomeImp, Kill, Scapegoat, Tramsform,
    WakenKnowCharacter, KnowEvilAround, CheckImp, ChooseMaster,
    DigKnowCharacter, Peep
])

export const SectsViolets = new Book("SectsViolets", [
    Clockmaker, Dreamer, Snakecharmer, Mathematician, Flowergirl, Towncrier, Oracle, Savant, Seamstress, Philosopher, Artist, Juggler, Sage,
    Mutant, Sweetheart, Barber, Klutz,
    Eviltwin, Witch, Cerenovus, Pithag,
    Fanggu, Vigormortis, Nodashii, Vortox
], [])

export const BadMoonRising = new Book("BadMoonRising", [
    Grandmother, Sailor, Chambermaid, Exorcist, Innkeeper, Gambler, Gossip, Courtier, Professor, Minstrel, Tealady, Pacifist, Fool,
    Tinker, Moonchild, Goon, Lunatic,
    Godfather, Devilsadvocate, Assassin, Mastermind,
    Zombuul, Pukka, Shabaloth, Po
], [])

export const BookForName = (name: string) => {
    return [TroubleBrewing, SectsViolets, BadMoonRising].find(book => book.key === name)
}

type RouteNumberOption = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

type TRules = {
    [key in RouteNumberOption]: {
        [key in EKind]: number
    }
}

export const Rules: TRules = {
    5: { "Townsfolk": 3, "Outsiders": 0, "Minions": 1, "Demons": 1 },
    6: { "Townsfolk": 3, "Outsiders": 1, "Minions": 1, "Demons": 1 },
    7: { "Townsfolk": 5, "Outsiders": 0, "Minions": 1, "Demons": 1 },
    8: { "Townsfolk": 5, "Outsiders": 1, "Minions": 1, "Demons": 1 },
    9: { "Townsfolk": 5, "Outsiders": 2, "Minions": 1, "Demons": 1 },
    10: { "Townsfolk": 7, "Outsiders": 0, "Minions": 2, "Demons": 1 },
    11: { "Townsfolk": 7, "Outsiders": 1, "Minions": 2, "Demons": 1 },
    12: { "Townsfolk": 7, "Outsiders": 2, "Minions": 2, "Demons": 1 },
    13: { "Townsfolk": 9, "Outsiders": 0, "Minions": 3, "Demons": 1 },
    14: { "Townsfolk": 9, "Outsiders": 1, "Minions": 3, "Demons": 1 },
    15: { "Townsfolk": 9, "Outsiders": 2, "Minions": 3, "Demons": 1 },
}