"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    avatar;
    character;
    seat;
    get alive() {
        return this.isKilled || this.isExecuted || this.isSlew;
    }
    forbiddenVote;
    isDrunk;
    isPoisoned;
    isEnemy;
    isKilled;
    isExecuted;
    isOnGallows;
    isMaster;
    isSlew;
    isGuarded;
    nominatable;
    canBeNominated;
}
exports.Player = Player;
