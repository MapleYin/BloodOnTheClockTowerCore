export const isDeadPlayer = (player: BCT.TPlayer) => player.isKilled || player.isSlew || player.isExecuted
export const isAlivePlayer = (player: BCT.TPlayer) => !isDeadPlayer(player)
export const hasRealAbility = (player: BCT.TPlayer) => !(player.isDrunken || player.isPoisoned)
export const copyPlayers = (players: BCT.TPlayer[]) => players.map<BCT.TPlayer>(p => ({ ...p, character: { ...p.character, abilities: [...p.character.abilities] } }))