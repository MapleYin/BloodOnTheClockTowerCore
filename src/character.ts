import * as Source from "./source/icon"
import { zh as characterLocals } from "./locals/character"

export type EKind = "Townsfolk" | "Outsiders" | "Minions" | "Demons"
 
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

    toJSON() {
        return {
            key: this.key,
            name: this.name,
            kind: this.kind,
            icon: this.icon,
            skill: this.skill,
        }
    }
}


/// 洗衣妇
export const Washerwoman = new Character("Washerwoman", "Townsfolk", Source.Washerwoman)
/// 图书管理员
export const Librarian = new Character("Librarian", "Townsfolk", Source.Librarian)
/// 调查员
export const Investigator = new Character("Investigator", "Townsfolk", Source.Investigator)
/// 厨师
export const Chef = new Character("Chef", "Townsfolk", Source.Chef)
/// 共情者
export const Empath = new Character("Empath", "Townsfolk", Source.Empath)
/// 占卜师
export const FortuneTeller = new Character("Fortuneteller", "Townsfolk", Source.Fortuneteller)
/// 掘墓人
export const Undertaker = new Character("Undertaker", "Townsfolk", Source.Undertaker)
/// 僧侣
export const Monk = new Character("Monk", "Townsfolk", Source.Monk)
/// 守鸦人
export const Ravenkeeper = new Character("Ravenkeeper", "Townsfolk", Source.Ravenkeeper)
/// 圣女
export const Virgin = new Character("Virgin", "Townsfolk", Source.Virgin)
/// 杀手
export const Slayer = new Character("Slayer", "Townsfolk", Source.Slayer)
/// 士兵
export const Soldier = new Character("Soldier", "Townsfolk", Source.Soldier)
/// 市长
export const Mayor = new Character("Mayor", "Townsfolk", Source.Mayor)
/// 管家
export const Butler = new Character("Butler", "Outsiders", Source.Butler)
/// 酒鬼
export const Drunk = new Character("Drunk", "Outsiders", Source.Drunk)
/// 隐士
export const Recluse = new Character("Recluse", "Outsiders", Source.Recluse)
/// 圣徒
export const Saint = new Character("Saint", "Outsiders", Source.Saint)
/// 下毒者
export const Poisoner = new Character("Poisoner", "Minions", Source.Poisoner)
/// 间谍
export const Spy = new Character("Spy", "Minions", Source.Spy)
/// 猩红女巫
export const ScarletWoman = new Character("Scarletwoman", "Minions", Source.Scarletwoman)
/// 男爵
export const Baron = new Character("Baron", "Minions", Source.Baron)
/// 小恶魔
export const Imp = new Character("Imp", "Demons", Source.Imp)

/// 祖母
export const Grandmother = new Character("Grandmother", "Townsfolk", Source.Grandmother)
/// 水手
export const Sailor = new Character("Sailor", "Townsfolk", Source.Sailor)
/// 侍女
export const Chambermaid = new Character("Chambermaid", "Townsfolk", Source.Chambermaid)
/// 驱魔人
export const Exorcist = new Character("Exorcist", "Townsfolk", Source.Exorcist)
/// 旅店老板
export const Innkeeper = new Character("Innkeeper", "Townsfolk", Source.Innkeeper)
/// 赌徒
export const Gambler = new Character("Gambler", "Townsfolk", Source.Gambler)
/// 造谣者
export const Gossip = new Character("Gossip", "Townsfolk", Source.Gossip)
/// 侍臣
export const Courtier = new Character("Courtier", "Townsfolk", Source.Courtier)
/// 教授
export const Professor = new Character("Professor", "Townsfolk", Source.Professor)
/// 吟游诗人
export const Minstrel = new Character("Minstrel", "Townsfolk", Source.Minstrel)
/// 茶艺师
export const Tealady = new Character("Tealady", "Townsfolk", Source.Tealady)
/// 和平主义者
export const Pacifist = new Character("Pacifist", "Townsfolk", Source.Pacifist)
/// 弄臣
export const Fool = new Character("Fool", "Townsfolk", Source.Fool)
/// 修补匠
export const Tinker = new Character("Tinker", "Outsiders", Source.Tinker)
/// 月之子
export const Moonchild = new Character("Moonchild", "Outsiders", Source.Moonchild)
/// 莽夫
export const Goon = new Character("Goon", "Outsiders", Source.Goon)
/// 疯子
export const Lunatic = new Character("Lunatic", "Outsiders", Source.Lunatic)
/// 教父
export const Godfather = new Character("Godfather", "Minions", Source.Godfather)
/// 魔鬼代言人
export const Devilsadvocate = new Character("Devilsadvocate", "Minions", Source.Devilsadvocate)
/// 刺客
export const Assassin = new Character("Assassin", "Minions", Source.Assassin)
/// 主谋
export const Mastermind = new Character("Mastermind", "Minions", Source.Mastermind)
/// 僵怖
export const Zombuul = new Character("Zombuul", "Demons", Source.Zombuul)
/// 普卡
export const Pukka = new Character("Pukka", "Demons", Source.Pukka)
/// 沙巴洛斯
export const Shabaloth = new Character("Shabaloth", "Demons", Source.Shabaloth)
/// 珀
export const Po = new Character("Po", "Demons", Source.Po)

/// 钟表匠
export const Clockmaker = new Character("Clockmaker", "Townsfolk", Source.Clockmaker)
/// 筑梦师
export const Dreamer = new Character("Dreamer", "Townsfolk", Source.Dreamer)
/// 舞蛇人
export const Snakecharmer = new Character("Snakecharmer", "Townsfolk", Source.Snakecharmer)
/// 数学家
export const Mathematician = new Character("Mathematician", "Townsfolk", Source.Mathematician)
/// 卖花女孩
export const Flowergirl = new Character("Flowergirl", "Townsfolk", Source.Flowergirl)
/// 城镇公告员
export const Towncrier = new Character("Towncrier", "Townsfolk", Source.Towncrier)
/// 神谕者
export const Oracle = new Character("Oracle", "Townsfolk", Source.Oracle)
/// 博学者
export const Savant = new Character("Savant", "Townsfolk", Source.Savant)
/// 女裁缝
export const Seamstress = new Character("Seamstress", "Townsfolk", Source.Seamstress)
/// 哲学家
export const Philosopher = new Character("Philosopher", "Townsfolk", Source.Philosopher)
/// 艺术家
export const Artist = new Character("Artist", "Townsfolk", Source.Artist)
/// 杂耍艺人
export const Juggler = new Character("Juggler", "Townsfolk", Source.Juggler)
/// 贤者
export const Sage = new Character("Sage", "Townsfolk", Source.Sage)
/// 畸形秀演员
export const Mutant = new Character("Mutant", "Outsiders", Source.Mutant)
/// 心上人
export const Sweetheart = new Character("Sweetheart", "Outsiders", Source.Sweetheart)
/// 理发师
export const Barber = new Character("Barber", "Outsiders", Source.Barber)
/// 呆瓜
export const Klutz = new Character("Klutz", "Outsiders", Source.Klutz)
/// 镜像双子
export const Eviltwin = new Character("Eviltwin", "Minions", Source.Eviltwin)
/// 女巫
export const Witch = new Character("Witch", "Minions", Source.Witch)
/// 洗脑师
export const Cerenovus = new Character("Cerenovus", "Minions", Source.Cerenovus)
/// 麻脸巫婆
export const Pithag = new Character("Pithag", "Minions", Source.Pithag)
/// 方古
export const Fanggu = new Character("Fanggu", "Demons", Source.Fanggu)
/// 亡骨魔
export const Vigormortis = new Character("Vigormortis", "Demons", Source.Vigormortis)
/// 诺-达鲺
export const Nodashii = new Character("Nodashii", "Demons", Source.Nodashii)
/// 涡流
export const Vortox = new Character("Vortox", "Demons", Source.Vortox)