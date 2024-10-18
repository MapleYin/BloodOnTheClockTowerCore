import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';
import { isAlivePlayer, isDeadPlayer } from '../../common';

describe("BecomeDemon", () => {
    describe("Demon dead in day case", () => {
        const game = CreateGame(["Slayer", "Librarian", "Scarletwoman", "Empath", "Chef", "Monk", "Imp"]);

        it("no shows in first night", () => {
            const firstTimeline = game.nextTimeline();
            expect(firstTimeline.operations.map(o => o.abilityKey).includes("BecomeDemon")).toBeFalsy();
        });

        it("show in second day", () => {
            const dayTimeline = game.nextTimeline(); // First day

            game.createOperation("Slay", 0, { target: 6 });

            const timelines = game.timelinesWithPlayerStatus();

            const lastTimeline = timelines[timelines.length - 1];

            expect(isDeadPlayer(lastTimeline.effectedPlayers[6])).toBeTruthy()

            expect(dayTimeline.operations.map(o => o.abilityKey).includes("BecomeDemon")).toBeTruthy();

            expect(lastTimeline.effectedPlayers[2].character.key).toBe("Imp");
        });
    })

    describe("Demon self kill in night case", () => {
        const game = CreateGame(["Slayer", "Librarian", "Scarletwoman", "Empath", "Chef", "Monk", "Imp"]);
        it("shows in thirdTimeline", () => {
            const firstTimeline = game.nextTimeline();
            const secondTimeline = game.nextTimeline();
            const thirdTimeline = game.nextTimeline(); /// night

            /// self kill
            const idx = thirdTimeline.operations.findIndex(o => o.abilityKey == "Kill")
            game.updatePayload(2, idx, { target: 6, result: true })

            const timelines = game.timelinesWithPlayerStatus();
            const lastTimeline = timelines[timelines.length - 1];


            expect(thirdTimeline.operations.map(o => o.abilityKey).includes("BecomeDemon")).toBeTruthy();

            expect(lastTimeline.effectedPlayers[2].character.key).toBe("Imp");
        });
    })

    describe("Scarletwoman was dead can not become demon", () => {
        const game = CreateGame(["Slayer", "Librarian", "Scarletwoman", "Empath", "Chef", "Monk", "Imp"]);
        it("shows in thirdTimeline", () => {
            const firstTimeline = game.nextTimeline();
            const secondTimeline = game.nextTimeline();
            const thirdTimeline = game.nextTimeline(); /// night

            /// self kill
            const idx = thirdTimeline.operations.findIndex(o => o.abilityKey == "Kill")
            game.updatePayload(2, idx, { target: 2 })

            game.nextTimeline()

            game.createOperation("Slay", 0, { target: 6 })

            const timelines = game.timelinesWithPlayerStatus();
            const lastTimeline = timelines[timelines.length - 1];

            const aliveDemons = lastTimeline.effectedPlayers.filter(p => p.character.kind === "Demons" && isAlivePlayer(p))
            expect(aliveDemons.length).toBe(0);
        })
    })

    describe("Scarletwoman was dead can not become demon", () => {
        const game = CreateGame(["Slayer", "Librarian", "Scarletwoman", "Empath", "Chef", "Monk", "Imp", "Poisoner"]);
        it("shows in thirdTimeline", () => {
            const firstTimeline = game.nextTimeline();
            const poisonIdx = firstTimeline.operations.findIndex(o => o.abilityKey == "Poison")

            game.updatePayload(0, poisonIdx, { target: 0 })

            const secondTimeline = game.nextTimeline();

            game.createOperation("Slay", 0, { target: 6 })

            const timelines = game.timelinesWithPlayerStatus();
            const lastTimeline = timelines[timelines.length - 1];

            expect(lastTimeline.effectedPlayers[2].character.key).toBe("Scarletwoman");

            const aliveDemons = lastTimeline.effectedPlayers.filter(p => p.character.kind === "Demons" && isAlivePlayer(p))
            expect(aliveDemons.length).toBe(1);
        })
    })
    
    

});