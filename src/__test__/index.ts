import { CharacterForKey } from '../characters';
import { Game } from '../game';

export const abilityOrder = [
    "KnowAbsent",
    "Poison",
    "KnowTownsfolk",
    "KnowOutsiders",
    "KnowMinions",
    "KnowSeat",
    "Guard",
    "Kill",
    "BecomeDemon",
    "Scapegoat",
    "Transform",
    "WakenKnowCharacter",
    "KnowCharacter",
    "KnowEvilAround",
    "CheckImp",
    "ChooseMaster",
    "DigKnowCharacter",
    "KnowCharacter",
    "Peep"
];

export const simpleCharacterForKey = (key: BCT.ECharacterKey) => {
    return {
        key,
        kind: CharacterForKey(key).kind,
        abilities: CharacterForKey(key).abilities.map(a => a.key)
    }
}

export const CreateGame = (characters: BCT.ECharacterKey[]) => {
    return new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);
}