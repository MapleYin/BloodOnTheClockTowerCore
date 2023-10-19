import * as Source from "./source/icon"
import { zh as characterLocals } from "./locals/character"

export enum EKind {
    townsfolk = "Townsfolk",
    outsiders = "Outsiders",
    minions = "Minions",
    demons = "Demons"
}
 
export interface ICharacter {
    readonly key: string
    readonly name: string
    readonly icon: string
    readonly skill: string
    readonly kind: EKind
}

class Character implements ICharacter {

    readonly key: string
    readonly kind: EKind
    readonly icon: string

    
    public get name() : string {
        return characterLocals[this.key].name
    }

    public get skill() : string {
        return characterLocals[this.key].skill
    }
    

    constructor(key: string, kind: EKind, icon: string) {
        this.key = key
        this.kind = kind
        this.icon = icon
    }
}


/// 洗衣妇
export const Washerwoman = new Character("Washerwoman", EKind.townsfolk, Source.Washerwoman)
/// 图书管理员
export const Librarian = new Character("Librarian", EKind.townsfolk, Source.Librarian)
/// 调查员
export const Investigator = new Character("Investigator", EKind.townsfolk, Source.Investigator)
/// 厨师
export const Chef = new Character("Chef", EKind.townsfolk, Source.Chef)
/// 共情者
export const Empath = new Character("Empath", EKind.townsfolk, Source.Empath)
/// 占卜师
export const FortuneTeller = new Character("Fortuneteller", EKind.townsfolk, Source.Fortuneteller)
/// 掘墓人
export const Undertaker = new Character("Undertaker", EKind.townsfolk, Source.Undertaker)
/// 僧侣
export const Monk = new Character("Monk", EKind.townsfolk, Source.Monk)
/// 守鸦人
export const Ravenkeeper = new Character("Ravenkeeper", EKind.townsfolk, Source.Ravenkeeper)
/// 圣女
export const Virgin = new Character("Virgin", EKind.townsfolk, Source.Virgin)
/// 杀手
export const Slayer = new Character("Slayer", EKind.townsfolk, Source.Slayer)
/// 士兵
export const Soldier = new Character("Soldier", EKind.townsfolk, Source.Soldier)
/// 市长
export const Mayor = new Character("Mayor", EKind.townsfolk, Source.Mayor)
/// 管家
export const Butler = new Character("Butler", EKind.outsiders, Source.Butler)
/// 酒鬼
export const Drunk = new Character("Drunk", EKind.outsiders, Source.Drunk)
/// 隐士
export const Recluse = new Character("Recluse", EKind.outsiders, Source.Recluse)
/// 圣徒
export const Saint = new Character("Saint", EKind.outsiders, Source.Saint)
/// 下毒者
export const Poisoner = new Character("Poisoner", EKind.minions, Source.Poisoner)
/// 间谍
export const Spy = new Character("Spy", EKind.minions, Source.Spy)
/// 猩红女巫
export const ScarletWoman = new Character("Scarletwoman", EKind.minions, Source.Scarletwoman)
/// 男爵
export const Baron = new Character("Baron", EKind.minions, Source.Baron)
/// 小恶魔
export const Imp = new Character("Imp", EKind.demons, Source.Imp)

/// 祖母
export const Grandmother = new Character("Grandmother", EKind.townsfolk, Source.Grandmother)
/// 水手
export const Sailor = new Character("Sailor", EKind.townsfolk, Source.Sailor)
/// 侍女
export const Chambermaid = new Character("Chambermaid", EKind.townsfolk, Source.Chambermaid)
/// 驱魔人
export const Exorcist = new Character("Exorcist", EKind.townsfolk, Source.Exorcist)
/// 旅店老板
export const Innkeeper = new Character("Innkeeper", EKind.townsfolk, Source.Innkeeper)
/// 赌徒
export const Gambler = new Character("Gambler", EKind.townsfolk, Source.Gambler)
/// 造谣者
export const Gossip = new Character("Gossip", EKind.townsfolk, Source.Gossip)
/// 侍臣
export const Courtier = new Character("Courtier", EKind.townsfolk, Source.Courtier)
/// 教授
export const Professor = new Character("Professor", EKind.townsfolk, Source.Professor)
/// 吟游诗人
export const Minstrel = new Character("Minstrel", EKind.townsfolk, Source.Minstrel)
/// 茶艺师
export const Tealady = new Character("Tealady", EKind.townsfolk, Source.Tealady)
/// 和平主义者
export const Pacifist = new Character("Pacifist", EKind.townsfolk, Source.Pacifist)
/// 弄臣
export const Fool = new Character("Fool", EKind.townsfolk, Source.Fool)
/// 修补匠
export const Tinker = new Character("Tinker", EKind.outsiders, Source.Tinker)
/// 月之子
export const Moonchild = new Character("Moonchild", EKind.outsiders, Source.Moonchild)
/// 莽夫
export const Goon = new Character("Goon", EKind.outsiders, Source.Goon)
/// 疯子
export const Lunatic = new Character("Lunatic", EKind.outsiders, Source.Lunatic)
/// 教父
export const Godfather = new Character("Godfather", EKind.minions, Source.Godfather)
/// 魔鬼代言人
export const Devilsadvocate = new Character("Devilsadvocate", EKind.minions, Source.Devilsadvocate)
/// 刺客
export const Assassin = new Character("Assassin", EKind.minions, Source.Assassin)
/// 主谋
export const Mastermind = new Character("Mastermind", EKind.minions, Source.Mastermind)
/// 僵怖
export const Zombuul = new Character("Zombuul", EKind.demons, Source.Zombuul)
/// 普卡
export const Pukka = new Character("Pukka", EKind.demons, Source.Pukka)
/// 沙巴洛斯
export const Shabaloth = new Character("Shabaloth", EKind.demons, Source.Shabaloth)
/// 珀
export const Po = new Character("Po", EKind.demons, Source.Po)

/// 钟表匠
export const Clockmaker = new Character("Clockmaker", EKind.townsfolk, Source.Clockmaker)
/// 筑梦师
export const Dreamer = new Character("Dreamer", EKind.townsfolk, Source.Dreamer)
/// 舞蛇人
export const Snakecharmer = new Character("Snakecharmer", EKind.townsfolk, Source.Snakecharmer)
/// 数学家
export const Mathematician = new Character("Mathematician", EKind.townsfolk, Source.Mathematician)
/// 卖花女孩
export const Flowergirl = new Character("Flowergirl", EKind.townsfolk, Source.Flowergirl)
/// 城镇公告员
export const Towncrier = new Character("Towncrier", EKind.townsfolk, Source.Towncrier)
/// 神谕者
export const Oracle = new Character("Oracle", EKind.townsfolk, Source.Oracle)
/// 博学者
export const Savant = new Character("Savant", EKind.townsfolk, Source.Savant)
/// 女裁缝
export const Seamstress = new Character("Seamstress", EKind.townsfolk, Source.Seamstress)
/// 哲学家
export const Philosopher = new Character("Philosopher", EKind.townsfolk, Source.Philosopher)
/// 艺术家
export const Artist = new Character("Artist", EKind.townsfolk, Source.Artist)
/// 杂耍艺人
export const Juggler = new Character("Juggler", EKind.townsfolk, Source.Juggler)
/// 贤者
export const Sage = new Character("Sage", EKind.townsfolk, Source.Sage)
/// 畸形秀演员
export const Mutant = new Character("Mutant", EKind.outsiders, Source.Mutant)
/// 心上人
export const Sweetheart = new Character("Sweetheart", EKind.outsiders, Source.Sweetheart)
/// 理发师
export const Barber = new Character("Barber", EKind.outsiders, Source.Barber)
/// 呆瓜
export const Klutz = new Character("Klutz", EKind.outsiders, Source.Klutz)
/// 镜像双子
export const Eviltwin = new Character("Eviltwin", EKind.minions, Source.Eviltwin)
/// 女巫
export const Witch = new Character("Witch", EKind.minions, Source.Witch)
/// 洗脑师
export const Cerenovus = new Character("Cerenovus", EKind.minions, Source.Cerenovus)
/// 麻脸巫婆
export const Pithag = new Character("Pithag", EKind.minions, Source.Pithag)
/// 方古
export const Fanggu = new Character("Fanggu", EKind.demons, Source.Fanggu)
/// 亡骨魔
export const Vigormortis = new Character("Vigormortis", EKind.demons, Source.Vigormortis)
/// 诺-达鲺
export const Nodashii = new Character("Nodashii", EKind.demons, Source.Nodashii)
/// 涡流
export const Vortox = new Character("Vortox", EKind.demons, Source.Vortox)