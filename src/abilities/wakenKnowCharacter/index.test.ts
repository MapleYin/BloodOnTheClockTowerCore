import { describe, expect, it } from '@jest/globals';

import { abilityOrder, CreateGame, simpleCharacterForKey } from '../../__test__';
import { isDeadPlayer } from '../../common';
import { Game } from '../../game';

describe("WakenKnowCharacter", () => {
    const game = CreateGame(["Washerwoman", "Librarian", "Empath", "Chef", "Monk", "Fortuneteller", "Imp", "Ravenkeeper"])

    it("not show in night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("WakenKnowCharacter")).toBeFalsy();
    });

    it("not show in second night", () => {
        game.nextTimeline(); // First day
        const secondNightTimeline = game.nextTimeline(); // Second night
        expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("WakenKnowCharacter")).toBeFalsy();
    });

    it("show in third night when killed", () => {
        game.nextTimeline(); // Second day
        const thirdNightTimeline = game.nextTimeline(); // Third night
        const opIndex = thirdNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")

        game.updatePayload(4, opIndex, { target: 7, result: true })

        expect(thirdNightTimeline.operations.map(o => o.abilityKey).includes("WakenKnowCharacter")).toBeTruthy();

    });

    it("no show in third night when already killed", () => {
        game.nextTimeline(); // Second day
        const thirdNightTimeline = game.nextTimeline(); // Third night

        expect(thirdNightTimeline.operations.map(o => o.abilityKey).includes("WakenKnowCharacter")).toBeFalsy();
    });

    it("wakenKnowCharacter should be show in second night", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler", "Ravenkeeper"])
        game.nextTimeline()
        game.nextTimeline()
        game.nextTimeline()
        const timelineIdx = game.timelines.length - 1
        const lastTimeline = game.timelines[timelineIdx]
        const poisonIdx = lastTimeline.operations.findIndex(op => op.abilityKey === "Poison")

        game.updatePayload(timelineIdx, poisonIdx, { target: 4 })

        const guardIdx = lastTimeline.operations.findIndex(op => op.abilityKey === "Guard")

        game.updatePayload(timelineIdx, guardIdx, { target: 9 })

        const killIdx = lastTimeline.operations.findIndex(op => op.abilityKey === "Kill")

        game.updatePayload(timelineIdx, killIdx, { target: 9 })

        const timelines = game.timelinesWithPlayerStatus()

        const lastStatusTimeline = timelines[timelineIdx]

        const wakenIdx = lastStatusTimeline.operations.findIndex(op => op.abilityKey === "WakenKnowCharacter")

        

        expect(lastStatusTimeline.effectedPlayers[4].isPoisoned).toBeTruthy()

        expect(lastStatusTimeline.effectedPlayers[9].isGuarded).toBeFalsy()
        
        expect(isDeadPlayer(lastStatusTimeline.effectedPlayers[9])).toBeTruthy()

        expect(wakenIdx).not.toEqual(-1)
    })
});