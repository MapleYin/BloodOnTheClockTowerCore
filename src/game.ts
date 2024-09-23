import { Excute, ExcuteByRack, getAbility, Nomination } from './abilities';
import { copyPlayers, isDeadPlayer } from './common';
import {
    createOperation, nextTimeline, setupTimelines, timelinesWithPlayerStatus, updatePayload
} from './timeline';

export class Game implements BCT.TGame {

    players: BCT.TPlayer[]
    timelines: BCT.TTimeline[] = []
    options?: { enemy?: string, drunk?: string }

    private orderedAbilities: string[]

    constructor(players: BCT.TPlayer[], abilityOrder: string[], options?: { enemy?: string, drunk?: string }) {
        this.players = players
        this.orderedAbilities = abilityOrder
        this.options = options
    }

    nextTimeline(): BCT.TTimeline {
        nextTimeline(this.players, this.timelines, this.orderedAbilities, this.options)
        return this.timelines[this.timelines.length - 1]
    }

    createOperation(abilityKey: string, effector: number, payload: Record<string, any>) {
        createOperation(abilityKey, effector, payload, this.timelines[this.timelines.length - 1])
        setupTimelines(this.timelines, this.players, this.orderedAbilities.flatMap(key => getAbility(key) || []), this.options)
    }

    updatePayload(timelineIdx: number, operationIdx: number, payload: Record<string, any>) {
        updatePayload(this.timelines[timelineIdx], operationIdx, payload)
        setupTimelines(this.timelines, this.players, this.orderedAbilities.flatMap(key => getAbility(key) || []), this.options)
    }

    timelinesWithPlayerStatus() {
        return timelinesWithPlayerStatus(this.timelines, this.players, this.options)
    }
}