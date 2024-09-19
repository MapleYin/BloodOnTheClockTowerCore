import { isDeadPlayer } from '../../common';

export const Transform: BCT.TAbility = {
    key: "Transform",
    validate: context => {
        /// 恶魔自杀
        const demonDead = isDeadPlayer(context.player)
        const lastTimeline = context.timelines[context.timelines.length - 1]
        const killOp = lastTimeline.operations.find(op => op.abilityKey === "Kill")
        if (!demonDead || !killOp || killOp.payload?.target !== context.player.position || !killOp.payload?.result) {
            return false
        }
        const transformOp = lastTimeline.operations.find(op => op.abilityKey === "BecomeDemon")
        if (transformOp) {
            return false
        }
        return true
    },
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.character = {
                key: "Imp",
                kind: "Demons",
                abilities: ["Kill", "KnowAbsent", "Transform"]
            }
        }
    }
}