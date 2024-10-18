import { hasRealAbility } from '../../common';

export const Slay: BCT.TAbility = {
    key: "Slay",
    validate: () => true,
    effect: (operation, players, timelines) => {
        const player = players[operation.payload?.target]
        const effectorPlayer = players[operation.effector]
        if (!player) {
            return
        }
        if (!hasRealAbility(effectorPlayer) || !effectorPlayer.character.abilities.includes("Slay") || !player || player.character.kind !== "Demons") {
            return
        }
        if (timelines.findIndex(t => {
            return t.operations.findIndex(op => {
                return op != operation && op.abilityKey === "Slay" && op.effector === operation.effector
            }) != -1
        }) != -1) {
            return
        }
        player.isSlew = true
    }
}