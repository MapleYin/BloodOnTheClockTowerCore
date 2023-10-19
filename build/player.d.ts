import { ICharacter } from "./character";
export interface IPlayer {
    /**
     * display character
     */
    readonly avatar?: ICharacter;
    /**
     * real character
     */
    readonly character?: ICharacter;
    /**
     * is alive
     */
    readonly alive: boolean;
    readonly seat: number;
    forbiddenVote: boolean;
    isDrunk: boolean;
    isPoisoned: boolean;
    isEnemy: boolean;
    isKilled: boolean;
    isExecuted: boolean;
    isOnGallows: boolean;
    isMaster: boolean;
    isSlew: boolean;
    isGuarded: boolean;
    nominatable: boolean;
    canBeNominated: boolean;
}
export declare class Player implements IPlayer {
    avatar: ICharacter;
    character: ICharacter;
    seat: number;
    get alive(): boolean;
    forbiddenVote: boolean;
    isDrunk: boolean;
    isPoisoned: boolean;
    isEnemy: boolean;
    isKilled: boolean;
    isExecuted: boolean;
    isOnGallows: boolean;
    isMaster: boolean;
    isSlew: boolean;
    isGuarded: boolean;
    nominatable: boolean;
    canBeNominated: boolean;
}
