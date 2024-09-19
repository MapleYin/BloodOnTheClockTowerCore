import { AliveAtNight } from '../helper';

export const KnowMinions: BCT.TAbility = {
    key: "KnowMinions",
    validate: context =>
        AliveAtNight(context) &&
        context.turn === 1
}