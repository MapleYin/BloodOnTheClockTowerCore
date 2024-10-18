import { hasRealAbility } from '../../common';

export const Slay: BCT.TAbility = {
    key: "Slay",
    validate: () => true,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (!player) {
            return
        }
        player.isSlew = true
    },
    effecting: (operation, players, timelines) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        if (!hasRealAbility(effectorPlayer) || !effectorPlayer.character.abilities.includes("Slay") || !player || player.character.kind !== "Demons") {
            return false
        }
        if (timelines.findIndex(t => {
            return t.operations.findIndex(op => {
                return op != operation && op.abilityKey === "Slay" && op.effector === operation.effector
            }) != -1
        }) != -1) {
            return false
        }
        return true
    }
}