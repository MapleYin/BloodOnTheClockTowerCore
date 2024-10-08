import { hasRealAbility, isDeadPlayer } from '../../common';
import { Kill } from '../kill';

export const Scapegoat: BCT.TAbility = {
    key: "Scapegoat",
    validate: (context) => {
        if (isDeadPlayer(context.player) || !hasRealAbility(context.player)) {
            return false
        }
        const lastTimeline = context.timelines.find(timeline => timeline.time === context.time && timeline.turn === context.turn)
        const killOperation = lastTimeline?.operations.find(op => op.abilityKey === Kill.key)
        if (!killOperation || killOperation.payload?.target !== context.player.position) {
            return false
        }
        return true
    },
    effect: (operation, players, timelines) => {
        const killAbility = Kill
        const lastTimeline = timelines.find(timeline => timeline.time === operation.time && timeline.turn === operation.turn)
        const previewKillOperation = lastTimeline?.operations.find(op => op.abilityKey === Kill.key)
        if (!previewKillOperation) {
            return
        }
        const killOperation: BCT.TOperation = {
            ...previewKillOperation,
            payload: {
                target: operation.payload?.target,
                ignoreScapegoat: operation.payload?.target === operation.effector
            }
        }
        killAbility.effect?.(killOperation, players, timelines)
    }
}   