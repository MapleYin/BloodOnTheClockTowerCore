import { AliveAtNight } from '../helper';

export const Peep: BCT.TAbility = {
    key: "Peep",
    validate: context => AliveAtNight(context)
}