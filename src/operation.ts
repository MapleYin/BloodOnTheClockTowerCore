import { SkillForKey } from "./skill";
export const NewOperation = (seat: number, players: IPlayer[], skill: ISkill): IOperation => {
    return {
        seat,
        skill,
        players,
        payloadKey: skill.type,
        payload: undefined,
        manual: true
    }
}

export const EffectOperation = (operation: IOperation, players: IPlayer[]) => {
    operation.players = players.map(player => ({ ...player }));
    if (!operation.payload) {
        return
    }
    const skill = SkillForKey(operation.skill.key) as typeof operation.skill
    skill.effect && skill.effect(operation.seat, operation.payload, players)
}