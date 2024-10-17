import { hasRealAbility } from '../../common';

export const Slay: BCT.TAbility = {
    key: "Slay",
    validate: () => true,
    effect: (operation, players) => {
        const effectorPlayer = players[operation.effector]
        const player = players[operation.payload?.target]
        operation.payload = {
            ...operation.payload,
            result: false
        }
        if (effectorPlayer.character.abilities.includes("Slay") && hasRealAbility(effectorPlayer) && player && player.character.kind === "Demons") {
            player.isSlew = true
            operation.payload = {
                ...operation.payload,
                result: true
            }
        }
        if (effectorPlayer.character.abilities.includes("Slay")) {
            effectorPlayer.character.abilities.splice(effectorPlayer.character.abilities.indexOf("Slay"), 1)
        }
    }
}