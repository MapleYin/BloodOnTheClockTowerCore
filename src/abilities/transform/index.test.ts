import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { isAlivePlayer } from '../../common';
import { Game } from '../../game';

describe("Transform", () => {
    describe("not applied transform", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        it("not show in first night", () => {
            const firstTimeline = game.nextTimeline();
            expect(firstTimeline.operations.map(o => o.abilityKey).includes("Transform")).toBeFalsy();
        });

        it("show in second night", () => {
            game.nextTimeline(); // First day
            const secondNightTimeline = game.nextTimeline(); // Second night

            const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
            game.updatePayload(2, opIndex, { target: 6, result: true })

            expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("Transform")).toBeTruthy();
        });

        it("do not show kill when transform not applied", () => {
            game.nextTimeline(); // Second day
            const thirdNightTimeline = game.nextTimeline(); // Third night
            const opIndex = thirdNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")

            expect(opIndex).toBe(-1);
        });
    })

    describe("applied transform", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        game.nextTimeline();

        it("apply transform", () => {
            const secondNightTimeline = game.nextTimeline(); // Second night

            const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
            game.updatePayload(2, opIndex, { target: 6, result: true })

            const transformOpIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Transform")
            game.updatePayload(2, transformOpIndex, { target: 7 })

            const timelines = game.timelinesWithPlayerStatus();
            const lastTimeline = timelines[timelines.length - 1];
            expect(lastTimeline.effectedPlayers[7].character.key).toBe("Imp");

            const demons = lastTimeline.effectedPlayers.filter(p => p.character.kind === "Demons" && isAlivePlayer(p))
            expect(demons.length).toBe(1);
        })
    })

    describe("transform with become demon", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Scarletwoman", "Chef", "Monk", "Spy", "Imp", "Poisoner"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);

        game.nextTimeline();
        game.nextTimeline();

        it("do not transform when become demon effecting", () => {
            const secondNightTimeline = game.nextTimeline(); // Second night

            const opIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Kill")
            game.updatePayload(2, opIndex, { target: 6, result: true })

            const becomeDemonOpIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "BecomeDemon")

            expect(becomeDemonOpIndex).not.toBe(-1);

            expect(secondNightTimeline.operations[becomeDemonOpIndex].payload?.character[0]).toBe("Imp");

            const transformOpIndex = secondNightTimeline.operations.findIndex(op => op.abilityKey === "Transform")

            expect(transformOpIndex).toBe(-1);
        })
    })
});