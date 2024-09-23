import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';

describe("Drunk", () => {
    describe("Test Drunk", () => {
        const game = CreateGame(["Slayer", "Librarian", "Scarletwoman", "Empath", "Drunk", "Monk", "Imp"], { drunk: "Fortuneteller" });

        it("show check Demon in first night", () => {
            const firstTimeline = game.nextTimeline();
            const timelinesWithPlayerStatus = game.timelinesWithPlayerStatus();
            const lastTimeline = timelinesWithPlayerStatus[timelinesWithPlayerStatus.length - 1];
            expect(lastTimeline.effectedPlayers[4].isDrunk).toBeTruthy();
            expect(firstTimeline.operations.map(o => o.abilityKey).includes("CheckImp")).toBeTruthy();
        });

    })

});