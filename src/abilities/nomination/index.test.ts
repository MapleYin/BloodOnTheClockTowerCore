import { describe, expect, it } from '@jest/globals';

import { abilityOrder, CreateGame, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';
import { Nomination } from '../nomination';

describe("Nomination", () => {
    const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"])

    it("Nomination", () => {
        game.nextTimeline();
        game.nextTimeline();
        
        game.createOperation(Nomination.key, 0, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 1
        })

        game.createOperation(Nomination.key, 1, {
            voters: [0, 5, 6, 7],
            target: 2
        })

        const timelines = game.timelinesWithPlayerStatus()

        const lastTimeline = timelines[timelines.length - 1]

        expect(lastTimeline.effectedPlayers[1].isOnGallows).toBeTruthy()
        expect(lastTimeline.effectedPlayers[2].isOnGallows).toBeFalsy()

        game.nextTimeline()

        const nextTimelines = game.timelinesWithPlayerStatus()

        const nextLastTimeline = nextTimelines[nextTimelines.length - 1]

        expect(nextLastTimeline.effectedPlayers[1].isOnGallows).toBeFalsy()
        expect(nextLastTimeline.effectedPlayers[2].isOnGallows).toBeFalsy()
    });
});