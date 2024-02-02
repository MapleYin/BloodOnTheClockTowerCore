interface IPlayer {
    /**
     * display character
     */
    avatar: string
    /**
     * real character
     */
    character: string

    seat: number

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