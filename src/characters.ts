import {
    BecomeDemon, CheckImp, ChooseMaster, DigKnowCharacter, DrunkAbility, Excute, Guard, Kill,
    KnowAbsent, KnowEvilAround, KnowMinions, KnowOutsiders, KnowSeat, KnowTownsfolk, Peep, Poison,
    Scapegoat, Slay, Transform, WakenKnowCharacter
} from './abilities';

/// 洗衣妇
export const Washerwoman: BCT.TCharacter = {
    key: "Washerwoman",
    kind: "Townsfolk",
    abilities: [KnowTownsfolk]
}
/// 图书管理员
export const Librarian: BCT.TCharacter = {
    key: "Librarian",
    kind: "Townsfolk",
    abilities: [KnowOutsiders]
}
/// 调查员
export const Investigator: BCT.TCharacter = {
    key: "Investigator",
    kind: "Townsfolk",
    abilities: [KnowMinions]
}
/// 厨师
export const Chef: BCT.TCharacter = {
    key: "Chef",
    kind: "Townsfolk",
    abilities: [KnowSeat]
}
/// 共情者
export const Empath: BCT.TCharacter = {
    key: "Empath",
    kind: "Townsfolk",
    abilities: [KnowEvilAround]
}
/// 占卜师
export const FortuneTeller: BCT.TCharacter = {
    key: "Fortuneteller",
    kind: "Townsfolk",
    abilities: [CheckImp]
}
/// 掘墓人
export const Undertaker: BCT.TCharacter = {
    key: "Undertaker",
    kind: "Townsfolk",
    abilities: [DigKnowCharacter]
}
/// 僧侣
export const Monk: BCT.TCharacter = {
    key: "Monk",
    kind: "Townsfolk",
    abilities: [Guard]
}
/// 守鸦人
export const Ravenkeeper: BCT.TCharacter = {
    key: "Ravenkeeper",
    kind: "Townsfolk",
    abilities: [WakenKnowCharacter]
}
/// 圣女
export const Virgin: BCT.TCharacter = {
    key: "Virgin",
    kind: "Townsfolk",
    abilities: [Excute]
}
/// 杀手
export const Slayer: BCT.TCharacter = {
    key: "Slayer",
    kind: "Townsfolk",
    abilities: [Slay]
}
/// 士兵
export const Soldier: BCT.TCharacter = {
    key: "Soldier",
    kind: "Townsfolk",
    abilities: []
}
/// 市长
export const Mayor: BCT.TCharacter = {
    key: "Mayor",
    kind: "Townsfolk",
    abilities: [Scapegoat]
}
/// 管家
export const Butler: BCT.TCharacter = {
    key: "Butler",
    kind: "Outsiders",
    abilities: [ChooseMaster]
}
/// 酒鬼
export const Drunk: BCT.TCharacter = {
    key: "Drunk",
    kind: "Outsiders",
    abilities: [DrunkAbility]
}
/// 隐士
export const Recluse: BCT.TCharacter = {
    key: "Recluse",
    kind: "Outsiders",
    abilities: []
}
/// 圣徒
export const Saint: BCT.TCharacter = {
    key: "Saint",
    kind: "Outsiders",
    abilities: []
}
/// 下毒者
export const Poisoner: BCT.TCharacter = {
    key: "Poisoner",
    kind: "Minions",
    abilities: [Poison]
}
/// 间谍
export const Spy: BCT.TCharacter = {
    key: "Spy",
    kind: "Minions",
    abilities: [Peep]
}
/// 猩红女巫
export const ScarletWoman: BCT.TCharacter = {
    key: "Scarletwoman",
    kind: "Minions",
    abilities: [BecomeDemon]
}
/// 男爵
export const Baron: BCT.TCharacter = {
    key: "Baron",
    kind: "Minions",
    abilities: []
}
/// 小恶魔
export const Imp: BCT.TCharacter = {
    key: "Imp",
    kind: "Demons",
    abilities: [KnowAbsent, Kill, Transform]
}

/// 祖母
export const Grandmother: BCT.TCharacter = {
    key: "Grandmother",
    kind: "Townsfolk",
    abilities: []
}
/// 水手
export const Sailor: BCT.TCharacter = {
    key: "Sailor",
    kind: "Townsfolk",
    abilities: []
}
/// 侍女
export const Chambermaid: BCT.TCharacter = {
    key: "Chambermaid",
    kind: "Townsfolk",
    abilities: []
}
/// 驱魔人
export const Exorcist: BCT.TCharacter = {
    key: "Exorcist",
    kind: "Townsfolk",
    abilities: []
}
/// 旅店老板
export const Innkeeper: BCT.TCharacter = {
    key: "Innkeeper",
    kind: "Townsfolk",
    abilities: []
}
/// 赌徒
export const Gambler: BCT.TCharacter = {
    key: "Gambler",
    kind: "Townsfolk",
    abilities: []
}
/// 造谣者
export const Gossip: BCT.TCharacter = {
    key: "Gossip",
    kind: "Townsfolk",
    abilities: []
}
/// 侍臣
export const Courtier: BCT.TCharacter = {
    key: "Courtier",
    kind: "Townsfolk",
    abilities: []
}
/// 教授
export const Professor: BCT.TCharacter = {
    key: "Professor",
    kind: "Townsfolk",
    abilities: []
}
/// 吟游诗人
export const Minstrel: BCT.TCharacter = {
    key: "Minstrel",
    kind: "Townsfolk",
    abilities: []
}
/// 茶艺师
export const Tealady: BCT.TCharacter = {
    key: "Tealady",
    kind: "Townsfolk",
    abilities: []
}
/// 和平主义者
export const Pacifist: BCT.TCharacter = {
    key: "Pacifist",
    kind: "Townsfolk",
    abilities: []
}
/// 弄臣
export const Fool: BCT.TCharacter = {
    key: "Fool",
    kind: "Townsfolk",
    abilities: []
}
/// 修补匠
export const Tinker: BCT.TCharacter = {
    key: "Tinker",
    kind: "Outsiders",
    abilities: []
}
/// 月之子
export const Moonchild: BCT.TCharacter = {
    key: "Moonchild",
    kind: "Outsiders",
    abilities: []
}
/// 莽夫
export const Goon: BCT.TCharacter = {
    key: "Goon",
    kind: "Outsiders",
    abilities: []
}
/// 疯子
export const Lunatic: BCT.TCharacter = {
    key: "Lunatic",
    kind: "Outsiders",
    abilities: []
}
/// 教父
export const Godfather: BCT.TCharacter = {
    key: "Godfather",
    kind: "Minions",
    abilities: []
}
/// 魔鬼代言人
export const Devilsadvocate: BCT.TCharacter = {
    key: "Devilsadvocate",
    kind: "Minions",
    abilities: []
}
/// 刺客
export const Assassin: BCT.TCharacter = {
    key: "Assassin",
    kind: "Minions",
    abilities: []
}
/// 主谋
export const Mastermind: BCT.TCharacter = {
    key: "Mastermind",
    kind: "Minions",
    abilities: []
}
/// 僵怖
export const Zombuul: BCT.TCharacter = {
    key: "Zombuul",
    kind: "Demons",
    abilities: []
}
/// 普卡
export const Pukka: BCT.TCharacter = {
    key: "Pukka",
    kind: "Demons",
    abilities: []
}
/// 沙巴洛斯
export const Shabaloth: BCT.TCharacter = {
    key: "Shabaloth",
    kind: "Demons",
    abilities: []
}
/// 珀
export const Po: BCT.TCharacter = {
    key: "Po",
    kind: "Demons",
    abilities: []
}

/// 钟表匠
export const Clockmaker: BCT.TCharacter = {
    key: "Clockmaker",
    kind: "Townsfolk",
    abilities: []
}
/// 筑梦师
export const Dreamer: BCT.TCharacter = {
    key: "Dreamer",
    kind: "Townsfolk",
    abilities: []
}
/// 舞蛇人
export const Snakecharmer: BCT.TCharacter = {
    key: "Snakecharmer",
    kind: "Townsfolk",
    abilities: []
}
/// 数学家
export const Mathematician: BCT.TCharacter = {
    key: "Mathematician",
    kind: "Townsfolk",
    abilities: []
}
/// 卖花女孩
export const Flowergirl: BCT.TCharacter = {
    key: "Flowergirl",
    kind: "Townsfolk",
    abilities: []
}
/// 城镇公告员
export const Towncrier: BCT.TCharacter = {
    key: "Towncrier",
    kind: "Townsfolk",
    abilities: []
}
/// 神谕者
export const Oracle: BCT.TCharacter = {
    key: "Oracle",
    kind: "Townsfolk",
    abilities: []
}
/// 博学者
export const Savant: BCT.TCharacter = {
    key: "Savant",
    kind: "Townsfolk",
    abilities: []
}
/// 女裁缝
export const Seamstress: BCT.TCharacter = {
    key: "Seamstress",
    kind: "Townsfolk",
    abilities: []
}
/// 哲学家
export const Philosopher: BCT.TCharacter = {
    key: "Philosopher",
    kind: "Townsfolk",
    abilities: []
}
/// 艺术家
export const Artist: BCT.TCharacter = {
    key: "Artist",
    kind: "Townsfolk",
    abilities: []
}
/// 杂耍艺人
export const Juggler: BCT.TCharacter = {
    key: "Juggler",
    kind: "Townsfolk",
    abilities: []
}
/// 贤者
export const Sage: BCT.TCharacter = {
    key: "Sage",
    kind: "Townsfolk",
    abilities: []
}
/// 畸形秀演员
export const Mutant: BCT.TCharacter = {
    key: "Mutant",
    kind: "Outsiders",
    abilities: []
}
/// 心上人
export const Sweetheart: BCT.TCharacter = {
    key: "Sweetheart",
    kind: "Outsiders",
    abilities: []
}
/// 理发师
export const Barber: BCT.TCharacter = {
    key: "Barber",
    kind: "Outsiders",
    abilities: []
}
/// 呆瓜
export const Klutz: BCT.TCharacter = {
    key: "Klutz",
    kind: "Outsiders",
    abilities: []
}
/// 镜像双子
export const Eviltwin: BCT.TCharacter = {
    key: "Eviltwin",
    kind: "Minions",
    abilities: []
}
/// 女巫
export const Witch: BCT.TCharacter = {
    key: "Witch",
    kind: "Minions",
    abilities: []
}
/// 洗脑师
export const Cerenovus: BCT.TCharacter = {
    key: "Cerenovus",
    kind: "Minions",
    abilities: []
}
/// 麻脸巫婆
export const Pithag: BCT.TCharacter = {
    key: "Pithag",
    kind: "Minions",
    abilities: []
}
/// 方古
export const Fanggu: BCT.TCharacter = {
    key: "Fanggu",
    kind: "Demons",
    abilities: []
}
/// 亡骨魔
export const Vigormortis: BCT.TCharacter = {
    key: "Vigormortis",
    kind: "Demons",
    abilities: []
}
/// 诺-达鲺
export const Nodashii: BCT.TCharacter = {
    key: "Nodashii",
    kind: "Demons",
    abilities: []
}
/// 涡流
export const Vortox: BCT.TCharacter = {
    key: "Vortox",
    kind: "Demons",
    abilities: []
}

export const All = [Washerwoman, Librarian, Investigator, Chef, Empath, FortuneTeller, Undertaker, Monk, Ravenkeeper, Virgin, Slayer, Soldier, Mayor, Butler, Drunk, Recluse, Saint, Poisoner, Spy, ScarletWoman, Baron, Imp
    , Grandmother, Sailor, Chambermaid, Exorcist, Innkeeper, Gambler, Gossip, Courtier, Professor, Minstrel, Tealady, Pacifist, Fool, Tinker, Moonchild, Goon, Lunatic, Godfather, Devilsadvocate, Assassin, Mastermind, Zombuul, Pukka, Shabaloth, Po
    , Clockmaker, Dreamer, Snakecharmer, Mathematician, Flowergirl, Towncrier, Oracle, Savant, Seamstress, Philosopher, Artist, Juggler, Sage, Mutant, Sweetheart, Barber, Klutz, Eviltwin, Witch, Cerenovus, Pithag, Fanggu, Vigormortis, Nodashii, Vortox];

export const CharacterForKey = (key: BCT.ECharacterKey): BCT.TCharacter => All.find(c => c.key === key)!
