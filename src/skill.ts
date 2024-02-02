import { CharacterForKey } from "./character"
import { isDeadPlayer } from "./player"


const firstNight = (context: IContext) => {
    return context.timeline.time === "night" && context.timeline.turn === 1
}

const otherNight = (context: IContext) => {
    return context.timeline.time === "night" && context.timeline.turn > 1
}

const isAlive = (context: IContext) => {
    return !isDeadPlayer(context.player)
}

const isAliveAtNight = (context: IContext) => {
    return isAlive(context) && context.timeline.time === "night"
}

const CreateSkill = <T extends PayloadKey>(params: { key: string, description: string, valid: (context: IContext) => boolean, type: T, options: PayloadOptionDefind[T] & Payload.Options.Output & Payload.Options.Display, effect?: (seat: number, payload: PayloadDefind[T], players: IPlayer[]) => void }): ISkill => {
    return params
}

export const KnowAbsent = CreateSkill({
    key: "KnowAbsent",
    description: "得知三个不在场身份",

    valid: firstNight,

    type: "CS",
    options: {
        "character": {
            "kinds": ["Townsfolk", "Outsiders"],
            "exist": "notInGame",
            "range": { "min": 3, "max": 3 }
        },
        "output": { "disabled": true }
    }
})

export const Tramsform = CreateSkill({
    key: "Tramsform",
    description: "选择1个爪牙变成小恶魔",

    valid: context => {
        if (!isDeadPlayer(context.player)) {
            return false
        }
        const timeline = context.timeline
        if (timeline.time === "day") {
            return false
        }
        const operation = timeline.operations.find(operation => operation.skill.key === Kill.key)
        if (!operation ||
            operation.payloadKey != "P_R" ||
            !operation.payload ||
            !operation.payload.result ||
            operation.payload.seat != context.player.seat) {
            return false
        }

        return true
    },

    effect: (seat, payload, players) => {
        players[payload.seat - 1].avatar = "Imp"
    },

    type: "P",
    options: {
        "player": {
            "kinds": ["Minions"]
        },
        "output": { "disabled": true }
    }
})

export const Kill = CreateSkill({
    key: "Kill",
    description: "选择1个目标，他死亡",

    valid: context => !isDeadPlayer(context.player) && otherNight(context),

    effect: (seat, payload, players) => {
        players[payload.seat - 1].isKilled = payload.result
    },

    type: "P_R",
    options: {
        "player": {},
        "result": {
            "display": ["未能杀害", "杀害成功"],
            "prompt": "杀害是否生效",
            "subPrompt": "注：未生效情况可能有，士兵、市长、僧侣技能等",
            "default": true
        },
        "output": { "disabled": true }
    }

})

export const BecomeImp = CreateSkill({
    key: "BecomeImp",
    description: "化身为恶魔",

    valid: context => {
        if (isDeadPlayer(context.player)) {
            return false
        }
        const timeline = context.timeline
        const aliveDemons = timeline.players.filter(player => CharacterForKey(player.avatar)?.kind === "Demons" && !isDeadPlayer(player))
        const deadDemons = context.players.filter(player => CharacterForKey(player.avatar)?.kind === "Demons" && isDeadPlayer(player))
        const demonsDeadToday = deadDemons.find(dead => aliveDemons.findIndex(alive => alive.seat === dead.seat) !== -1)
        const numberOfAlivePlayer = context.players.filter(player => !isDeadPlayer(player)).length
        return !!demonsDeadToday && numberOfAlivePlayer >= 4
    },

    effect: (seat, payload, players) => {
        const timeline = payload
        const aliveDemons = timeline.players.filter(player => CharacterForKey(player.avatar)?.kind === "Demons" && !isDeadPlayer(player))
        const deadDemons = players.filter(player => CharacterForKey(player.avatar)?.kind === "Demons" && isDeadPlayer(player))
        const demonsDeadToday = deadDemons.find(dead => aliveDemons.findIndex(alive => alive.seat === dead.seat) !== -1)
        if (demonsDeadToday) {
            players[seat - 1].avatar = demonsDeadToday.avatar
        }
    },

    type: "A",
    options: {
        "output": { "disabled": true }
    }
})

export const Peep = CreateSkill({
    key: "Peep",
    description: "得知所有信息",

    valid: isAliveAtNight,

    type: "T",
    options: {},
})

export const Poison = CreateSkill({
    key: "Poison",
    description: "选择1名玩家，他中毒",

    valid: isAliveAtNight,

    effect: (_, payload, players) => {
        players[payload.seat - 1].isPoisoned = true
    },

    type: "P",
    options: {
        "player": {
        },
        "output": { "disabled": true }
    }
})

export const ChooseMaster = CreateSkill({
    key: "ChooseMaster",
    description: "选择1名玩家作为主人",

    valid: isAliveAtNight,

    effect: (_, payload, players) => {
        players[payload.seat - 1].isMaster = true
    },

    type: "P",
    options: {
        "player": {},
        "output": { "disabled": true }
    },

})

export const Scapegoat = CreateSkill({
    key: "Scapegoat",
    description: "选择1名玩家代替市长死亡",

    /// 即将死亡
    valid: _ => true,

    effect: (_, payload, players) => {
        players[payload.seat - 1].isScapegoat = true
    },

    type: "P",
    options: {
        "player": {},
        "output": { "disabled": true }
    }
})

export const WakenKnowCharacter = CreateSkill({
    key: "WakenKnowCharacter",
    description: "选择1名玩家，得知他的身份",

    valid: context => {
        const atNight = context.timeline.time === "night"
        const beforeNightPlayer = context.timeline.players.find(player => player.seat === context.player.seat)
        return atNight && !!beforeNightPlayer && !isDeadPlayer(beforeNightPlayer) && isDeadPlayer(context.player)
    },

    type: "P_C",

    options: {
        "player": {},
        "character": {}
    }
})

export const Guard = CreateSkill({
    key: "Guard",
    description: "选择1名玩家，守护他",

    valid: context => isAliveAtNight(context) && otherNight(context),

    effect: (_, payload, players) => {
        players[payload.seat - 1].isGuarded = payload.result
    },

    type: "P_R",
    options: {
        "player": {},
        "result": {
            "display": ["守护成功", "守护失败"],
            "prompt": "守护是否生效",
            "subPrompt": "注：未生效情况可能是：被毒、是酒鬼",
            "default": true
        },
        "output": { "disabled": true }
    }
})

export const DigKnowCharacter = CreateSkill({
    key: "DigKnowCharacter",
    description: "得知昨天白天被处决玩家的角色",

    valid: context => isAliveAtNight(context) && otherNight(context),

    type: "C",
    options: {
        "character": {},
        "display": {
            "excution": true
        }
    }
})

export const CheckImp = CreateSkill({
    key: "CheckImp",
    description: "选择2个玩家，是否存在恶魔",

    valid: isAliveAtNight,

    type: "PS_R",
    options: {
        "player": {
            "range": { "max": 2, "min": 2 }
        },
        "result": {
            "display": ["无恶魔", "有恶魔"],
            "prompt": "是否存在恶魔"
        }
    }
})

export const KnowEvilAround = CreateSkill({
    key: "KnowEvilAround",
    description: "得知两边邪恶玩家人数",

    valid: isAliveAtNight,

    type: "N",
    options: {
        "range": { "min": 0, "max": 2 },
        "display": { "players": true }
    }
})

export const KnowSeat = CreateSkill({
    key: "KnowSeat",
    description: "得知有多少对邪恶玩家邻座",

    valid: isAliveAtNight,

    type: "N",
    options: {
        "range": { "min": 0, "max": 4 },
        "display": { "players": true }
    }
})

export const KnowMinions = CreateSkill({
    key: "KnowMinions",
    description: "得知2名玩家中1个是某个爪牙",

    valid: firstNight,

    type: "PS_C",
    options: {
        "player": {
            "range": { "min": 2, "max": 2 }
        },
        "character": {
            "kinds": ["Minions"]
        }
    }
})

export const KnowOutsiders = CreateSkill({
    key: "KnowOutsiders",
    description: "得知2名玩家中1个是某个外来者",

    valid: firstNight,

    type: "PS_C",
    options: {
        player: {
            range: { min: 2, max: 2 }
        },
        character: {
            kinds: ["Outsiders"],
            range: { min: 0, max: 1 }
        }
    }
})

export const KnowTownsfolk = CreateSkill({
    key: "KnowTownsfolk",
    description: "得知2名玩家中1个是某个村民",

    valid: firstNight,

    type: "PS_C",
    options: {
        player: {
            range: { min: 2, max: 2 }
        },
        character: {
            kinds: ["Townsfolk"]
        }
    }
})

export const Nomination = CreateSkill({
    key: "Nomination",
    description: "提名玩家",

    valid: _ => true,

    effect: (nominatorSeat, payload, players) => {
        players[nominatorSeat - 1].nominationForbiden = true
        players[payload.seat - 1].canNotBeNominated = true
        players[payload.seat - 1].isOnGallows = payload.result
        /// 死亡角色，如果投票后无法再投票
        players.filter(p => isDeadPlayer(p) && payload.seats.includes(p.seat)).forEach(p => {
            p.forbiddenVote = true
        })
    },

    type: "NM",
    options: {}
})

export const Slay = CreateSkill({
    key: "Slay",
    description: "猎杀",

    valid: _ => true,

    effect: (_, payload, players) => {
        players[payload.seat - 1].isSlew = payload.result
    },

    type: "P_R",
    options: {
        player: {},
        result: {
            display: ["无事发生", "猎杀成功"],
            prompt: "猎杀是否生效"
        }
    }
})

export const Excute = CreateSkill({
    key: "Excute",
    description: "提名圣女被处决",

    valid: _ => true,
    effect: (_, payload, players) => {
        players[payload.seat - 1].isExecuted = true
    },

    type: "P",
    options: {
        player: {}
    }
})

export const ExcuteByRack = CreateSkill({
    key: "ExcuteByRack",
    description: "上处刑架被处决",

    valid: _ => true,

    effect: (_, payload, players) => {
        players[payload.seat - 1].isExecuted = true
    },

    type: "P",
    options: {
        "player": {}
    }
})

export const TimeTick = CreateSkill({
    key: "TimeTick",
    description: "得知恶魔与爪牙最近的距离",
    valid: firstNight,
    type: "N",
    options: {
        "display": {
            "players": true
        }
    }
})

export const DreamADream = CreateSkill({
    key: "DreamADream",
    description: "得知1名玩家是1个善良和1个邪恶角色中1个",
    valid: firstNight,
    type: "P_CS",
    options: {
        "player": {
            range: { min: 1, max: 1 }
        },
        character: {
            range: { min: 2, max: 2 }
        },
        "display": {
            "players": true
        }
    }
})

export const skills = [
    KnowAbsent,
    Tramsform,
    Kill,
    BecomeImp,
    Peep,
    Poison,
    ChooseMaster,
    Scapegoat,
    WakenKnowCharacter,
    Guard,
    DigKnowCharacter,
    CheckImp,
    KnowEvilAround,
    KnowSeat,
    KnowMinions,
    KnowOutsiders,
    KnowTownsfolk,
    Slay,
    Excute,

    Nomination,
    ExcuteByRack,

    TimeTick,
]

export const SkillForKey = (key: string) => skills.find(s => s.key == key)