import { isAlivePlayer, isDeadPlayer } from '../../common';

export const BecomeDemon: BCT.TAbility = {
    key: "BecomeDemon",
    validate: context =>
        isAlivePlayer(context.player) &&
        context.players.filter(isAlivePlayer).length >= 4 && /// 人数大于4人
        context.players.findIndex(p => isAlivePlayer(p) && p.character.kind == "Demons") == -1, /// 没有存活的恶魔
    effect: (operation, players) => {
        if (operation.payload?.character) {
            players[operation.effector].character = operation.payload.character
        }
    },
    autoPayload: (context) => {
        const lastTimeline = context.timelines[context.timelines.length - 1]
        const aliveDemons = lastTimeline.initPlayers.filter(p => !isDeadPlayer(p) && p.character?.kind == "Demons")
        const deadDemons = context.players.filter(p => isDeadPlayer(p) && p.character?.kind == "Demons")
        const target = deadDemons.find(deadDemon => aliveDemons.findIndex(aliveDemon => aliveDemon.position) != -1)
        return {
            character: target?.character
        }
    }
}