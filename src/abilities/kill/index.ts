import { hasRealAbility } from '../../common';
import { Defense } from '../defense';
import { Guard } from '../guard';
import { AliveAtNight } from '../helper';
import { Poison } from '../poison';
import { Scapegoat } from '../scapegoat';

export const Kill: BCT.TAbility = {
    key: "Kill",
    validate: context => AliveAtNight(context) && context.turn != 1,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (!player) {
            return
        }
        player.isKilled = true
    },
    effecting(operation, players, timelines) {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        if (!hasRealAbility(effectorPlayer) || !player) {
            return false
        }

        const currentTimeline = timelines.find(timeline => timeline.turn == operation.turn && timeline.time == operation.time)

        if (!currentTimeline) {
            return false
        }

        /// being guarded
        const guard = currentTimeline.operations.find(operation => operation.abilityKey === Guard.key)
        if (guard && hasRealAbility(players[guard.effector]) && guard.payload?.target === operation.payload?.target) {
            return false
        }

        if ((
            player.character.abilities.includes(Defense.key) ||
            (player.character.abilities.includes(Scapegoat.key) && !operation.payload?.ignoreScapegoat)
        ) && hasRealAbility(player)) {
            return false
        }
        
        return true
    },
}