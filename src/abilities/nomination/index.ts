import { isAlivePlayer } from '../../common';

export const Nomination: BCT.TAbility = {
    key: "Nomination",
    validate: () => true,
    effect: (operation, players) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        const numberOfAlivePlayers = players.filter(isAlivePlayer).length

        if (!operation.payload || !Array.isArray(operation.payload?.voters) || !player || !effectorPlayer) {
            return;
        }

        if (operation.payload.voters.length * 2 >= numberOfAlivePlayers) {
            player.isOnGallows = true
        }
    },
    effectDuration: "ntd"
}