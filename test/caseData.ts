import { Empath, Imp, Poisoner, Undertaker, Washerwoman } from '../src/character';
import { Player } from "../src/player"

export const CharacterCase1 = [Washerwoman, Empath, Imp, Poisoner, Undertaker]

export const PlayerCase1 = CharacterCase1.map((c, idx) => new Player({character: c, seat: idx}))