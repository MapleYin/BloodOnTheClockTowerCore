import { describe, expect, test } from '@jest/globals';
import { TroubleBrewing } from '../src/book';
import { PlayerCase1 } from './caseData';
import { Timeline } from '../src/timeline';
import { KnowAbsent, KnowEvilAround, KnowTownsfolk, Nomination, Poison, Slay, WakenKnowCharacter } from '../src/skill';
import { Empath } from '../src/character';
import { CreateOperation } from '../src/operation';
import { isDeadPlayer } from '../src/player';

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
            seat: PlayerCase1[0].seat
        }
        timeline.operations[2].payload = {
            seats: [PlayerCase1[0].seat, PlayerCase1[1].seat],
            character: Empath.key
        }
        timeline.operations[3].payload = {
            number: 2
        }
        let timelineNext = new Timeline(TroubleBrewing, PlayerCase1, timeline)
        expect(timelineNext.players[0].isPoisoned).toBeTruthy()

        expect(timelineNext.operations.length).toEqual(0)

        const timelineNextNext = new Timeline(TroubleBrewing, PlayerCase1, timelineNext)

        timelineNextNext.operations[0].payload = {
            seat: PlayerCase1[4].seat,
        }

        timelineNextNext.operations[1].payload = {
            seat: PlayerCase1[4].seat,
            result: true
        }

        const t = Timeline.from(TroubleBrewing, timelineNextNext)

        expect(t.operations[2].skill.key).toEqual(WakenKnowCharacter.key)
    })
})