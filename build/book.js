"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadMoonRising = exports.SectsViolets = exports.TroubleBrewing = void 0;
var character_1 = require("./character");
var skill_1 = require("./skill");
var book_1 = require("./locals/book");
var Book = /** @class */ (function () {
    function Book(key, characters, skills) {
        this.key = key;
        this.characters = characters;
        this.skills = skills;
    }
    Object.defineProperty(Book.prototype, "name", {
        get: function () {
            return book_1.zh[this.key];
        },
        enumerable: false,
        configurable: true
    });
    return Book;
}());
exports.TroubleBrewing = new Book("TroubleBrewing", [
    character_1.Washerwoman, character_1.Librarian, character_1.Investigator, character_1.Chef, character_1.Empath, character_1.FortuneTeller, character_1.Undertaker, character_1.Monk, character_1.Ravenkeeper, character_1.Virgin, character_1.Slayer, character_1.Soldier, character_1.Mayor,
    character_1.Butler, character_1.Drunk, character_1.Recluse, character_1.Saint,
    character_1.Poisoner, character_1.Spy, character_1.ScarletWoman, character_1.Baron,
    character_1.Imp
], [
    skill_1.KnowAbsent, skill_1.Poison, skill_1.KnowTownsfolk, skill_1.KnowOutsiders, skill_1.KnowMinions,
    skill_1.KnowSeat, skill_1.Guard, skill_1.BecomeImp, skill_1.Kill, skill_1.Scapegoat, skill_1.Tramsform,
    skill_1.WakenKnowCharacter, skill_1.KnowEvilAround, skill_1.CheckImp, skill_1.ChooseMaster,
    skill_1.DigKnowCharacter, skill_1.Peep
]);
exports.SectsViolets = new Book("SectsViolets", [
    character_1.Clockmaker, character_1.Dreamer, character_1.Snakecharmer, character_1.Mathematician, character_1.Flowergirl, character_1.Towncrier, character_1.Oracle, character_1.Savant, character_1.Seamstress, character_1.Philosopher, character_1.Artist, character_1.Juggler, character_1.Sage,
    character_1.Mutant, character_1.Sweetheart, character_1.Barber, character_1.Klutz,
    character_1.Eviltwin, character_1.Witch, character_1.Cerenovus, character_1.Pithag,
    character_1.Fanggu, character_1.Vigormortis, character_1.Nodashii, character_1.Vortox
], []);
exports.BadMoonRising = new Book("BadMoonRising", [
    character_1.Grandmother, character_1.Sailor, character_1.Chambermaid, character_1.Exorcist, character_1.Innkeeper, character_1.Gambler, character_1.Gossip, character_1.Courtier, character_1.Professor, character_1.Minstrel, character_1.Tealady, character_1.Pacifist, character_1.Fool,
    character_1.Tinker, character_1.Moonchild, character_1.Goon, character_1.Lunatic,
    character_1.Godfather, character_1.Devilsadvocate, character_1.Assassin, character_1.Mastermind,
    character_1.Zombuul, character_1.Pukka, character_1.Shabaloth, character_1.Po
], []);
