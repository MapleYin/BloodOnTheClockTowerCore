import { describe, expect, it } from '@jest/globals';

import { CreateGame } from '../../__test__';
import { Nomination } from '../nomination';

describe("ExcuteByRack", () => {
    it("excute by rack", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"])
        const firstTimeline = game.nextTimeline();
        const secondTimeline = game.nextTimeline();

        game.createOperation(Nomination.key, 0, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 1
        })

        game.createOperation(Nomination.key, 1, {
            voters: [0, 1, 2, 3, 4, 5, 6],
            target: 2
        })

        game.nextTimeline()

        const timelines = game.timelinesWithPlayerStatus()
        expect(timelines.length).toBe(3)

        expect(timelines[1].effectedPlayers[1].isOnGallows).toBeTruthy()
        expect(timelines[1].effectedPlayers[2].isOnGallows).toBeTruthy()
        expect(timelines[1].effectedPlayers[1].isExecuted).toBeTruthy()
        expect(timelines[1].effectedPlayers[2].isExecuted).toBeFalsy()

        expect(timelines[2].effectedPlayers[1].isExecuted).toBeTruthy()
    });

    it("no excute by rack", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"])
        const firstTimeline = game.nextTimeline();
        const secondTimeline = game.nextTimeline();

        game.createOperation(Nomination.key, 0, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 1
        })

        game.createOperation(Nomination.key, 1, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 2
        })


        game.nextTimeline()

        const timelines = game.timelinesWithPlayerStatus()

        expect(timelines[1].effectedPlayers[1].isOnGallows).toBeTruthy()
        expect(timelines[1].effectedPlayers[2].isOnGallows).toBeTruthy()
        expect(timelines[1].effectedPlayers[1].isExecuted).toBeFalsy()
        expect(timelines[1].effectedPlayers[2].isExecuted).toBeFalsy()
    });

    it("keep excute by rack", () => {
        const game = CreateGame(["Washerwoman", "Librarian", "Undertaker", "Chef", "Monk", "Fortuneteller", "Imp", "Poisoner", "Butler"])
        const firstTimeline = game.nextTimeline();
        const secondTimeline = game.nextTimeline();

        game.createOperation(Nomination.key, 0, {
            voters: [0, 1, 2, 3, 4, 5, 6, 7],
            target: 1
        })

        game.nextTimeline()

        const timelines = game.timelinesWithPlayerStatus()
        const lastTimeline = timelines[timelines.length - 1]
        expect(lastTimeline.initPlayers[1].isExecuted).toBeTruthy()
    })
})