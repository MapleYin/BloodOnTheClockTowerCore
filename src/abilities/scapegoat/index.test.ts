import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';
import { isDeadPlayer } from '../../common';

describe("Scapegoat", () => {

    it("need show when become demon kill target", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Mayor", "Chef", "Monk", "Spy", "Imp", "Poisoner", "Fortuneteller"]);

        game.nextTimeline();
        game.nextTimeline();
        const secondNightTimeline = game.nextTimeline();

        const killIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
        game.updatePayload(2, killIndex, { target: 2 })

        const scapegoatIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Scapegoat")
        game.updatePayload(2, scapegoatIndex, { target: 1 })

        expect(scapegoatIndex).toBe(killIndex + 1);

        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1];

        expect(isDeadPlayer(lastTimeline.effectedPlayers[2])).toBeFalsy()
        expect(scapegoatIndex).not.toBe(-1);
        expect(isDeadPlayer(lastTimeline.effectedPlayers[1])).toBeTruthy()
    });

    it("do not show when been poisoned or been drunk", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Mayor", "Chef", "Monk", "Spy", "Imp", "Poisoner"]);

        game.nextTimeline();
        game.nextTimeline();
        const secondNightTimeline = game.nextTimeline();

        const poisonIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Poison")
        game.updatePayload(2, poisonIndex, { target: 2 })
        const killIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
        game.updatePayload(2, killIndex, { target: 2 })

        const scapegoatIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Scapegoat")
        expect(scapegoatIndex).toBe(-1);

        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1];

        expect(isDeadPlayer(lastTimeline.effectedPlayers[2])).toBeTruthy()
    });

});