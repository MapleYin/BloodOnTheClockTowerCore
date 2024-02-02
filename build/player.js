"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStatus = exports.isDeadPlayer = void 0;
var isDeadPlayer = function (player) {
    return player.isKilled || player.isSlew || player.isExecuted || player.isScapegoat || false;
};
exports.isDeadPlayer = isDeadPlayer;
var clearStatus = function (player) {
    player.canNotBeNominated = false;
    player.nominationForbiden = false;
    player.isGuarded = false;
    player.isMaster = false;
    player.isOnGallows = false;
    player.isPoisoned = false;
    return player;
};
exports.clearStatus = clearStatus;
