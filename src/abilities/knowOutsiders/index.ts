import { AliveAtNight } from '../helper';

export const KnowOutsiders: BCT.TAbility = {
    key: "KnowOutsiders",
    validate: context =>
        AliveAtNight(context) && context.turn === 1
}