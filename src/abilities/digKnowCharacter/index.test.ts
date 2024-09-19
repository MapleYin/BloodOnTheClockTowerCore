import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';
import { Nomination } from '../nomination';

describe("DigKnowCharacter", () => {
    const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"])

    it("no show in first night", () => {
        const firstTimeline = game.nextTimeline();
        expect(firstTimeline.operations.map(o => o.abilityKey).includes("DigKnowCharacter")).toBeFalsy();
    });

    it("show when someone excute in day", () => {
        game.nextTimeline()
        game.createOperation(Nomination.key, 0, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 1
        })

        game.nextTimeline()
        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.operations.map(o => o.abilityKey).includes("DigKnowCharacter")).toBeTruthy();
    })
    /// todo: test digKnowCharacter show when someone excute in day
});