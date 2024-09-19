import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("ChooseMaster", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("ChooseMaster")).toBeTruthy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("ChooseMaster")).toBeTruthy();
    });

    it("effect a player", () => {
        const timelineIdx = game.timelines.length - 1
        const secondNightTimeline = game.timelines[timelineIdx]
        const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "ChooseMaster")

        game.updatePayload(timelineIdx, opIndex, { target: 2 })

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelineIdx]

        const chooseMasterOpertion = lastTimeline.operations.find(op => op.abilityKey === "ChooseMaster")

        expect(chooseMasterOpertion?.initPlayers[2].isMaster).toBeFalsy()
        expect(chooseMasterOpertion?.effectedPlayers[2].isMaster).toBeTruthy();
        expect(lastTimeline.effectedPlayers[2].isMaster).toBeTruthy();
    });

    it("effect in day", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isMaster).toBeTruthy()
    });

    it("not effect in night", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isMaster).toBeFalsy()
    });
});