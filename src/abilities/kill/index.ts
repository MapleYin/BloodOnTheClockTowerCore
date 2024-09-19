import { hasRealAbility } from '../../common';
import { Defense } from '../defense';
import { AliveAtNight } from '../helper';
import { Scapegoat } from '../scapegoat';

export const Kill: BCT.TAbility = {
    key: "Kill",
    validate: context => AliveAtNight(context) && context.turn != 1,
    effect: (operation, players) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        if (!hasRealAbility(effectorPlayer) || !player || player.isGuarded) {
            return
        }

        if (
            (player.character.abilities.includes(Defense.key) ||
                player.character.abilities.includes(Scapegoat.key))
            && hasRealAbility(player)
        ) {
            return
        }

        player.isKilled = true
    }
}