export const ExcuteByRack: BCT.TAbility = {
    key: "ExcuteByRack",
    validate: () => true,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.isExecuted = true
        }
    }
}