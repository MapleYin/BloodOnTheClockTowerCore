import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("KnowOutsiders", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("shows in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("KnowOutsiders")).toBeTruthy();
    });

    it("does not show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("KnowOutsiders")).toBeFalsy();
    });
});