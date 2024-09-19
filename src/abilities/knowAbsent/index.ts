import { FirstNight } from '../helper';

export const KnowAbsent: BCT.TAbility = {
    key: "KnowAbsent",
    validate: context => FirstNight(context) && context.players.length >= 7,
}