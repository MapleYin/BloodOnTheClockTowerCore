"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(obj) {
        this.avatar = obj.avatar || obj.character;
        this.character = obj.character;
        this.seat = obj.seat || 0;
        this.forbiddenVote = obj.forbiddenVote || false;
        this.isDrunk = obj.isDrunk || false;
        this.isPoisoned = obj.isPoisoned || false;
        this.isEnemy = obj.isEnemy || false;
        this.isKilled = obj.isKilled || false;
        this.isExecuted = obj.isExecuted || false;
        this.isOnGallows = obj.isOnGallows || false;
        this.isMaster = obj.isMaster || false;
        this.isSlew = obj.isSlew || false;
        this.isGuarded = obj.isGuarded || false;
        this.nominatable = obj.nominatable || true;
        this.canBeNominated = obj.canBeNominated || true;
        this.isScapegoat = obj.isScapegoat || false;
    }
    Object.defineProperty(Player.prototype, "dead", {
        get: function () {
            return this.isKilled || this.isExecuted || this.isSlew;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}());
exports.Player = Player;
