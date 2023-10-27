"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupedChatacters = void 0;
var GroupedChatacters = function (characters) {
    var groupMap = characters.reduce(function (previousValue, character) {
        if (character.kind in previousValue) {
            previousValue[character.kind].push(character);
        }
        else {
            previousValue[character.kind] = [character];
        }
        return previousValue;
    }, {});
    var groupedOrder = ["Townsfolk", "Outsiders", "Minions", "Demons"];
    return groupedOrder.map(function (kind) {
        var characters = groupMap[kind];
        if (!characters) {
            return null;
        }
        return {
            kind: kind,
            characters: characters
        };
    }).filter(function (item) { return !!item; });
};
exports.GroupedChatacters = GroupedChatacters;
