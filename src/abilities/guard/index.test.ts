import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { isDeadPlayer } from '../../common';
import { Game } from '../../game';

describe("Guard", () => {
    const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Monk"];
    const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

    it("no show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("Guard")).toBeFalsy();
    });

    it("show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("Guard")).toBeTruthy();
    });

    it("effect a player", () => {
        const timelineIdx = game.timelines.length - 1
        const secondNightTimeline = game.timelines[timelineIdx]
        const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Guard")

        const killOpIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
 
        game.updatePayload(timelineIdx, opIndex, { target: 2 })

        game.updatePayload(timelineIdx, killOpIndex, { target: 2 })

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelineIdx]
        
        expect(lastTimeline.effectedPlayers[2].isGuarded).toBeTruthy();
        expect(isDeadPlayer(lastTimeline.effectedPlayers[2])).toBeFalsy();
    });

    it("effect in day", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isGuarded).toBeTruthy()
    });

    it("not effect in night", () => {
        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[2].isGuarded).toBeFalsy()
    });
});