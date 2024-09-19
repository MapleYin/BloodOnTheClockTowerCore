import { ExcuteByRack } from '../excuteByRack';
import { AliveAtNight } from '../helper';

export const DigKnowCharacter: BCT.TAbility = {
    key: "DigKnowCharacter",
    validate: context => {
        if (context.timelines.length < 2) {
            return false
        }
        const lastTimeline = context.timelines[context.timelines.length - 2]
        
        return AliveAtNight(context) && lastTimeline.operations.some(op => op.abilityKey === ExcuteByRack.key)
    }
}