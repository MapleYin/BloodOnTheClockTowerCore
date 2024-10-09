import { hasRealAbility } from '../../common';
import { AliveAtNight } from '../helper';

export const Guard: BCT.TAbility = {
    key: "Guard",
    validate: context =>
        AliveAtNight(context) &&
        context.turn != 1,
    effect: (operation, players) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        if (hasRealAbility(effectorPlayer) && player) {
            player.isGuarded = true
        }
    },
    effectDuration: "ntd"
}
