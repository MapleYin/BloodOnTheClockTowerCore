import { Empath, Imp, Poisoner, Ravenkeeper, ScarletWoman, Washerwoman } from '../src/character';

export const CharacterCase1 = [Washerwoman, Empath, Imp, Poisoner, Ravenkeeper]
export const CharacterCase2 = [Washerwoman, Empath, Imp, ScarletWoman, Ravenkeeper]

export const PlayerCase1 = CharacterCase1.map((c, idx) => { return { character: c.key, seat: idx + 1, avatar: c.key } })
export const PlayerCase2 = CharacterCase2.map((c, idx) => { return { character: c.key, seat: idx + 1, avatar: c.key } })