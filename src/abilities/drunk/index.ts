import { CharacterForKey } from '../../characters';

export const Drunk: BCT.TAbility = {
    key: "Drunk",
    validate: () => true,
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.isDrunk = true
            const character = CharacterForKey(operation.payload?.character)
            if (!character) {
                throw new Error("Drunk character not found")
            }
            player.character = {
                ...player.character,
                abilities: character.abilities.map(a => a.key)
            }
        }
    }
}