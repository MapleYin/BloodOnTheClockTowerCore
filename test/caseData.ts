import { Empath, Imp, Poisoner, Undertaker, Washerwoman } from '../src/character';

export const CharacterCase1 = [Washerwoman, Empath, Imp, Poisoner, Undertaker]

export const PlayerCase1 = CharacterCase1.map((c, idx) => { return { character: c.key, seat: idx, avatar: c.key  } })