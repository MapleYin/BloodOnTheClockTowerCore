import { ICharacter } from "./character";

export interface IPlayer {
    /**
     * display character
     */
    readonly avatar?: ICharacter
    /**
     * real character
     */
    readonly character?: ICharacter

    readonly dead: boolean

    readonly seat: number

    forbiddenVote: boolean
    isDrunk: boolean
    isPoisoned: boolean
    isEnemy: boolean
    isKilled: boolean
    isExecuted: boolean
    isOnGallows: boolean
    isMaster: boolean
    isSlew: boolean
    isGuarded: boolean
    nominatable: boolean
    canBeNominated: boolean
}

export class Player implements IPlayer {
    avatar: ICharacter;
    character: ICharacter;

    seat: number;
    
    public get dead() : boolean {
        return this.isKilled || this.isExecuted || this.isSlew
    }

    forbiddenVote: boolean
    isDrunk: boolean
    isPoisoned: boolean
    isEnemy: boolean
    isKilled: boolean
    isExecuted: boolean
    isOnGallows: boolean
    isMaster: boolean
    isSlew: boolean
    isGuarded: boolean
    nominatable: boolean
    canBeNominated: boolean
}

Object.defineProperty(Player.prototype, 'dead', {enumerable: true});