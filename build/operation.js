"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectOperation = exports.CreateOperation = void 0;
var skill_1 = require("./skill");
function CreateOperation(seat, skill) {
    var payload = undefined;
    if ("character" in skill.payloadOptions && skill.payloadOptions.character.static) {
        payload = {
            character: skill.payloadOptions.character.static
        };
    }
    return {
        seat: seat,
        payloadKey: skill.payloadKey,
        skill: skill,
        payload: payload,
        projected: false
    };
}
exports.CreateOperation = CreateOperation;
var EffectOperation = function (operation, players) {
    if (!operation.payload) {
        return players;
    }
    var skill = (0, skill_1.SkillForKey)(operation.skill.key);
    skill.effect(operation.seat, operation.payload, players);
};
exports.EffectOperation = EffectOperation;
