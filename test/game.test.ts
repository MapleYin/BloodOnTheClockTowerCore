import { describe, expect, test } from '@jest/globals';
import { Game } from "../src/game"
import { TroubleBrewing } from '../src/book';
import { PlayerCase1 } from './caseData';


describe("Game Test", () => {
    test("createTimeline", () => {
        const game = new Game(TroubleBrewing, PlayerCase1)
        
        game.createTimeline()
        expect(game.timelines.length).toEqual(1)
    })
})