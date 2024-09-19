import { isAlivePlayer } from '../common';

export const AliveAtNight = (context: BCT.TContext) => isAlivePlayer(context.player) && context.time == "night"
export const FirstNight = (context: BCT.TContext) => context.turn == 1 && context.time == "night"