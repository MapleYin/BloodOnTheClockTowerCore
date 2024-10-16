import { CharacterForKey } from '../../characters';
import { isDeadPlayer } from '../../common';

export const Transform: BCT.TAbility = {
    key: "Transform",
    validate: context => {
        /// 恶魔自杀
        const demonDead = isDeadPlayer(context.player)
        const lastTimeline = context.timelines.find(timeline => timeline.time === context.time && timeline.turn === context.turn)
        const killOp = lastTimeline?.operations.find(op => op.abilityKey === "Kill")
        if (!demonDead || !killOp || killOp.payload?.target !== context.player.position) {
            return false
        }
        const transformOp = lastTimeline?.operations.find(op => op.abilityKey === "BecomeDemon")
        if (transformOp) {
            return false
        }
        return true
    },
    effect: (operation, players) => {
        const player = players[operation.payload?.target]
        if (player) {
            player.character = CharacterForKey("Imp")
        }
    }
}