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
exports.Dreamer = exports.Clockmaker = exports.Po = exports.Shabaloth = exports.Pukka = exports.Zombuul = exports.Mastermind = exports.Assassin = exports.Devilsadvocate = exports.Godfather = exports.Lunatic = exports.Goon = exports.Moonchild = exports.Tinker = exports.Fool = exports.Pacifist = exports.Tealady = exports.Minstrel = exports.Professor = exports.Courtier = exports.Gossip = exports.Gambler = exports.Innkeeper = exports.Exorcist = exports.Chambermaid = exports.Sailor = exports.Grandmother = exports.Imp = exports.Baron = exports.ScarletWoman = exports.Spy = exports.Poisoner = exports.Saint = exports.Recluse = exports.Drunk = exports.Butler = exports.Mayor = exports.Soldier = exports.Slayer = exports.Virgin = exports.Ravenkeeper = exports.Monk = exports.Undertaker = exports.FortuneTeller = exports.Empath = exports.Chef = exports.Investigator = exports.Librarian = exports.Washerwoman = exports.KindName = void 0;
exports.CharacterForKey = exports.Vortox = exports.Nodashii = exports.Vigormortis = exports.Fanggu = exports.Pithag = exports.Cerenovus = exports.Witch = exports.Eviltwin = exports.Klutz = exports.Barber = exports.Sweetheart = exports.Mutant = exports.Sage = exports.Juggler = exports.Artist = exports.Philosopher = exports.Seamstress = exports.Savant = exports.Oracle = exports.Towncrier = exports.Flowergirl = exports.Mathematician = exports.Snakecharmer = void 0;
var Source = __importStar(require("./source/icon"));
var character_1 = require("./locals/character");
var skill_1 = require("./skill");
var Character = function (key, kind, icon, abilities) {
    if (abilities === void 0) { abilities = []; }
    return {
        key: key,
        name: character_1.zh[key].name,
        icon: icon,
        skill: character_1.zh[key].skill,
        kind: kind,
        abilities: abilities
    };
};
exports.KindName = {
    Townsfolk: "村民",
    Outsiders: "外来者",
    Minions: "爪牙",
    Demons: "恶魔"
};
/// 洗衣妇
exports.Washerwoman = Character("Washerwoman", "Townsfolk", Source.Washerwoman, [skill_1.KnowTownsfolk]);
/// 图书管理员
exports.Librarian = Character("Librarian", "Townsfolk", Source.Librarian, [skill_1.KnowOutsiders]);
/// 调查员
exports.Investigator = Character("Investigator", "Townsfolk", Source.Investigator, [skill_1.KnowMinions]);
/// 厨师
exports.Chef = Character("Chef", "Townsfolk", Source.Chef, [skill_1.KnowSeat]);
/// 共情者
exports.Empath = Character("Empath", "Townsfolk", Source.Empath, [skill_1.KnowEvilAround]);
/// 占卜师
exports.FortuneTeller = Character("Fortuneteller", "Townsfolk", Source.Fortuneteller, [skill_1.CheckImp]);
/// 掘墓人
exports.Undertaker = Character("Undertaker", "Townsfolk", Source.Undertaker, [skill_1.DigKnowCharacter]);
/// 僧侣
exports.Monk = Character("Monk", "Townsfolk", Source.Monk, [skill_1.Guard]);
/// 守鸦人
exports.Ravenkeeper = Character("Ravenkeeper", "Townsfolk", Source.Ravenkeeper, [skill_1.WakenKnowCharacter]);
/// 圣女
exports.Virgin = Character("Virgin", "Townsfolk", Source.Virgin);
/// 杀手
exports.Slayer = Character("Slayer", "Townsfolk", Source.Slayer);
/// 士兵
exports.Soldier = Character("Soldier", "Townsfolk", Source.Soldier);
/// 市长
exports.Mayor = Character("Mayor", "Townsfolk", Source.Mayor, [skill_1.Scapegoat]);
/// 管家
exports.Butler = Character("Butler", "Outsiders", Source.Butler, [skill_1.ChooseMaster]);
/// 酒鬼
exports.Drunk = Character("Drunk", "Outsiders", Source.Drunk);
/// 隐士
exports.Recluse = Character("Recluse", "Outsiders", Source.Recluse);
/// 圣徒
exports.Saint = Character("Saint", "Outsiders", Source.Saint);
/// 下毒者
exports.Poisoner = Character("Poisoner", "Minions", Source.Poisoner, [skill_1.Poison]);
/// 间谍
exports.Spy = Character("Spy", "Minions", Source.Spy, [skill_1.Peep]);
/// 猩红女巫
exports.ScarletWoman = Character("Scarletwoman", "Minions", Source.Scarletwoman, [skill_1.BecomeImp]);
/// 男爵
exports.Baron = Character("Baron", "Minions", Source.Baron);
/// 小恶魔
exports.Imp = Character("Imp", "Demons", Source.Imp, [skill_1.Kill, skill_1.Tramsform, skill_1.KnowAbsent]);
/// 祖母
exports.Grandmother = Character("Grandmother", "Townsfolk", Source.Grandmother);
/// 水手
exports.Sailor = Character("Sailor", "Townsfolk", Source.Sailor);
/// 侍女
exports.Chambermaid = Character("Chambermaid", "Townsfolk", Source.Chambermaid);
/// 驱魔人
exports.Exorcist = Character("Exorcist", "Townsfolk", Source.Exorcist);
/// 旅店老板
exports.Innkeeper = Character("Innkeeper", "Townsfolk", Source.Innkeeper);
/// 赌徒
exports.Gambler = Character("Gambler", "Townsfolk", Source.Gambler);
/// 造谣者
exports.Gossip = Character("Gossip", "Townsfolk", Source.Gossip);
/// 侍臣
exports.Courtier = Character("Courtier", "Townsfolk", Source.Courtier);
/// 教授
exports.Professor = Character("Professor", "Townsfolk", Source.Professor);
/// 吟游诗人
exports.Minstrel = Character("Minstrel", "Townsfolk", Source.Minstrel);
/// 茶艺师
exports.Tealady = Character("Tealady", "Townsfolk", Source.Tealady);
/// 和平主义者
exports.Pacifist = Character("Pacifist", "Townsfolk", Source.Pacifist);
/// 弄臣
exports.Fool = Character("Fool", "Townsfolk", Source.Fool);
/// 修补匠
exports.Tinker = Character("Tinker", "Outsiders", Source.Tinker);
/// 月之子
exports.Moonchild = Character("Moonchild", "Outsiders", Source.Moonchild);
/// 莽夫
exports.Goon = Character("Goon", "Outsiders", Source.Goon);
/// 疯子
exports.Lunatic = Character("Lunatic", "Outsiders", Source.Lunatic);
/// 教父
exports.Godfather = Character("Godfather", "Minions", Source.Godfather);
/// 魔鬼代言人
exports.Devilsadvocate = Character("Devilsadvocate", "Minions", Source.Devilsadvocate);
/// 刺客
exports.Assassin = Character("Assassin", "Minions", Source.Assassin);
/// 主谋
exports.Mastermind = Character("Mastermind", "Minions", Source.Mastermind);
/// 僵怖
exports.Zombuul = Character("Zombuul", "Demons", Source.Zombuul);
/// 普卡
exports.Pukka = Character("Pukka", "Demons", Source.Pukka);
/// 沙巴洛斯
exports.Shabaloth = Character("Shabaloth", "Demons", Source.Shabaloth);
/// 珀
exports.Po = Character("Po", "Demons", Source.Po);
/// 钟表匠
exports.Clockmaker = Character("Clockmaker", "Townsfolk", Source.Clockmaker);
/// 筑梦师
exports.Dreamer = Character("Dreamer", "Townsfolk", Source.Dreamer);
/// 舞蛇人
exports.Snakecharmer = Character("Snakecharmer", "Townsfolk", Source.Snakecharmer);
/// 数学家
exports.Mathematician = Character("Mathematician", "Townsfolk", Source.Mathematician);
/// 卖花女孩
exports.Flowergirl = Character("Flowergirl", "Townsfolk", Source.Flowergirl);
/// 城镇公告员
exports.Towncrier = Character("Towncrier", "Townsfolk", Source.Towncrier);
/// 神谕者
exports.Oracle = Character("Oracle", "Townsfolk", Source.Oracle);
/// 博学者
exports.Savant = Character("Savant", "Townsfolk", Source.Savant);
/// 女裁缝
exports.Seamstress = Character("Seamstress", "Townsfolk", Source.Seamstress);
/// 哲学家
exports.Philosopher = Character("Philosopher", "Townsfolk", Source.Philosopher);
/// 艺术家
exports.Artist = Character("Artist", "Townsfolk", Source.Artist);
/// 杂耍艺人
exports.Juggler = Character("Juggler", "Townsfolk", Source.Juggler);
/// 贤者
exports.Sage = Character("Sage", "Townsfolk", Source.Sage);
/// 畸形秀演员
exports.Mutant = Character("Mutant", "Outsiders", Source.Mutant);
/// 心上人
exports.Sweetheart = Character("Sweetheart", "Outsiders", Source.Sweetheart);
/// 理发师
exports.Barber = Character("Barber", "Outsiders", Source.Barber);
/// 呆瓜
exports.Klutz = Character("Klutz", "Outsiders", Source.Klutz);
/// 镜像双子
exports.Eviltwin = Character("Eviltwin", "Minions", Source.Eviltwin);
/// 女巫
exports.Witch = Character("Witch", "Minions", Source.Witch);
/// 洗脑师
exports.Cerenovus = Character("Cerenovus", "Minions", Source.Cerenovus);
/// 麻脸巫婆
exports.Pithag = Character("Pithag", "Minions", Source.Pithag);
/// 方古
exports.Fanggu = Character("Fanggu", "Demons", Source.Fanggu);
/// 亡骨魔
exports.Vigormortis = Character("Vigormortis", "Demons", Source.Vigormortis);
/// 诺-达鲺
exports.Nodashii = Character("Nodashii", "Demons", Source.Nodashii);
/// 涡流
exports.Vortox = Character("Vortox", "Demons", Source.Vortox);
var All = [exports.Washerwoman, exports.Librarian, exports.Investigator, exports.Chef, exports.Empath, exports.FortuneTeller, exports.Undertaker, exports.Monk, exports.Ravenkeeper, exports.Virgin, exports.Slayer, exports.Soldier, exports.Mayor, exports.Butler, exports.Drunk, exports.Recluse, exports.Saint, exports.Poisoner, exports.Spy, exports.ScarletWoman, exports.Baron, exports.Imp,
    exports.Grandmother, exports.Sailor, exports.Chambermaid, exports.Exorcist, exports.Innkeeper, exports.Gambler, exports.Gossip, exports.Courtier, exports.Professor, exports.Minstrel, exports.Tealady, exports.Pacifist, exports.Fool, exports.Tinker, exports.Moonchild, exports.Goon, exports.Lunatic, exports.Godfather, exports.Devilsadvocate, exports.Assassin, exports.Mastermind, exports.Zombuul, exports.Pukka, exports.Shabaloth, exports.Po,
    exports.Clockmaker, exports.Dreamer, exports.Snakecharmer, exports.Mathematician, exports.Flowergirl, exports.Towncrier, exports.Oracle, exports.Savant, exports.Seamstress, exports.Philosopher, exports.Artist, exports.Juggler, exports.Sage, exports.Mutant, exports.Sweetheart, exports.Barber, exports.Klutz, exports.Eviltwin, exports.Witch, exports.Cerenovus, exports.Pithag, exports.Fanggu, exports.Vigormortis, exports.Nodashii, exports.Vortox];
var CharacterForKey = function (key) { return All.find(function (c) { return c.key === key; }); };
exports.CharacterForKey = CharacterForKey;
