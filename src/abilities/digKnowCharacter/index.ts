import { Excute } from '../excute';
import { ExcuteByRack } from '../excuteByRack';
import { AliveAtNight } from '../helper';

export const DigKnowCharacter: BCT.TAbility = {
    key: "DigKnowCharacter",
    validate: context => {
        const currentTimelineIdx = context.timelines.findIndex(timeline => timeline.time === context.time && timeline.turn === context.turn)
        const lastTimeline = context.timelines[currentTimelineIdx - 1]

        if (!lastTimeline) {
            return false
        }
        
        return AliveAtNight(context) && lastTimeline.operations.some(op => op.abilityKey === ExcuteByRack.key || op.abilityKey === Excute.key)
    }
}