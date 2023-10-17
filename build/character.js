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
/// 洗衣妇
exports.Washerwoman = new Character("Washerwoman", "Townsfolk" /* EKind.townsfolk */, Source.Washerwoman);
/// 图书管理员
exports.Librarian = new Character("Librarian", "Townsfolk" /* EKind.townsfolk */, Source.Librarian);
/// 调查员
exports.Investigator = new Character("Investigator", "Townsfolk" /* EKind.townsfolk */, Source.Investigator);
/// 厨师
exports.Chef = new Character("Chef", "Townsfolk" /* EKind.townsfolk */, Source.Chef);
/// 共情者
exports.Empath = new Character("Empath", "Townsfolk" /* EKind.townsfolk */, Source.Empath);
/// 占卜师
exports.FortuneTeller = new Character("Fortuneteller", "Townsfolk" /* EKind.townsfolk */, Source.Fortuneteller);
/// 掘墓人
exports.Undertaker = new Character("Undertaker", "Townsfolk" /* EKind.townsfolk */, Source.Undertaker);
/// 僧侣
exports.Monk = new Character("Monk", "Townsfolk" /* EKind.townsfolk */, Source.Monk);
/// 守鸦人
exports.Ravenkeeper = new Character("Ravenkeeper", "Townsfolk" /* EKind.townsfolk */, Source.Ravenkeeper);
/// 圣女
exports.Virgin = new Character("Virgin", "Townsfolk" /* EKind.townsfolk */, Source.Virgin);
/// 杀手
exports.Slayer = new Character("Slayer", "Townsfolk" /* EKind.townsfolk */, Source.Slayer);
/// 士兵
exports.Soldier = new Character("Soldier", "Townsfolk" /* EKind.townsfolk */, Source.Soldier);
/// 市长
exports.Mayor = new Character("Mayor", "Townsfolk" /* EKind.townsfolk */, Source.Mayor);
/// 管家
exports.Butler = new Character("Butler", "Outsiders" /* EKind.outsiders */, Source.Butler);
/// 酒鬼
exports.Drunk = new Character("Drunk", "Outsiders" /* EKind.outsiders */, Source.Drunk);
/// 隐士
exports.Recluse = new Character("Recluse", "Outsiders" /* EKind.outsiders */, Source.Recluse);
/// 圣徒
exports.Saint = new Character("Saint", "Outsiders" /* EKind.outsiders */, Source.Saint);
/// 下毒者
exports.Poisoner = new Character("Poisoner", "Minions" /* EKind.minions */, Source.Poisoner);
/// 间谍
exports.Spy = new Character("Spy", "Minions" /* EKind.minions */, Source.Spy);
/// 猩红女巫
exports.ScarletWoman = new Character("Scarletwoman", "Minions" /* EKind.minions */, Source.Scarletwoman);
/// 男爵
exports.Baron = new Character("Baron", "Minions" /* EKind.minions */, Source.Baron);
/// 小恶魔
exports.Imp = new Character("Imp", "Demons" /* EKind.demons */, Source.Imp);
/// 祖母
exports.Grandmother = new Character("Grandmother", "Townsfolk" /* EKind.townsfolk */, Source.Grandmother);
/// 水手
exports.Sailor = new Character("Sailor", "Townsfolk" /* EKind.townsfolk */, Source.Sailor);
/// 侍女
exports.Chambermaid = new Character("Chambermaid", "Townsfolk" /* EKind.townsfolk */, Source.Chambermaid);
/// 驱魔人
exports.Exorcist = new Character("Exorcist", "Townsfolk" /* EKind.townsfolk */, Source.Exorcist);
/// 旅店老板
exports.Innkeeper = new Character("Innkeeper", "Townsfolk" /* EKind.townsfolk */, Source.Innkeeper);
/// 赌徒
exports.Gambler = new Character("Gambler", "Townsfolk" /* EKind.townsfolk */, Source.Gambler);
/// 造谣者
exports.Gossip = new Character("Gossip", "Townsfolk" /* EKind.townsfolk */, Source.Gossip);
/// 侍臣
exports.Courtier = new Character("Courtier", "Townsfolk" /* EKind.townsfolk */, Source.Courtier);
/// 教授
exports.Professor = new Character("Professor", "Townsfolk" /* EKind.townsfolk */, Source.Professor);
/// 吟游诗人
exports.Minstrel = new Character("Minstrel", "Townsfolk" /* EKind.townsfolk */, Source.Minstrel);
/// 茶艺师
exports.Tealady = new Character("Tealady", "Townsfolk" /* EKind.townsfolk */, Source.Tealady);
/// 和平主义者
exports.Pacifist = new Character("Pacifist", "Townsfolk" /* EKind.townsfolk */, Source.Pacifist);
/// 弄臣
exports.Fool = new Character("Fool", "Townsfolk" /* EKind.townsfolk */, Source.Fool);
/// 修补匠
exports.Tinker = new Character("Tinker", "Outsiders" /* EKind.outsiders */, Source.Tinker);
/// 月之子
exports.Moonchild = new Character("Moonchild", "Outsiders" /* EKind.outsiders */, Source.Moonchild);
/// 莽夫
exports.Goon = new Character("Goon", "Outsiders" /* EKind.outsiders */, Source.Goon);
/// 疯子
exports.Lunatic = new Character("Lunatic", "Outsiders" /* EKind.outsiders */, Source.Lunatic);
/// 教父
exports.Godfather = new Character("Godfather", "Minions" /* EKind.minions */, Source.Godfather);
/// 魔鬼代言人
exports.Devilsadvocate = new Character("Devilsadvocate", "Minions" /* EKind.minions */, Source.Devilsadvocate);
/// 刺客
exports.Assassin = new Character("Assassin", "Minions" /* EKind.minions */, Source.Assassin);
/// 主谋
exports.Mastermind = new Character("Mastermind", "Minions" /* EKind.minions */, Source.Mastermind);
/// 僵怖
exports.Zombuul = new Character("Zombuul", "Demons" /* EKind.demons */, Source.Zombuul);
/// 普卡
exports.Pukka = new Character("Pukka", "Demons" /* EKind.demons */, Source.Pukka);
/// 沙巴洛斯
exports.Shabaloth = new Character("Shabaloth", "Demons" /* EKind.demons */, Source.Shabaloth);
/// 珀
exports.Po = new Character("Po", "Demons" /* EKind.demons */, Source.Po);
/// 钟表匠
exports.Clockmaker = new Character("Clockmaker", "Townsfolk" /* EKind.townsfolk */, Source.Clockmaker);
/// 筑梦师
exports.Dreamer = new Character("Dreamer", "Townsfolk" /* EKind.townsfolk */, Source.Dreamer);
/// 舞蛇人
exports.Snakecharmer = new Character("Snakecharmer", "Townsfolk" /* EKind.townsfolk */, Source.Snakecharmer);
/// 数学家
exports.Mathematician = new Character("Mathematician", "Townsfolk" /* EKind.townsfolk */, Source.Mathematician);
/// 卖花女孩
exports.Flowergirl = new Character("Flowergirl", "Townsfolk" /* EKind.townsfolk */, Source.Flowergirl);
/// 城镇公告员
exports.Towncrier = new Character("Towncrier", "Townsfolk" /* EKind.townsfolk */, Source.Towncrier);
/// 神谕者
exports.Oracle = new Character("Oracle", "Townsfolk" /* EKind.townsfolk */, Source.Oracle);
/// 博学者
exports.Savant = new Character("Savant", "Townsfolk" /* EKind.townsfolk */, Source.Savant);
/// 女裁缝
exports.Seamstress = new Character("Seamstress", "Townsfolk" /* EKind.townsfolk */, Source.Seamstress);
/// 哲学家
exports.Philosopher = new Character("Philosopher", "Townsfolk" /* EKind.townsfolk */, Source.Philosopher);
/// 艺术家
exports.Artist = new Character("Artist", "Townsfolk" /* EKind.townsfolk */, Source.Artist);
/// 杂耍艺人
exports.Juggler = new Character("Juggler", "Townsfolk" /* EKind.townsfolk */, Source.Juggler);
/// 贤者
exports.Sage = new Character("Sage", "Townsfolk" /* EKind.townsfolk */, Source.Sage);
/// 畸形秀演员
exports.Mutant = new Character("Mutant", "Outsiders" /* EKind.outsiders */, Source.Mutant);
/// 心上人
exports.Sweetheart = new Character("Sweetheart", "Outsiders" /* EKind.outsiders */, Source.Sweetheart);
/// 理发师
exports.Barber = new Character("Barber", "Outsiders" /* EKind.outsiders */, Source.Barber);
/// 呆瓜
exports.Klutz = new Character("Klutz", "Outsiders" /* EKind.outsiders */, Source.Klutz);
/// 镜像双子
exports.Eviltwin = new Character("Eviltwin", "Minions" /* EKind.minions */, Source.Eviltwin);
/// 女巫
exports.Witch = new Character("Witch", "Minions" /* EKind.minions */, Source.Witch);
/// 洗脑师
exports.Cerenovus = new Character("Cerenovus", "Minions" /* EKind.minions */, Source.Cerenovus);
/// 麻脸巫婆
exports.Pithag = new Character("Pithag", "Minions" /* EKind.minions */, Source.Pithag);
/// 方古
exports.Fanggu = new Character("Fanggu", "Demons" /* EKind.demons */, Source.Fanggu);
/// 亡骨魔
exports.Vigormortis = new Character("Vigormortis", "Demons" /* EKind.demons */, Source.Vigormortis);
/// 诺-达鲺
exports.Nodashii = new Character("Nodashii", "Demons" /* EKind.demons */, Source.Nodashii);
/// 涡流
exports.Vortox = new Character("Vortox", "Demons" /* EKind.demons */, Source.Vortox);
