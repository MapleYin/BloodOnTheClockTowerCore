import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("CheckImp", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Fortuneteller", "Empath", "Chef", "Monk", "Imp"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("shows in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("CheckImp")).toBeTruthy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("CheckImp")).toBeTruthy();
    });

    it("does not show in third night when killed", () => {
        game.nextTimeline(); // Second day
        const thirdNightTimeline = game.nextTimeline(); // Third night
        const opIndex = thirdNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")

        game.updatePayload(4, opIndex, { target: 2})

        expect(thirdNightTimeline.operations.map(o => o.abilityKey).includes("CheckImp")).toBeFalsy();
    });
});