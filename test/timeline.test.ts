import { describe, expect, test } from '@jest/globals';
import { TroubleBrewing } from '../src/book';
import { PlayerCase1 } from './caseData';
import { Timeline } from '../src/timeline';
import { KnowAbsent, KnowEvilAround, KnowTownsfolk, Nomination, Poison, Slay } from '../src/skill';
import { Empath } from '../src/character';
import { CreateOperation } from '../src/operation';

describe("Timeline creation perperty", () => {

    test("turn/time", () => {
        let timeline = new Timeline(TroubleBrewing, PlayerCase1)
        expect(timeline.turn).toEqual(1)
        expect(timeline.time).toEqual("night")
    })


    /**
     * this case contain characters:
     * Washerwoman, Empath, Imp, Poisoner, Undertaker
     */
    test("oprations PlayerCase1", () => {
        let timeline = new Timeline(TroubleBrewing, PlayerCase1)
        expect(timeline.operations.length).toEqual(4)
        expect(timeline.operations[0].skill).toEqual(KnowAbsent)
        expect(timeline.operations[1].skill).toEqual(Poison)
        expect(timeline.operations[2].skill).toEqual(KnowTownsfolk)
        expect(timeline.operations[3].skill).toEqual(KnowEvilAround)
    })

    /**
     * 
     */
    test("oprations PlayerCase1 on day time", () => {
        let timeline = new Timeline(TroubleBrewing, PlayerCase1)
        expect(timeline.operations[1].payloadKey).toEqual("P")
        timeline.operations[0].payload = {
            characters: []
        }
        timeline.operations[1].payload = {
            player: PlayerCase1[0]
        }
        timeline.operations[2].payload = {
            players: [PlayerCase1[0], PlayerCase1[1]],
            character: Empath
        }
        timeline.operations[3].payload = {
            number: 2
        }
        let timelineNext = new Timeline(TroubleBrewing, PlayerCase1, timeline)
        expect(timelineNext.players[0].isPoisoned).toBeTruthy()

        expect(timelineNext.operations.length).toEqual(0)

        timelineNext.operations.push(CreateOperation(timelineNext.players[0], Slay))

        expect(timelineNext.operations[0].skill).toEqual(Slay)

        timelineNext.operations[0].payload = {
            player: timelineNext.players[1],
            result: true
        }

        expect(timelineNext.effected()[1].dead).toBeTruthy()
    })
})