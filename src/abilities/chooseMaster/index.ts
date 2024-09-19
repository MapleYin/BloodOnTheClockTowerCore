import { hasRealAbility } from '../../common';
import { AliveAtNight } from '../helper';

export const ChooseMaster: BCT.TAbility = {
    key: "ChooseMaster",
    validate: AliveAtNight,
    effect: (operation, players) => {
        const effectorPlayer = players[operation.effector]
        const player = players.find((_, idx) => idx === operation.payload?.target)
        if (player && hasRealAbility(effectorPlayer)) {
            player.isMaster = true
        }
    },
    effectDuration: "ntd"
}