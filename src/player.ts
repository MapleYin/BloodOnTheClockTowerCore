export interface IPlayer {
    /**
     * display character
     */
    avatar: string
    /**
     * real character
     */
    readonly character: string

    readonly seat: number

    forbiddenVote?: boolean
    isDrunk?: boolean
    isPoisoned?: boolean
    isEnemy?: boolean
    isKilled?: boolean
    isScapegoat?: boolean
    isExecuted?: boolean
    isOnGallows?: boolean
    isMaster?: boolean
    isSlew?: boolean
    isGuarded?: boolean
    nominationForbiden?: boolean
    canNotBeNominated?: boolean
}

export const isDeadPlayer = (player: IPlayer) => {
    return player.isKilled || player.isSlew || player.isExecuted || false
}

export const clearStatus = (player: IPlayer) => {
    player.canNotBeNominated = false
    player.nominationForbiden = false
    player.isGuarded = false
    player.isMaster = false
    player.isOnGallows = false
    player.isPoisoned = false
    return player
}

// interface Props {
//     avatar?: string
//     character: string
//     seat?: number
//     forbiddenVote?: boolean
//     isDrunk?: boolean
//     isPoisoned?: boolean
//     isEnemy?: boolean
//     isKilled?: boolean
//     isExecuted?: boolean
//     isOnGallows?: boolean
//     isMaster?: boolean
//     isSlew?: boolean
//     isGuarded?: boolean
//     nominatable?: boolean
//     canBeNominated?: boolean
//     isScapegoat?: boolean
// }

// export class Player implements IPlayer {
//     avatar: string;
//     character: string;

//     readonly seat: number;

//     public get dead(): boolean {
//         return this.isKilled || this.isExecuted || this.isSlew
//     }

//     constructor(obj: Props) {
//         this.avatar = obj.avatar ||
//         this.character = CharacterForKey(obj.character.key) || obj.character
//         this.seat = obj.seat || 0
//         this.forbiddenVote = obj.forbiddenVote || false
//         this.isDrunk = obj.isDrunk || false
//         this.isPoisoned = obj.isPoisoned || false
//         this.isEnemy = obj.isEnemy || false
//         this.isKilled = obj.isKilled || false
//         this.isExecuted = obj.isExecuted || false
//         this.isOnGallows = obj.isOnGallows || false
//         this.isMaster = obj.isMaster || false
//         this.isSlew = obj.isSlew || false
//         this.isGuarded = obj.isGuarded || false
//         this.nominatable = obj.nominatable || true
//         this.canBeNominated = obj.canBeNominated || true
//         this.isScapegoat = obj.isScapegoat || false
//     }

//     forbiddenVote: boolean
//     isDrunk: boolean
//     isPoisoned: boolean
//     isEnemy: boolean
//     isKilled: boolean
//     isExecuted: boolean
//     isOnGallows: boolean
//     isMaster: boolean
//     isSlew: boolean
//     isGuarded: boolean
//     nominatable: boolean
//     canBeNominated: boolean
//     isScapegoat: boolean
// }