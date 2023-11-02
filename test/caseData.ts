import { Empath, Imp, Poisoner, Ravenkeeper, Washerwoman } from '../src/character';

export const CharacterCase1 = [Washerwoman, Empath, Imp, Poisoner, Ravenkeeper]

export const PlayerCase1 = CharacterCase1.map((c, idx) => { return { character: c.key, seat: idx + 1, avatar: c.key } })