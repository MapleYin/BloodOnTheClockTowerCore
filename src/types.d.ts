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
            /// 生效
            effecting?: (operation: TOperation, players: TPlayer[], timelines: TTimeline[]) => boolean
        }

        type TCharacter = {
            /// 角色名
            key: BCT.ECharacterKey
            /// 角色类型
            kind: EKind
            /// 角色能力
            abilities: string[]
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

export {}