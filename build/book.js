"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rules = exports.BadMoonRising = exports.SectsViolets = exports.TroubleBrewing = void 0;
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
exports.Rules = {
    5: (_a = {}, _a["Townsfolk" /* EKind.townsfolk */] = 3, _a["Outsiders" /* EKind.outsiders */] = 0, _a["Minions" /* EKind.minions */] = 1, _a["Demons" /* EKind.demons */] = 1, _a),
    6: (_b = {}, _b["Townsfolk" /* EKind.townsfolk */] = 3, _b["Outsiders" /* EKind.outsiders */] = 1, _b["Minions" /* EKind.minions */] = 1, _b["Demons" /* EKind.demons */] = 1, _b),
    7: (_c = {}, _c["Townsfolk" /* EKind.townsfolk */] = 5, _c["Outsiders" /* EKind.outsiders */] = 0, _c["Minions" /* EKind.minions */] = 1, _c["Demons" /* EKind.demons */] = 1, _c),
    8: (_d = {}, _d["Townsfolk" /* EKind.townsfolk */] = 5, _d["Outsiders" /* EKind.outsiders */] = 1, _d["Minions" /* EKind.minions */] = 1, _d["Demons" /* EKind.demons */] = 1, _d),
    9: (_e = {}, _e["Townsfolk" /* EKind.townsfolk */] = 5, _e["Outsiders" /* EKind.outsiders */] = 2, _e["Minions" /* EKind.minions */] = 1, _e["Demons" /* EKind.demons */] = 1, _e),
    10: (_f = {}, _f["Townsfolk" /* EKind.townsfolk */] = 7, _f["Outsiders" /* EKind.outsiders */] = 0, _f["Minions" /* EKind.minions */] = 2, _f["Demons" /* EKind.demons */] = 1, _f),
    11: (_g = {}, _g["Townsfolk" /* EKind.townsfolk */] = 7, _g["Outsiders" /* EKind.outsiders */] = 1, _g["Minions" /* EKind.minions */] = 2, _g["Demons" /* EKind.demons */] = 1, _g),
    12: (_h = {}, _h["Townsfolk" /* EKind.townsfolk */] = 7, _h["Outsiders" /* EKind.outsiders */] = 2, _h["Minions" /* EKind.minions */] = 2, _h["Demons" /* EKind.demons */] = 1, _h),
    13: (_j = {}, _j["Townsfolk" /* EKind.townsfolk */] = 9, _j["Outsiders" /* EKind.outsiders */] = 0, _j["Minions" /* EKind.minions */] = 3, _j["Demons" /* EKind.demons */] = 1, _j),
    14: (_k = {}, _k["Townsfolk" /* EKind.townsfolk */] = 9, _k["Outsiders" /* EKind.outsiders */] = 1, _k["Minions" /* EKind.minions */] = 3, _k["Demons" /* EKind.demons */] = 1, _k),
    15: (_l = {}, _l["Townsfolk" /* EKind.townsfolk */] = 9, _l["Outsiders" /* EKind.outsiders */] = 2, _l["Minions" /* EKind.minions */] = 3, _l["Demons" /* EKind.demons */] = 1, _l),
};
