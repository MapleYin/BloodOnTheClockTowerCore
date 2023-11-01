export interface IPlayer {
    /**
     * display character
     */
    avatar: string;
    /**
     * real character
     */
    readonly character: string;
    readonly seat: number;
    forbiddenVote?: boolean;
    isDrunk?: boolean;
    isPoisoned?: boolean;
    isEnemy?: boolean;
    isKilled?: boolean;
    isScapegoat?: boolean;
    isExecuted?: boolean;
    isOnGallows?: boolean;
    isMaster?: boolean;
    isSlew?: boolean;
    isGuarded?: boolean;
    nominatable?: boolean;
    canBeNominated?: boolean;
}
export declare const isDeadPlayer: (player: IPlayer) => boolean;
