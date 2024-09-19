import { BecomeDemon } from './becomeDemon';
import { CheckImp } from './checkImp';
import { ChooseMaster } from './chooseMaster';
import { Defense } from './defense';
import { DigKnowCharacter } from './digKnowCharacter';
import { Excute } from './excute';
import { ExcuteByRack } from './excuteByRack';
import { Guard } from './guard';
import { Kill } from './kill';
import { KnowAbsent } from './knowAbsent';
import { KnowEvilAround } from './knowEvilAround';
import { KnowMinions } from './knowMinions';
import { KnowOutsiders } from './knowOutsiders';
import { KnowSeat } from './knowSeat';
import { KnowTownsfolk } from './knowTownsfolk';
import { Nomination } from './nomination';
import { Peep } from './peep';
import { Poison } from './poison';
import { Scapegoat } from './scapegoat';
import { Slay } from './slay';
import { Transform } from './transform';
import { WakenKnowCharacter } from './wakenKnowCharacter';

export {
    KnowAbsent,
    Poison,
    KnowTownsfolk,
    KnowOutsiders,
    KnowMinions,
    KnowSeat,
    Guard,
    Kill,
    BecomeDemon,
    Scapegoat,
    Transform,
    DigKnowCharacter,
    KnowEvilAround,
    CheckImp,
    ChooseMaster,
    WakenKnowCharacter,
    Peep,
    Nomination,
    Slay,
    Excute,
    ExcuteByRack,
    Defense
}

const abilities: BCT.TAbility[] = [
    KnowAbsent,
    Poison,
    KnowTownsfolk,
    KnowOutsiders,
    KnowMinions,
    KnowSeat,
    Guard,
    Kill,
    BecomeDemon,
    Scapegoat,
    Transform,
    DigKnowCharacter,
    KnowEvilAround,
    CheckImp,
    ChooseMaster,
    WakenKnowCharacter,
    Peep,
    Nomination,
    Slay,
    Excute,
    ExcuteByRack,
    Defense
]

export const getAbility = (key: string) => abilities.find(ability => ability.key === key)