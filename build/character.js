"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snakecharmer = exports.Dreamer = exports.Clockmaker = exports.Po = exports.Shabaloth = exports.Pukka = exports.Zombuul = exports.Mastermind = exports.Assassin = exports.Devilsadvocate = exports.Godfather = exports.Lunatic = exports.Goon = exports.Moonchild = exports.Tinker = exports.Fool = exports.Pacifist = exports.Tealady = exports.Minstrel = exports.Professor = exports.Courtier = exports.Gossip = exports.Gambler = exports.Innkeeper = exports.Exorcist = exports.Chambermaid = exports.Sailor = exports.Grandmother = exports.Imp = exports.Baron = exports.ScarletWoman = exports.Spy = exports.Poisoner = exports.Saint = exports.Recluse = exports.Drunk = exports.Butler = exports.Mayor = exports.Soldier = exports.Slayer = exports.Virgin = exports.Ravenkeeper = exports.Monk = exports.Undertaker = exports.FortuneTeller = exports.Empath = exports.Chef = exports.Investigator = exports.Librarian = exports.Washerwoman = void 0;
exports.Vortox = exports.Nodashii = exports.Vigormortis = exports.Fanggu = exports.Pithag = exports.Cerenovus = exports.Witch = exports.Eviltwin = exports.Klutz = exports.Barber = exports.Sweetheart = exports.Mutant = exports.Sage = exports.Juggler = exports.Artist = exports.Philosopher = exports.Seamstress = exports.Savant = exports.Oracle = exports.Towncrier = exports.Flowergirl = exports.Mathematician = void 0;
var Source = __importStar(require("./source/icon"));
var character_1 = require("./locals/character");
var Character = /** @class */ (function () {
    function Character(key, kind, icon) {
        this.key = key;
        this.kind = kind;
        this.icon = icon;
    }
    Object.defineProperty(Character.prototype, "name", {
        get: function () {
            return character_1.zh[this.key].name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "skill", {
        get: function () {
            return character_1.zh[this.key].skill;
        },
        enumerable: false,
        configurable: true
    });
    return Character;
}());
Object.defineProperty(Character.prototype, 'name', { enumerable: true });
Object.defineProperty(Character.prototype, 'skill', { enumerable: true });
/// 洗衣妇
exports.Washerwoman = new Character("Washerwoman", "Townsfolk", Source.Washerwoman);
/// 图书管理员
exports.Librarian = new Character("Librarian", "Townsfolk", Source.Librarian);
/// 调查员
exports.Investigator = new Character("Investigator", "Townsfolk", Source.Investigator);
/// 厨师
exports.Chef = new Character("Chef", "Townsfolk", Source.Chef);
/// 共情者
exports.Empath = new Character("Empath", "Townsfolk", Source.Empath);
/// 占卜师
exports.FortuneTeller = new Character("Fortuneteller", "Townsfolk", Source.Fortuneteller);
/// 掘墓人
exports.Undertaker = new Character("Undertaker", "Townsfolk", Source.Undertaker);
/// 僧侣
exports.Monk = new Character("Monk", "Townsfolk", Source.Monk);
/// 守鸦人
exports.Ravenkeeper = new Character("Ravenkeeper", "Townsfolk", Source.Ravenkeeper);
/// 圣女
exports.Virgin = new Character("Virgin", "Townsfolk", Source.Virgin);
/// 杀手
exports.Slayer = new Character("Slayer", "Townsfolk", Source.Slayer);
/// 士兵
exports.Soldier = new Character("Soldier", "Townsfolk", Source.Soldier);
/// 市长
exports.Mayor = new Character("Mayor", "Townsfolk", Source.Mayor);
/// 管家
exports.Butler = new Character("Butler", "Outsiders", Source.Butler);
/// 酒鬼
exports.Drunk = new Character("Drunk", "Outsiders", Source.Drunk);
/// 隐士
exports.Recluse = new Character("Recluse", "Outsiders", Source.Recluse);
/// 圣徒
exports.Saint = new Character("Saint", "Outsiders", Source.Saint);
/// 下毒者
exports.Poisoner = new Character("Poisoner", "Minions", Source.Poisoner);
/// 间谍
exports.Spy = new Character("Spy", "Minions", Source.Spy);
/// 猩红女巫
exports.ScarletWoman = new Character("Scarletwoman", "Minions", Source.Scarletwoman);
/// 男爵
exports.Baron = new Character("Baron", "Minions", Source.Baron);
/// 小恶魔
exports.Imp = new Character("Imp", "Demons", Source.Imp);
/// 祖母
exports.Grandmother = new Character("Grandmother", "Townsfolk", Source.Grandmother);
/// 水手
exports.Sailor = new Character("Sailor", "Townsfolk", Source.Sailor);
/// 侍女
exports.Chambermaid = new Character("Chambermaid", "Townsfolk", Source.Chambermaid);
/// 驱魔人
exports.Exorcist = new Character("Exorcist", "Townsfolk", Source.Exorcist);
/// 旅店老板
exports.Innkeeper = new Character("Innkeeper", "Townsfolk", Source.Innkeeper);
/// 赌徒
exports.Gambler = new Character("Gambler", "Townsfolk", Source.Gambler);
/// 造谣者
exports.Gossip = new Character("Gossip", "Townsfolk", Source.Gossip);
/// 侍臣
exports.Courtier = new Character("Courtier", "Townsfolk", Source.Courtier);
/// 教授
exports.Professor = new Character("Professor", "Townsfolk", Source.Professor);
/// 吟游诗人
exports.Minstrel = new Character("Minstrel", "Townsfolk", Source.Minstrel);
/// 茶艺师
exports.Tealady = new Character("Tealady", "Townsfolk", Source.Tealady);
/// 和平主义者
exports.Pacifist = new Character("Pacifist", "Townsfolk", Source.Pacifist);
/// 弄臣
exports.Fool = new Character("Fool", "Townsfolk", Source.Fool);
/// 修补匠
exports.Tinker = new Character("Tinker", "Outsiders", Source.Tinker);
/// 月之子
exports.Moonchild = new Character("Moonchild", "Outsiders", Source.Moonchild);
/// 莽夫
exports.Goon = new Character("Goon", "Outsiders", Source.Goon);
/// 疯子
exports.Lunatic = new Character("Lunatic", "Outsiders", Source.Lunatic);
/// 教父
exports.Godfather = new Character("Godfather", "Minions", Source.Godfather);
/// 魔鬼代言人
exports.Devilsadvocate = new Character("Devilsadvocate", "Minions", Source.Devilsadvocate);
/// 刺客
exports.Assassin = new Character("Assassin", "Minions", Source.Assassin);
/// 主谋
exports.Mastermind = new Character("Mastermind", "Minions", Source.Mastermind);
/// 僵怖
exports.Zombuul = new Character("Zombuul", "Demons", Source.Zombuul);
/// 普卡
exports.Pukka = new Character("Pukka", "Demons", Source.Pukka);
/// 沙巴洛斯
exports.Shabaloth = new Character("Shabaloth", "Demons", Source.Shabaloth);
/// 珀
exports.Po = new Character("Po", "Demons", Source.Po);
/// 钟表匠
exports.Clockmaker = new Character("Clockmaker", "Townsfolk", Source.Clockmaker);
/// 筑梦师
exports.Dreamer = new Character("Dreamer", "Townsfolk", Source.Dreamer);
/// 舞蛇人
exports.Snakecharmer = new Character("Snakecharmer", "Townsfolk", Source.Snakecharmer);
/// 数学家
exports.Mathematician = new Character("Mathematician", "Townsfolk", Source.Mathematician);
/// 卖花女孩
exports.Flowergirl = new Character("Flowergirl", "Townsfolk", Source.Flowergirl);
/// 城镇公告员
exports.Towncrier = new Character("Towncrier", "Townsfolk", Source.Towncrier);
/// 神谕者
exports.Oracle = new Character("Oracle", "Townsfolk", Source.Oracle);
/// 博学者
exports.Savant = new Character("Savant", "Townsfolk", Source.Savant);
/// 女裁缝
exports.Seamstress = new Character("Seamstress", "Townsfolk", Source.Seamstress);
/// 哲学家
exports.Philosopher = new Character("Philosopher", "Townsfolk", Source.Philosopher);
/// 艺术家
exports.Artist = new Character("Artist", "Townsfolk", Source.Artist);
/// 杂耍艺人
exports.Juggler = new Character("Juggler", "Townsfolk", Source.Juggler);
/// 贤者
exports.Sage = new Character("Sage", "Townsfolk", Source.Sage);
/// 畸形秀演员
exports.Mutant = new Character("Mutant", "Outsiders", Source.Mutant);
/// 心上人
exports.Sweetheart = new Character("Sweetheart", "Outsiders", Source.Sweetheart);
/// 理发师
exports.Barber = new Character("Barber", "Outsiders", Source.Barber);
/// 呆瓜
exports.Klutz = new Character("Klutz", "Outsiders", Source.Klutz);
/// 镜像双子
exports.Eviltwin = new Character("Eviltwin", "Minions", Source.Eviltwin);
/// 女巫
exports.Witch = new Character("Witch", "Minions", Source.Witch);
/// 洗脑师
exports.Cerenovus = new Character("Cerenovus", "Minions", Source.Cerenovus);
/// 麻脸巫婆
exports.Pithag = new Character("Pithag", "Minions", Source.Pithag);
/// 方古
exports.Fanggu = new Character("Fanggu", "Demons", Source.Fanggu);
/// 亡骨魔
exports.Vigormortis = new Character("Vigormortis", "Demons", Source.Vigormortis);
/// 诺-达鲺
exports.Nodashii = new Character("Nodashii", "Demons", Source.Nodashii);
/// 涡流
exports.Vortox = new Character("Vortox", "Demons", Source.Vortox);
