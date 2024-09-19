export const Excute: BCT.TAbility = {
    key: "Excute",
    validate: () => true,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.isExecuted = true
        }
    }
}