import { AliveAtNight } from '../helper';

export const Poison: BCT.TAbility = {
    key: "Poison",
    validate: context => AliveAtNight(context),
    effect: (operation, players) => {
        const player = players.find((_, idx) => idx === operation.payload?.target)
        if (player) {
            player.isPoisoned = true
        }
    },
    effectDuration: "ntd"
}