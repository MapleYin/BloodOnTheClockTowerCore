import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';

describe("Peep", () => {
    const game = CreateGame(["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Spy", "Imp", "Poisoner"]);

    it("show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("Peep")).toBeTruthy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("Peep")).toBeTruthy();
    });

    it("does not show in third night when killed", () => {
        game.nextTimeline(); // Second day
        const thirdNightTimeline = game.nextTimeline(); // Third night
        const opIndex = thirdNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")

        game.updatePayload(4, opIndex, { target: 5})

        expect(thirdNightTimeline.operations.map(o => o.abilityKey).includes("Peep")).toBeFalsy();
    });
});