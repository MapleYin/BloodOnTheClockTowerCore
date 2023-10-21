"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperation = void 0;
var CreateOperation = function (skill) {
    return {
        name: skill.key,
        skill: skill
    };
};
exports.CreateOperation = CreateOperation;
