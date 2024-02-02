"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectOperation = exports.NewOperation = void 0;
var skill_1 = require("./skill");
var NewOperation = function (seat, players, skill) {
    return {
        seat: seat,
        skill: skill,
        players: players,
        payloadKey: skill.type,
        payload: undefined,
        manual: true
    };
};
exports.NewOperation = NewOperation;
var EffectOperation = function (operation, players) {
    operation.players = players.map(function (player) { return (__assign({}, player)); });
    if (!operation.payload) {
        return;
    }
    var skill = (0, skill_1.SkillForKey)(operation.skill.key);
    skill.effect && skill.effect(operation.seat, operation.payload, players);
};
exports.EffectOperation = EffectOperation;
