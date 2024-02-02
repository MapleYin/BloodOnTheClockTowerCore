import * as Source from "./source/icon"
import { zh as characterLocals } from "./locals/character"
import { BecomeImp, CheckImp, ChooseMaster, DigKnowCharacter, Guard, Kill, KnowAbsent, KnowEvilAround, KnowMinions, KnowOutsiders, KnowSeat, KnowTownsfolk, Peep, Poison, Scapegoat, Tramsform, WakenKnowCharacter } from "./skill"

const Character = (key: string, kind: EKind, icon: string, abilities: ISkill[] = []): ICharacter => {
    return {
        key,
        name: characterLocals[key].name,
        icon,
        skill: characterLocals[key].skill,
        kind,
        abilities
    }
}

export const KindName: Record<EKind, string> = {
    Townsfolk: "村民",
    Outsiders: "外来者",
    Minions: "爪牙",
    Demons: "恶魔"
}

/// 洗衣妇
export const Washerwoman = Character("Washerwoman", "Townsfolk", Source.Washerwoman, [KnowTownsfolk])
/// 图书管理员
export const Librarian = Character("Librarian", "Townsfolk", Source.Librarian, [KnowOutsiders])
/// 调查员
export const Investigator = Character("Investigator", "Townsfolk", Source.Investigator, [KnowMinions])
/// 厨师
export const Chef = Character("Chef", "Townsfolk", Source.Chef, [KnowSeat])
/// 共情者
export const Empath = Character("Empath", "Townsfolk", Source.Empath, [KnowEvilAround])
/// 占卜师
export const FortuneTeller = Character("Fortuneteller", "Townsfolk", Source.Fortuneteller, [CheckImp])
/// 掘墓人
export const Undertaker = Character("Undertaker", "Townsfolk", Source.Undertaker, [DigKnowCharacter])
/// 僧侣
export const Monk = Character("Monk", "Townsfolk", Source.Monk, [Guard])
/// 守鸦人
export const Ravenkeeper = Character("Ravenkeeper", "Townsfolk", Source.Ravenkeeper, [WakenKnowCharacter])
/// 圣女
export const Virgin = Character("Virgin", "Townsfolk", Source.Virgin)
/// 杀手
export const Slayer = Character("Slayer", "Townsfolk", Source.Slayer)
/// 士兵
export const Soldier = Character("Soldier", "Townsfolk", Source.Soldier)
/// 市长
export const Mayor = Character("Mayor", "Townsfolk", Source.Mayor, [Scapegoat])
/// 管家
export const Butler = Character("Butler", "Outsiders", Source.Butler, [ChooseMaster])
/// 酒鬼
export const Drunk = Character("Drunk", "Outsiders", Source.Drunk)
/// 隐士
export const Recluse = Character("Recluse", "Outsiders", Source.Recluse)
/// 圣徒
export const Saint = Character("Saint", "Outsiders", Source.Saint)
/// 下毒者
export const Poisoner = Character("Poisoner", "Minions", Source.Poisoner, [Poison])
/// 间谍
export const Spy = Character("Spy", "Minions", Source.Spy, [Peep])
/// 猩红女巫
export const ScarletWoman = Character("Scarletwoman", "Minions", Source.Scarletwoman, [BecomeImp])
/// 男爵
export const Baron = Character("Baron", "Minions", Source.Baron)
/// 小恶魔
export const Imp = Character("Imp", "Demons", Source.Imp, [Kill, Tramsform, KnowAbsent])

/// 祖母
export const Grandmother = Character("Grandmother", "Townsfolk", Source.Grandmother)
/// 水手
export const Sailor = Character("Sailor", "Townsfolk", Source.Sailor)
/// 侍女
export const Chambermaid = Character("Chambermaid", "Townsfolk", Source.Chambermaid)
/// 驱魔人
export const Exorcist = Character("Exorcist", "Townsfolk", Source.Exorcist)
/// 旅店老板
export const Innkeeper = Character("Innkeeper", "Townsfolk", Source.Innkeeper)
/// 赌徒
export const Gambler = Character("Gambler", "Townsfolk", Source.Gambler)
/// 造谣者
export const Gossip = Character("Gossip", "Townsfolk", Source.Gossip)
/// 侍臣
export const Courtier = Character("Courtier", "Townsfolk", Source.Courtier)
/// 教授
export const Professor = Character("Professor", "Townsfolk", Source.Professor)
/// 吟游诗人
export const Minstrel = Character("Minstrel", "Townsfolk", Source.Minstrel)
/// 茶艺师
export const Tealady = Character("Tealady", "Townsfolk", Source.Tealady)
/// 和平主义者
export const Pacifist = Character("Pacifist", "Townsfolk", Source.Pacifist)
/// 弄臣
export const Fool = Character("Fool", "Townsfolk", Source.Fool)
/// 修补匠
export const Tinker = Character("Tinker", "Outsiders", Source.Tinker)
/// 月之子
export const Moonchild = Character("Moonchild", "Outsiders", Source.Moonchild)
/// 莽夫
export const Goon = Character("Goon", "Outsiders", Source.Goon)
/// 疯子
export const Lunatic = Character("Lunatic", "Outsiders", Source.Lunatic)
/// 教父
export const Godfather = Character("Godfather", "Minions", Source.Godfather)
/// 魔鬼代言人
export const Devilsadvocate = Character("Devilsadvocate", "Minions", Source.Devilsadvocate)
/// 刺客
export const Assassin = Character("Assassin", "Minions", Source.Assassin)
/// 主谋
export const Mastermind = Character("Mastermind", "Minions", Source.Mastermind)
/// 僵怖
export const Zombuul = Character("Zombuul", "Demons", Source.Zombuul)
/// 普卡
export const Pukka = Character("Pukka", "Demons", Source.Pukka)
/// 沙巴洛斯
export const Shabaloth = Character("Shabaloth", "Demons", Source.Shabaloth)
/// 珀
export const Po = Character("Po", "Demons", Source.Po)

/// 钟表匠
export const Clockmaker = Character("Clockmaker", "Townsfolk", Source.Clockmaker)
/// 筑梦师
export const Dreamer = Character("Dreamer", "Townsfolk", Source.Dreamer)
/// 舞蛇人
export const Snakecharmer = Character("Snakecharmer", "Townsfolk", Source.Snakecharmer)
/// 数学家
export const Mathematician = Character("Mathematician", "Townsfolk", Source.Mathematician)
/// 卖花女孩
export const Flowergirl = Character("Flowergirl", "Townsfolk", Source.Flowergirl)
/// 城镇公告员
export const Towncrier = Character("Towncrier", "Townsfolk", Source.Towncrier)
/// 神谕者
export const Oracle = Character("Oracle", "Townsfolk", Source.Oracle)
/// 博学者
export const Savant = Character("Savant", "Townsfolk", Source.Savant)
/// 女裁缝
export const Seamstress = Character("Seamstress", "Townsfolk", Source.Seamstress)
/// 哲学家
export const Philosopher = Character("Philosopher", "Townsfolk", Source.Philosopher)
/// 艺术家
export const Artist = Character("Artist", "Townsfolk", Source.Artist)
/// 杂耍艺人
export const Juggler = Character("Juggler", "Townsfolk", Source.Juggler)
/// 贤者
export const Sage = Character("Sage", "Townsfolk", Source.Sage)
/// 畸形秀演员
export const Mutant = Character("Mutant", "Outsiders", Source.Mutant)
/// 心上人
export const Sweetheart = Character("Sweetheart", "Outsiders", Source.Sweetheart)
/// 理发师
export const Barber = Character("Barber", "Outsiders", Source.Barber)
/// 呆瓜
export const Klutz = Character("Klutz", "Outsiders", Source.Klutz)
/// 镜像双子
export const Eviltwin = Character("Eviltwin", "Minions", Source.Eviltwin)
/// 女巫
export const Witch = Character("Witch", "Minions", Source.Witch)
/// 洗脑师
export const Cerenovus = Character("Cerenovus", "Minions", Source.Cerenovus)
/// 麻脸巫婆
export const Pithag = Character("Pithag", "Minions", Source.Pithag)
/// 方古
export const Fanggu = Character("Fanggu", "Demons", Source.Fanggu)
/// 亡骨魔
export const Vigormortis = Character("Vigormortis", "Demons", Source.Vigormortis)
/// 诺-达鲺
export const Nodashii = Character("Nodashii", "Demons", Source.Nodashii)
/// 涡流
export const Vortox = Character("Vortox", "Demons", Source.Vortox)

const All = [Washerwoman, Librarian, Investigator, Chef, Empath, FortuneTeller, Undertaker, Monk, Ravenkeeper, Virgin, Slayer, Soldier, Mayor, Butler, Drunk, Recluse, Saint, Poisoner, Spy, ScarletWoman, Baron, Imp
    , Grandmother, Sailor, Chambermaid, Exorcist, Innkeeper, Gambler, Gossip, Courtier, Professor, Minstrel, Tealady, Pacifist, Fool, Tinker, Moonchild, Goon, Lunatic, Godfather, Devilsadvocate, Assassin, Mastermind, Zombuul, Pukka, Shabaloth, Po
    , Clockmaker, Dreamer, Snakecharmer, Mathematician, Flowergirl, Towncrier, Oracle, Savant, Seamstress, Philosopher, Artist, Juggler, Sage, Mutant, Sweetheart, Barber, Klutz, Eviltwin, Witch, Cerenovus, Pithag, Fanggu, Vigormortis, Nodashii, Vortox];

export const CharacterForKey = (key: string): ICharacter | undefined => All.find(c => c.key === key)
