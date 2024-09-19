import { isDeadPlayer } from '../../common';

export const WakenKnowCharacter: BCT.TAbility = {
    key: "WakenKnowCharacter",
    validate: context => {
        if (context.time !== "night" || !isDeadPlayer(context.player)) return false
        const timeline = context.timelines.find(timeline => timeline.turn === context.turn && timeline.time === context.time)
        const atBeginingOfTimeline = timeline?.initPlayers.find(p => p.position === context.player.position)
        if (!atBeginingOfTimeline) return false
        if (isDeadPlayer(atBeginingOfTimeline)) return false
        return true
    }
}