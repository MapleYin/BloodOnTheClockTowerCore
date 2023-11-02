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
    nominationForbiden?: boolean;
    canNotBeNominated?: boolean;
}
export declare const isDeadPlayer: (player: IPlayer) => boolean;
export declare const clearStatus: (player: IPlayer) => IPlayer;
