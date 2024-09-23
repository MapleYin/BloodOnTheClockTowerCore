export const Enemy: BCT.TAbility = {
    key: "Enemy",
    validate: () => true,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.isEnemy = true
        }
    }
}