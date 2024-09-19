declare class Game implements BCT.TGame {
    players: BCT.TPlayer[];
    timelines: BCT.TTimeline[];
    private orderedAbilities;
    constructor(players: BCT.TPlayer[], abilityOrder: string[]);
    nextTimeline(): BCT.TTimeline;
    createOperation(abilityKey: string, effector: number, payload: Record<string, any>): void;
    updatePayload(timelineIdx: number, operationIdx: number, payload: Record<string, any>): void;
    timelinesWithPlayerStatus(): {
        initPlayers: BCT.TPlayer[];
        effectedPlayers: BCT.TPlayer[];
        operations: {
            initPlayers: BCT.TPlayer[];
            effectedPlayers: BCT.TPlayer[];
            abilityKey: string;
            effector: number;
            payload?: Record<string, any> | undefined;
            turn: number;
            time: "day" | "night";
            hasEffect: boolean;
            manual?: boolean | undefined;
        }[];
        turn: number;
        time: "day" | "night";
    }[];
}
declare const timelinesWithPlayerStatus: (timelines: BCT.TTimeline[], players: BCT.TPlayer[]) => {
    initPlayers: BCT.TPlayer[];
    effectedPlayers: BCT.TPlayer[];
    operations: {
        initPlayers: BCT.TPlayer[];
        effectedPlayers: BCT.TPlayer[];
        abilityKey: string;
        effector: number;
        payload?: Record<string, any> | undefined;
        turn: number;
        time: "day" | "night";
        hasEffect: boolean;
        manual?: boolean | undefined;
    }[];
    turn: number;
    time: "day" | "night";
}[];

declare const BecomeDemon: BCT.TAbility;

declare const CheckImp: BCT.TAbility;

declare const ChooseMaster: BCT.TAbility;

declare const Defense: BCT.TAbility;

declare const DigKnowCharacter: BCT.TAbility;

declare const Excute: BCT.TAbility;

declare const ExcuteByRack: BCT.TAbility;

declare const Guard: BCT.TAbility;

declare const Kill: BCT.TAbility;

declare const KnowAbsent: BCT.TAbility;

declare const KnowEvilAround: BCT.TAbility;

declare const KnowMinions: BCT.TAbility;

declare const KnowOutsiders: BCT.TAbility;

declare const KnowSeat: BCT.TAbility;

declare const KnowTownsfolk: BCT.TAbility;

declare const Nomination: BCT.TAbility;

declare const Peep: BCT.TAbility;

declare const Poison: BCT.TAbility;

declare const Scapegoat: BCT.TAbility;

declare const Slay: BCT.TAbility;

declare const Transform: BCT.TAbility;

declare const WakenKnowCharacter: BCT.TAbility;

declare const getAbility: (key: string) => BCT.TAbility | undefined;

declare const isDeadPlayer: (player: BCT.TPlayer) => any;
declare const isAlivePlayer: (player: BCT.TPlayer) => boolean;
declare const hasRealAbility: (player: BCT.TPlayer) => boolean;
declare const copyPlayers: (players: BCT.TPlayer[]) => BCT.TPlayer[];

declare const Washerwoman: BCT.TCharacter;
declare const Librarian: BCT.TCharacter;
declare const Investigator: BCT.TCharacter;
declare const Chef: BCT.TCharacter;
declare const Empath: BCT.TCharacter;
declare const FortuneTeller: BCT.TCharacter;
declare const Undertaker: BCT.TCharacter;
declare const Monk: BCT.TCharacter;
declare const Ravenkeeper: BCT.TCharacter;
declare const Virgin: BCT.TCharacter;
declare const Slayer: BCT.TCharacter;
declare const Soldier: BCT.TCharacter;
declare const Mayor: BCT.TCharacter;
declare const Butler: BCT.TCharacter;
declare const Drunk: BCT.TCharacter;
declare const Recluse: BCT.TCharacter;
declare const Saint: BCT.TCharacter;
declare const Poisoner: BCT.TCharacter;
declare const Spy: BCT.TCharacter;
declare const ScarletWoman: BCT.TCharacter;
declare const Baron: BCT.TCharacter;
declare const Imp: BCT.TCharacter;
declare const Grandmother: BCT.TCharacter;
declare const Sailor: BCT.TCharacter;
declare const Chambermaid: BCT.TCharacter;
declare const Exorcist: BCT.TCharacter;
declare const Innkeeper: BCT.TCharacter;
declare const Gambler: BCT.TCharacter;
declare const Gossip: BCT.TCharacter;
declare const Courtier: BCT.TCharacter;
declare const Professor: BCT.TCharacter;
declare const Minstrel: BCT.TCharacter;
declare const Tealady: BCT.TCharacter;
declare const Pacifist: BCT.TCharacter;
declare const Fool: BCT.TCharacter;
declare const Tinker: BCT.TCharacter;
declare const Moonchild: BCT.TCharacter;
declare const Goon: BCT.TCharacter;
declare const Lunatic: BCT.TCharacter;
declare const Godfather: BCT.TCharacter;
declare const Devilsadvocate: BCT.TCharacter;
declare const Assassin: BCT.TCharacter;
declare const Mastermind: BCT.TCharacter;
declare const Zombuul: BCT.TCharacter;
declare const Pukka: BCT.TCharacter;
declare const Shabaloth: BCT.TCharacter;
declare const Po: BCT.TCharacter;
declare const Clockmaker: BCT.TCharacter;
declare const Dreamer: BCT.TCharacter;
declare const Snakecharmer: BCT.TCharacter;
declare const Mathematician: BCT.TCharacter;
declare const Flowergirl: BCT.TCharacter;
declare const Towncrier: BCT.TCharacter;
declare const Oracle: BCT.TCharacter;
declare const Savant: BCT.TCharacter;
declare const Seamstress: BCT.TCharacter;
declare const Philosopher: BCT.TCharacter;
declare const Artist: BCT.TCharacter;
declare const Juggler: BCT.TCharacter;
declare const Sage: BCT.TCharacter;
declare const Mutant: BCT.TCharacter;
declare const Sweetheart: BCT.TCharacter;
declare const Barber: BCT.TCharacter;
declare const Klutz: BCT.TCharacter;
declare const Eviltwin: BCT.TCharacter;
declare const Witch: BCT.TCharacter;
declare const Cerenovus: BCT.TCharacter;
declare const Pithag: BCT.TCharacter;
declare const Fanggu: BCT.TCharacter;
declare const Vigormortis: BCT.TCharacter;
declare const Nodashii: BCT.TCharacter;
declare const Vortox: BCT.TCharacter;
declare const All: BCT.TCharacter[];
declare const CharacterForKey: (key: BCT.ECharacterKey) => BCT.TCharacter;

export { All, Artist, Assassin, Barber, Baron, BecomeDemon, Butler, Cerenovus, Chambermaid, CharacterForKey, CheckImp, Chef, ChooseMaster, Clockmaker, Courtier, Defense, Devilsadvocate, DigKnowCharacter, Dreamer, Drunk, Empath, Eviltwin, Excute, ExcuteByRack, Exorcist, Fanggu, Flowergirl, Fool, FortuneTeller, Gambler, Game, Godfather, Goon, Gossip, Grandmother, Guard, Imp, Innkeeper, Investigator, Juggler, Kill, Klutz, KnowAbsent, KnowEvilAround, KnowMinions, KnowOutsiders, KnowSeat, KnowTownsfolk, Librarian, Lunatic, Mastermind, Mathematician, Mayor, Minstrel, Monk, Moonchild, Mutant, Nodashii, Nomination, Oracle, Pacifist, Peep, Philosopher, Pithag, Po, Poison, Poisoner, Professor, Pukka, Ravenkeeper, Recluse, Sage, Sailor, Saint, Savant, Scapegoat, ScarletWoman, Seamstress, Shabaloth, Slay, Slayer, Snakecharmer, Soldier, Spy, Sweetheart, Tealady, Tinker, Towncrier, Transform, Undertaker, Vigormortis, Virgin, Vortox, WakenKnowCharacter, Washerwoman, Witch, Zombuul, copyPlayers, getAbility, hasRealAbility, isAlivePlayer, isDeadPlayer, timelinesWithPlayerStatus };
