import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("Kill", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("not show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("Kill")).toBeFalsy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("Kill")).toBeTruthy();
    });

    it("effect a player", () => {
        const timelineIdx = game.timelines.length - 1
        const secondNightTimeline = game.timelines[timelineIdx]
        const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")

        game.updatePayload(timelineIdx, opIndex, { target: 2, result: true })

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelineIdx]

        const killOpertion = lastTimeline.operations.find(op => op.abilityKey === "Kill")

        expect(killOpertion?.initPlayers[2].isKilled).toBeFalsy()
        expect(killOpertion?.effectedPlayers[2].isKilled).toBeTruthy();
        expect(lastTimeline.effectedPlayers[2].isKilled).toBeTruthy();
    });

    it("keep effect in next timeline", () => {
        const nextTimeline = game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isKilled).toBeTruthy()
        
    });


    /// TODO
    /// 士兵/市长 配合毒的状态
});