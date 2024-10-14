import { hasRealAbility } from '../../common';
import { AliveAtNight } from '../helper';

export const Guard: BCT.TAbility = {
    key: "Guard",
    validate: context =>
        AliveAtNight(context) &&
        context.turn != 1,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (!player) {
            return
        }
        player.isGuarded = true
    },
    effecting(operation, players, timelines) {
        const effectorPlayer = players[operation.effector]
        return hasRealAbility(effectorPlayer)
    },
    effectDuration: "ntd"
}
