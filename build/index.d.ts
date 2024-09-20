declare global {
    namespace BCT {
        type ECharacterKey = "Lycanthrope" | "Choirboy" | "Preacher" | "Engineer" | "Noble" | "King" | "General" | "Alchemist" | "Magician" | "Farmer" | "Balloonist" | "Bountyhunter" | "Amnesiac" | "Cannibal" | "Nightwatchman" | "Atheist" | "Pixie" | "Huntsman" | "Cultleader" | "Poppygrower" | "Fisherman" | "Snitch" | "Puzzlemaster" | "Damsel" | "Golem" | "Heretic" | "Acrobat" | "Politician" | "Goblin" | "Widow" | "Psychopath" | "Fearmonger" | "Mezepheles" | "Marionette" | "Boomdandy" | "Riot" | "Alhadikhia" | "Legion" | "Leviathan" | "Lleech" | "Lilmonsta" | "Clockmaker" | "Dreamer" | "Snakecharmer" | "Mathematician" | "Flowergirl" | "Towncrier" | "Oracle" | "Savant" | "Seamstress" | "Philosopher" | "Artist" | "Juggler" | "Sage" | "Mutant" | "Sweetheart" | "Barber" | "Klutz" | "Eviltwin" | "Witch" | "Cerenovus" | "Pithag" | "Fanggu" | "Vigormortis" | "Nodashii" | "Vortox" | "Grandmother" | "Sailor" | "Chambermaid" | "Exorcist" | "Innkeeper" | "Gambler" | "Gossip" | "Courtier" | "Professor" | "Minstrel" | "Tealady" | "Pacifist" | "Fool" | "Tinker" | "Moonchild" | "Goon" | "Lunatic" | "Godfather" | "Devilsadvocate" | "Assassin" | "Mastermind" | "Zombuul" | "Pukka" | "Shabaloth" | "Po" | "Washerwoman" | "Librarian" | "Investigator" | "Chef" | "Empath" | "Fortuneteller" | "Undertaker" | "Monk" | "Ravenkeeper" | "Virgin" | "Slayer" | "Soldier" | "Mayor" | "Butler" | "Drunk" | "Recluse" | "Saint" | "Poisoner" | "Spy" | "Scarletwoman" | "Baron" | "Imp"

        type EKind = "Townsfolk" | "Outsiders" | "Minions" | "Demons"

        type TContext = {
            /// 轮次
            turn: number
            /// 时间
            time: "day" | "night"
            /// 当前玩家
            player: TPlayer
            /// 当前玩家状态
            players: TPlayer[]

            timelines: TTimelinesWithPlayerStatus[]
        }

        type TAbility = {
            /// 能力名
            key: string
            /// 验证是否可以执行
            validate: (content: TContext) => boolean
            /// 执行
            effect?: (operation: TOperation, players: TPlayer[], timelines: TTimeline[]) => void
            /// 自动填充payload
            autoPayload?: (content: TContext) => Record<string, any>
            /// 执行条件
            effectCondition?: "alive"
            /// 效果类型
            effectKind?: "buff"
            /// 持续时间
            effectDuration?: "ntd"
        }

        type TCharacter = {
            /// 角色名
            key: BCT.ECharacterKey
            /// 角色类型
            kind: EKind
            /// 角色能力
            abilities: TAbility[]
        }

        type TOperation = {
            /// 能力名
            abilityKey: string
            /// 执行者
            effector: number
            /// 执行参数
            payload?: Record<string, any>

            /// 轮次
            turn: number

            /// 时间
            time: "day" | "night"

            /// 是否生效
            hasEffect: boolean

            /// manual
            manual?: boolean
        }

        type TPlayer = {
            /// 位置
            position: number
            /// 角色名  
            character: {
                key: BCT.ECharacterKey,
                kind: EKind,
                abilities: string[]
            }
            /// 角色状态
            [key: string]: any
        }

        type TGame = {
            players: TPlayer[]
            timelines: TTimeline[]

            nextTimeline: () => TTimeline
        }

        type TTimeline = {
            turn: number
            time: "day" | "night"
            operations: TOperation[]
        }

        type TTimelinesWithPlayerStatus = TTimeline & {
            initPlayers: TPlayer[]
            effectedPlayers: TPlayer[]
            operations: (TOperation & {
                initPlayers: TPlayer[]
                effectedPlayers: TPlayer[]
            })[]
        }
    }
}

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

declare const nextTimeline: (players: BCT.TPlayer[], timelines: BCT.TTimeline[], abilityOrder: string[]) => void;
declare const createOperation: (abilityKey: string, effector: number, payload: Record<string, any>, timeline: BCT.TTimeline) => void;
/**
 * 更新操作的payload
 * @param timeline
 * @param operationIdx
 * @param payload
 */
declare const updatePayload: (timeline: BCT.TTimeline, operationIdx: number, payload: Record<string, any>) => void;
/**
 * 获取每个timeline的初始玩家和受影响的玩家
 * @param timelines 时间线
 * @param players 玩家
 * @returns 每个时间线以及相关操作的初始玩家和受影响的玩家
 */
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

export { All, Artist, Assassin, Barber, Baron, BecomeDemon, Butler, Cerenovus, Chambermaid, CharacterForKey, CheckImp, Chef, ChooseMaster, Clockmaker, Courtier, Defense, Devilsadvocate, DigKnowCharacter, Dreamer, Drunk, Empath, Eviltwin, Excute, ExcuteByRack, Exorcist, Fanggu, Flowergirl, Fool, FortuneTeller, Gambler, Godfather, Goon, Gossip, Grandmother, Guard, Imp, Innkeeper, Investigator, Juggler, Kill, Klutz, KnowAbsent, KnowEvilAround, KnowMinions, KnowOutsiders, KnowSeat, KnowTownsfolk, Librarian, Lunatic, Mastermind, Mathematician, Mayor, Minstrel, Monk, Moonchild, Mutant, Nodashii, Nomination, Oracle, Pacifist, Peep, Philosopher, Pithag, Po, Poison, Poisoner, Professor, Pukka, Ravenkeeper, Recluse, Sage, Sailor, Saint, Savant, Scapegoat, ScarletWoman, Seamstress, Shabaloth, Slay, Slayer, Snakecharmer, Soldier, Spy, Sweetheart, Tealady, Tinker, Towncrier, Transform, Undertaker, Vigormortis, Virgin, Vortox, WakenKnowCharacter, Washerwoman, Witch, Zombuul, copyPlayers, createOperation, getAbility, hasRealAbility, isAlivePlayer, isDeadPlayer, nextTimeline, timelinesWithPlayerStatus, updatePayload };
