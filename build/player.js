"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player() {
    }
    Object.defineProperty(Player.prototype, "alive", {
        get: function () {
            return this.isKilled || this.isExecuted || this.isSlew;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}());
exports.Player = Player;
