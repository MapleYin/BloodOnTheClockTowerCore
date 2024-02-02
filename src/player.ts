export const isDeadPlayer = (player: IPlayer) => {
    return player.isKilled || player.isSlew || player.isExecuted || player.isScapegoat || false
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