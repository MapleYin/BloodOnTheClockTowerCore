import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("Slay", () => {
    it("slay demon", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Slayer", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        const dayTimeline = game.nextTimeline(); // First day
        game.createOperation("Slay", 2, { target: 6 });

        expect(dayTimeline.operations.map(o => o.abilityKey).includes("Slay")).toBeTruthy();

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelines.length - 1]

        expect(lastTimeline.effectedPlayers[6].isSlew).toBeTruthy();
    });

    it("slay target is not demon", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Slayer", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        const dayTimeline = game.nextTimeline(); // First day
        game.createOperation("Slay", 2, { target: 5 });

        expect(dayTimeline.operations.map(o => o.abilityKey).includes("Slay")).toBeTruthy();

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelines.length - 1]
        const slayOperation = lastTimeline.operations[0]

        expect(slayOperation?.initPlayers[5].isSlew).toBeFalsy()
        expect(slayOperation?.effectedPlayers[5].isSlew).toBeFalsy();
    });

    it("effector is not slayer slay target is demon", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Slayer", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        const dayTimeline = game.nextTimeline(); // First day
        game.createOperation("Slay", 3, { target: 6 });

        expect(dayTimeline.operations.map(o => o.abilityKey).includes("Slay")).toBeTruthy();

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelines.length - 1]
        const slayOperation = lastTimeline.operations[0]

        expect(slayOperation?.initPlayers[6].isSlew).toBeFalsy()
        expect(slayOperation?.effectedPlayers[6].isSlew).toBeFalsy();
    });

    it("effector is slayer slay target is demon effect only once", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Slayer", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        game.nextTimeline(); // First day
        game.createOperation("Slay", 2, { target: 5 });
        game.createOperation("Slay", 2, { target: 6 });

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelines.length - 1]

        expect(lastTimeline?.effectedPlayers[5].isSlew).toBeFalsy();
        expect(lastTimeline?.effectedPlayers[6].isSlew).toBeFalsy();
    });
});