import { AliveAtNight } from '../helper';

export const KnowSeat: BCT.TAbility = {
    key: "KnowSeat",
    validate: context =>
        AliveAtNight(context) && context.turn === 1,
}
