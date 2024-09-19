import { AliveAtNight } from '../helper';

export const KnowTownsfolk: BCT.TAbility = {
    key: "KnowTownsfolk",
    validate: context =>
        AliveAtNight(context) && context.turn === 1
}
