import { hasRealAbility } from '../../common';
import { Defense } from '../defense';
import { Guard } from '../guard';
import { AliveAtNight } from '../helper';
import { Scapegoat } from '../scapegoat';

export const Kill: BCT.TAbility = {
    key: "Kill",
    validate: context => AliveAtNight(context) && context.turn != 1,
    effect: (operation, players, timelines) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        if (!hasRealAbility(effectorPlayer) || !player) {
            return
        }

        const currentTimeline = timelines.find(timeline => timeline.turn == operation.turn && timeline.time == operation.time)

        if (!currentTimeline) {
            return
        }

        /// being guarded
        const guard = currentTimeline.operations.find(operation => operation.abilityKey === Guard.key)
        if (guard && hasRealAbility(players[guard.effector]) && guard.payload?.target === operation.payload?.target) {
            return
        }

        if (
            (player.character.abilities.includes(Defense.key) ||
                (player.character.abilities.includes(Scapegoat.key) && !operation.payload?.ignoreScapegoat))
            && hasRealAbility(player)
        ) {
            return
        }

        player.isKilled = true
    } 
}