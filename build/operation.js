"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperation = void 0;
function CreateOperation(player, skill) {
    return {
        player: player,
        payloadKey: skill.payloadKey,
        skill: skill
    };
}
exports.CreateOperation = CreateOperation;
