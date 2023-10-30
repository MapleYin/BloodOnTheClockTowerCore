import { ICharacter } from "./character";
export interface IPlayer {
    /**
     * display character
     */
    avatar: ICharacter;
    /**
     * real character
     */
    readonly character: ICharacter;
    readonly dead: boolean;
    readonly seat: number;
    forbiddenVote: boolean;
    isDrunk: boolean;
    isPoisoned: boolean;
    isEnemy: boolean;
    isKilled: boolean;
    isScapegoat: boolean;
    isExecuted: boolean;
    isOnGallows: boolean;
    isMaster: boolean;
    isSlew: boolean;
    isGuarded: boolean;
    nominatable: boolean;
    canBeNominated: boolean;
}
interface Props {
    avatar?: ICharacter;
    character: ICharacter;
    seat?: number;
    forbiddenVote?: boolean;
    isDrunk?: boolean;
    isPoisoned?: boolean;
    isEnemy?: boolean;
    isKilled?: boolean;
    isExecuted?: boolean;
    isOnGallows?: boolean;
    isMaster?: boolean;
    isSlew?: boolean;
    isGuarded?: boolean;
    nominatable?: boolean;
    canBeNominated?: boolean;
    isScapegoat?: boolean;
}
export declare class Player implements IPlayer {
    avatar: ICharacter;
    character: ICharacter;
    readonly seat: number;
    get dead(): boolean;
    constructor(obj: Props);
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
    isScapegoat: boolean;
}
export {};
