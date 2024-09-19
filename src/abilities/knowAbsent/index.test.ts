import { describe, expect, it } from '@jest/globals';

import { abilityOrder, simpleCharacterForKey } from '../../__test__';
import { Game } from '../../game';

describe("KnowAbsent", () => {
    describe("only exists in first night", () => {
        const characters: BCT.ECharacterKey[] = ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp"];
        const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);
        it("shows in first night", () => {
            const firstTimeline = game.nextTimeline();
            expect(firstTimeline.operations.map(o => o.abilityKey).includes("KnowAbsent")).toBeTruthy();
        });

        it("does not show in second night", () => {
            game.nextTimeline(); // First day
            const secondNightTimeline = game.nextTimeline(); // Second night
            expect(secondNightTimeline.operations.map(o => o.abilityKey).includes("KnowAbsent")).toBeFalsy();
        });
    })

    describe("only show when numberOfPlayer is greater than or equal to 7", () => {
        it.each([{
            characters: ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp"] as BCT.ECharacterKey[],
            expected: true
        }, {
            characters: ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Fortuneteller", "Imp", "Empath"] as BCT.ECharacterKey[],
            expected: true
        }, {
            characters: ["Washerwoman", "Librarian", "Investigator", "Chef", "Monk", "Imp"] as BCT.ECharacterKey[],
            expected: false
        }, {
            characters: ["Washerwoman", "Librarian", "Chef", "Monk", "Imp"] as BCT.ECharacterKey[],
            expected: false
        }])("when numberOfPlayer is $characters.length, expected $expected", ({ characters, expected }) => {
            const game = new Game(characters.map((character, idx) => ({ character: simpleCharacterForKey(character), position: idx })), abilityOrder);
            const firstTimeline = game.nextTimeline();
            expect(firstTimeline.operations.map(o => o.abilityKey).includes("KnowAbsent")).toBe(expected);
        })
    })
})