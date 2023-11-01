"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperation = void 0;
function CreateOperation(seat, skill) {
    return {
        seat: seat,
        payloadKey: skill.payloadKey,
        skill: skill
    };
}
exports.CreateOperation = CreateOperation;
