import { describe, expect, it } from '@jest/globals';

import { abilityOrder, CreateGame, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("Poison", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("Poison")).toBeTruthy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("Poison")).toBeTruthy();
    });

    it("effect a player", () => {
        const timelineIdx = game.timelines.length - 1
        const secondNightTimeline = game.timelines[timelineIdx]
        const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Poison")

        game.updatePayload(timelineIdx, opIndex, { target: 2 })

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelineIdx]

        const killOpertion = lastTimeline.operations.find(op => op.abilityKey === "Poison")

        expect(killOpertion?.initPlayers[2].isPoisoned).toBeFalsy()
        expect(killOpertion?.effectedPlayers[2].isPoisoned).toBeTruthy();
        expect(lastTimeline.effectedPlayers[2].isPoisoned).toBeTruthy();
    });

    it("effect in day", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isPoisoned).toBeTruthy()
    });

    it("not effect in night", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isPoisoned).toBeFalsy()
    });

});