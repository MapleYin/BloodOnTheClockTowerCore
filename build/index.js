'use strict';

// src/common.ts
var isDeadPlayer = (player) => player.isKilled || player.isSlew || player.isExecuted;
var isAlivePlayer = (player) => !isDeadPlayer(player);
var hasRealAbility = (player) => !(player.isDrunken || player.isPoisoned);
var copyPlayers = (players) => players.map((p) => ({ ...p, character: { ...p.character, abilities: [...p.character.abilities] } }));

// src/abilities/becomeDemon/index.ts
var BecomeDemon = {
  key: "BecomeDemon",
  validate: (context) => isAlivePlayer(context.player) && context.players.filter(isAlivePlayer).length >= 4 && /// 人数大于4人
  context.players.findIndex((p) => isAlivePlayer(p) && p.character.kind == "Demons") == -1,
  /// 没有存活的恶魔
  effect: (operation, players) => {
    if (operation.payload?.character) {
      players[operation.effector].character = operation.payload.character;
    }
  },
  autoPayload: (context) => {
    const lastTimeline = context.timelines[context.timelines.length - 1];
    const aliveDemons = lastTimeline.initPlayers.filter((p) => !isDeadPlayer(p) && p.character?.kind == "Demons");
    const deadDemons = context.players.filter((p) => isDeadPlayer(p) && p.character?.kind == "Demons");
    const target = deadDemons.find((deadDemon) => aliveDemons.findIndex((aliveDemon) => aliveDemon.position) != -1);
    return {
      character: target?.character
    };
  }
};

// src/abilities/helper.ts
var AliveAtNight = (context) => isAlivePlayer(context.player) && context.time == "night";
var FirstNight = (context) => context.turn == 1 && context.time == "night";

// src/abilities/checkImp/index.ts
var CheckImp = {
  key: "CheckImp",
  validate: AliveAtNight
};

// src/abilities/chooseMaster/index.ts
var ChooseMaster = {
  key: "ChooseMaster",
  validate: AliveAtNight,
  effect: (operation, players) => {
    const effectorPlayer = players[operation.effector];
    const player = players.find((_, idx) => idx === operation.payload?.target);
    if (player && hasRealAbility(effectorPlayer)) {
      player.isMaster = true;
    }
  },
  effectDuration: "ntd"
};

// src/abilities/defense/index.ts
var Defense = {
  key: "Defense",
  validate: () => true
};

// src/abilities/excuteByRack/index.ts
var ExcuteByRack = {
  key: "ExcuteByRack",
  validate: () => true,
  effect: (operation, players) => {
    const player = players[operation.payload?.target];
    if (player) {
      player.isExecuted = true;
    }
  }
};

// src/abilities/digKnowCharacter/index.ts
var DigKnowCharacter = {
  key: "DigKnowCharacter",
  validate: (context) => {
    if (context.timelines.length < 2) {
      return false;
    }
    const lastTimeline = context.timelines[context.timelines.length - 2];
    return AliveAtNight(context) && lastTimeline.operations.some((op) => op.abilityKey === ExcuteByRack.key);
  }
};

// src/characters.ts
var Washerwoman = {
  key: "Washerwoman",
  kind: "Townsfolk",
  abilities: ["KnowTownsfolk"]
};
var Librarian = {
  key: "Librarian",
  kind: "Townsfolk",
  abilities: ["KnowOutsiders"]
};
var Investigator = {
  key: "Investigator",
  kind: "Townsfolk",
  abilities: ["KnowMinions"]
};
var Chef = {
  key: "Chef",
  kind: "Townsfolk",
  abilities: ["KnowSeat"]
};
var Empath = {
  key: "Empath",
  kind: "Townsfolk",
  abilities: ["KnowEvilAround"]
};
var FortuneTeller = {
  key: "Fortuneteller",
  kind: "Townsfolk",
  abilities: ["CheckImp"]
};
var Undertaker = {
  key: "Undertaker",
  kind: "Townsfolk",
  abilities: ["DigKnowCharacter"]
};
var Monk = {
  key: "Monk",
  kind: "Townsfolk",
  abilities: ["Guard"]
};
var Ravenkeeper = {
  key: "Ravenkeeper",
  kind: "Townsfolk",
  abilities: ["WakenKnowCharacter"]
};
var Virgin = {
  key: "Virgin",
  kind: "Townsfolk",
  abilities: ["Excute"]
};
var Slayer = {
  key: "Slayer",
  kind: "Townsfolk",
  abilities: ["Slay"]
};
var Soldier = {
  key: "Soldier",
  kind: "Townsfolk",
  abilities: []
};
var Mayor = {
  key: "Mayor",
  kind: "Townsfolk",
  abilities: ["Scapegoat"]
};
var Butler = {
  key: "Butler",
  kind: "Outsiders",
  abilities: ["ChooseMaster"]
};
var Drunk = {
  key: "Drunk",
  kind: "Outsiders",
  abilities: []
};
var Recluse = {
  key: "Recluse",
  kind: "Outsiders",
  abilities: []
};
var Saint = {
  key: "Saint",
  kind: "Outsiders",
  abilities: []
};
var Poisoner = {
  key: "Poisoner",
  kind: "Minions",
  abilities: ["Poison"]
};
var Spy = {
  key: "Spy",
  kind: "Minions",
  abilities: ["Peep"]
};
var ScarletWoman = {
  key: "Scarletwoman",
  kind: "Minions",
  abilities: ["BecomeDemon"]
};
var Baron = {
  key: "Baron",
  kind: "Minions",
  abilities: []
};
var Imp = {
  key: "Imp",
  kind: "Demons",
  abilities: ["KnowAbsent", "Kill", "Transform"]
};
var Grandmother = {
  key: "Grandmother",
  kind: "Townsfolk",
  abilities: []
};
var Sailor = {
  key: "Sailor",
  kind: "Townsfolk",
  abilities: []
};
var Chambermaid = {
  key: "Chambermaid",
  kind: "Townsfolk",
  abilities: []
};
var Exorcist = {
  key: "Exorcist",
  kind: "Townsfolk",
  abilities: []
};
var Innkeeper = {
  key: "Innkeeper",
  kind: "Townsfolk",
  abilities: []
};
var Gambler = {
  key: "Gambler",
  kind: "Townsfolk",
  abilities: []
};
var Gossip = {
  key: "Gossip",
  kind: "Townsfolk",
  abilities: []
};
var Courtier = {
  key: "Courtier",
  kind: "Townsfolk",
  abilities: []
};
var Professor = {
  key: "Professor",
  kind: "Townsfolk",
  abilities: []
};
var Minstrel = {
  key: "Minstrel",
  kind: "Townsfolk",
  abilities: []
};
var Tealady = {
  key: "Tealady",
  kind: "Townsfolk",
  abilities: []
};
var Pacifist = {
  key: "Pacifist",
  kind: "Townsfolk",
  abilities: []
};
var Fool = {
  key: "Fool",
  kind: "Townsfolk",
  abilities: []
};
var Tinker = {
  key: "Tinker",
  kind: "Outsiders",
  abilities: []
};
var Moonchild = {
  key: "Moonchild",
  kind: "Outsiders",
  abilities: []
};
var Goon = {
  key: "Goon",
  kind: "Outsiders",
  abilities: []
};
var Lunatic = {
  key: "Lunatic",
  kind: "Outsiders",
  abilities: []
};
var Godfather = {
  key: "Godfather",
  kind: "Minions",
  abilities: []
};
var Devilsadvocate = {
  key: "Devilsadvocate",
  kind: "Minions",
  abilities: []
};
var Assassin = {
  key: "Assassin",
  kind: "Minions",
  abilities: []
};
var Mastermind = {
  key: "Mastermind",
  kind: "Minions",
  abilities: []
};
var Zombuul = {
  key: "Zombuul",
  kind: "Demons",
  abilities: []
};
var Pukka = {
  key: "Pukka",
  kind: "Demons",
  abilities: []
};
var Shabaloth = {
  key: "Shabaloth",
  kind: "Demons",
  abilities: []
};
var Po = {
  key: "Po",
  kind: "Demons",
  abilities: []
};
var Clockmaker = {
  key: "Clockmaker",
  kind: "Townsfolk",
  abilities: []
};
var Dreamer = {
  key: "Dreamer",
  kind: "Townsfolk",
  abilities: []
};
var Snakecharmer = {
  key: "Snakecharmer",
  kind: "Townsfolk",
  abilities: []
};
var Mathematician = {
  key: "Mathematician",
  kind: "Townsfolk",
  abilities: []
};
var Flowergirl = {
  key: "Flowergirl",
  kind: "Townsfolk",
  abilities: []
};
var Towncrier = {
  key: "Towncrier",
  kind: "Townsfolk",
  abilities: []
};
var Oracle = {
  key: "Oracle",
  kind: "Townsfolk",
  abilities: []
};
var Savant = {
  key: "Savant",
  kind: "Townsfolk",
  abilities: []
};
var Seamstress = {
  key: "Seamstress",
  kind: "Townsfolk",
  abilities: []
};
var Philosopher = {
  key: "Philosopher",
  kind: "Townsfolk",
  abilities: []
};
var Artist = {
  key: "Artist",
  kind: "Townsfolk",
  abilities: []
};
var Juggler = {
  key: "Juggler",
  kind: "Townsfolk",
  abilities: []
};
var Sage = {
  key: "Sage",
  kind: "Townsfolk",
  abilities: []
};
var Mutant = {
  key: "Mutant",
  kind: "Outsiders",
  abilities: []
};
var Sweetheart = {
  key: "Sweetheart",
  kind: "Outsiders",
  abilities: []
};
var Barber = {
  key: "Barber",
  kind: "Outsiders",
  abilities: []
};
var Klutz = {
  key: "Klutz",
  kind: "Outsiders",
  abilities: []
};
var Eviltwin = {
  key: "Eviltwin",
  kind: "Minions",
  abilities: []
};
var Witch = {
  key: "Witch",
  kind: "Minions",
  abilities: []
};
var Cerenovus = {
  key: "Cerenovus",
  kind: "Minions",
  abilities: []
};
var Pithag = {
  key: "Pithag",
  kind: "Minions",
  abilities: []
};
var Fanggu = {
  key: "Fanggu",
  kind: "Demons",
  abilities: []
};
var Vigormortis = {
  key: "Vigormortis",
  kind: "Demons",
  abilities: []
};
var Nodashii = {
  key: "Nodashii",
  kind: "Demons",
  abilities: []
};
var Vortox = {
  key: "Vortox",
  kind: "Demons",
  abilities: []
};
var All = [
  Washerwoman,
  Librarian,
  Investigator,
  Chef,
  Empath,
  FortuneTeller,
  Undertaker,
  Monk,
  Ravenkeeper,
  Virgin,
  Slayer,
  Soldier,
  Mayor,
  Butler,
  Drunk,
  Recluse,
  Saint,
  Poisoner,
  Spy,
  ScarletWoman,
  Baron,
  Imp,
  Grandmother,
  Sailor,
  Chambermaid,
  Exorcist,
  Innkeeper,
  Gambler,
  Gossip,
  Courtier,
  Professor,
  Minstrel,
  Tealady,
  Pacifist,
  Fool,
  Tinker,
  Moonchild,
  Goon,
  Lunatic,
  Godfather,
  Devilsadvocate,
  Assassin,
  Mastermind,
  Zombuul,
  Pukka,
  Shabaloth,
  Po,
  Clockmaker,
  Dreamer,
  Snakecharmer,
  Mathematician,
  Flowergirl,
  Towncrier,
  Oracle,
  Savant,
  Seamstress,
  Philosopher,
  Artist,
  Juggler,
  Sage,
  Mutant,
  Sweetheart,
  Barber,
  Klutz,
  Eviltwin,
  Witch,
  Cerenovus,
  Pithag,
  Fanggu,
  Vigormortis,
  Nodashii,
  Vortox
];
var CharacterForKey = (key) => All.find((c) => c.key === key);

// src/abilities/drunk/index.ts
var Drunk2 = {
  key: "Drunk",
  validate: () => true,
  effect: (operation, players) => {
    const player = players[operation.payload?.target];
    if (player) {
      player.isDrunk = true;
      const character = CharacterForKey(operation.payload?.character);
      if (!character) {
        throw new Error("Drunk character not found");
      }
      player.illusion = character.key;
      player.character = {
        ...player.character,
        abilities: character.abilities
      };
    }
  }
};

// src/abilities/enemy/index.ts
var Enemy = {
  key: "Enemy",
  validate: () => true,
  effect: (operation, players) => {
    const player = players[operation.payload?.target];
    if (player) {
      player.isEnemy = true;
    }
  }
};

// src/abilities/excute/index.ts
var Excute = {
  key: "Excute",
  validate: () => true,
  effect: (operation, players) => {
    const player = players[operation.payload?.target];
    if (player) {
      player.isExecuted = true;
    }
  }
};

// src/abilities/guard/index.ts
var Guard = {
  key: "Guard",
  validate: (context) => AliveAtNight(context) && context.turn != 1,
  effect: (operation, players) => {
    const effectorPlayer = players[operation.effector];
    const player = players.find((_, idx) => idx === operation.payload?.target);
    if (hasRealAbility(effectorPlayer) && player) {
      player.isGuarded = true;
    }
  },
  effectDuration: "ntd"
};

// src/abilities/scapegoat/index.ts
var Scapegoat = {
  key: "Scapegoat",
  validate: (context) => {
    if (isDeadPlayer(context.player) || !hasRealAbility(context.player)) {
      return false;
    }
    const lastTimeline = context.timelines[context.timelines.length - 1];
    const killOperation = lastTimeline.operations.find((op) => op.abilityKey === Kill.key);
    if (!killOperation || killOperation.payload?.target !== context.player.position) {
      return false;
    }
    return true;
  },
  effect: (operation, players, timelines) => {
    const killAbility = Kill;
    const lastTimeline = timelines[timelines.length - 1];
    const previewKillOperation = lastTimeline.operations.find((op) => op.abilityKey === Kill.key);
    if (!previewKillOperation) {
      return;
    }
    const killOperation = {
      ...previewKillOperation,
      payload: {
        target: operation.payload?.target
      }
    };
    killAbility.effect?.(killOperation, players, timelines);
  }
};

// src/abilities/kill/index.ts
var Kill = {
  key: "Kill",
  validate: (context) => AliveAtNight(context) && context.turn != 1,
  effect: (operation, players) => {
    const effectorPlayer = players[operation.effector];
    const player = players[operation.payload?.target];
    if (!hasRealAbility(effectorPlayer) || !player || player.isGuarded) {
      return;
    }
    if ((player.character.abilities.includes(Defense.key) || player.character.abilities.includes(Scapegoat.key)) && hasRealAbility(player)) {
      return;
    }
    player.isKilled = true;
  }
};

// src/abilities/knowAbsent/index.ts
var KnowAbsent = {
  key: "KnowAbsent",
  validate: (context) => FirstNight(context) && context.players.length >= 7
};

// src/abilities/knowEvilAround/index.ts
var KnowEvilAround = {
  key: "KnowEvilAround",
  validate: AliveAtNight
};

// src/abilities/knowMinions/index.ts
var KnowMinions = {
  key: "KnowMinions",
  validate: (context) => AliveAtNight(context) && context.turn === 1
};

// src/abilities/knowOutsiders/index.ts
var KnowOutsiders = {
  key: "KnowOutsiders",
  validate: (context) => AliveAtNight(context) && context.turn === 1
};

// src/abilities/knowSeat/index.ts
var KnowSeat = {
  key: "KnowSeat",
  validate: (context) => AliveAtNight(context) && context.turn === 1
};

// src/abilities/knowTownsfolk/index.ts
var KnowTownsfolk = {
  key: "KnowTownsfolk",
  validate: (context) => AliveAtNight(context) && context.turn === 1
};

// src/abilities/nomination/index.ts
var Nomination = {
  key: "Nomination",
  validate: () => true,
  effect: (operation, players) => {
    const effectorPlayer = players[operation.effector];
    const player = players[operation.payload?.target];
    const numberOfAlivePlayers = players.filter(isAlivePlayer).length;
    if (!operation.payload || !Array.isArray(operation.payload?.voters) || !player || !effectorPlayer) {
      return;
    }
    if (operation.payload.voters.length * 2 >= numberOfAlivePlayers) {
      player.isOnGallows = true;
    }
  },
  effectDuration: "ntd"
};

// src/abilities/peep/index.ts
var Peep = {
  key: "Peep",
  validate: (context) => AliveAtNight(context)
};

// src/abilities/poison/index.ts
var Poison = {
  key: "Poison",
  validate: (context) => AliveAtNight(context),
  effect: (operation, players) => {
    const player = players.find((_, idx) => idx === operation.payload?.target);
    if (player) {
      player.isPoisoned = true;
    }
  },
  effectDuration: "ntd"
};

// src/abilities/slay/index.ts
var Slay = {
  key: "Slay",
  validate: () => true,
  effect: (operation, players) => {
    const effectorPlayer = players[operation.effector];
    const player = players[operation.payload?.target];
    if (effectorPlayer.character.abilities.includes("Slay") && hasRealAbility(effectorPlayer) && player && player.character.kind === "Demons") {
      player.isSlew = true;
    }
    if (effectorPlayer.character.abilities.includes("Slay")) {
      effectorPlayer.character.abilities.splice(effectorPlayer.character.abilities.indexOf("Slay"), 1);
    }
  }
};

// src/abilities/transform/index.ts
var Transform = {
  key: "Transform",
  validate: (context) => {
    const demonDead = isDeadPlayer(context.player);
    const lastTimeline = context.timelines[context.timelines.length - 1];
    const killOp = lastTimeline.operations.find((op) => op.abilityKey === "Kill");
    if (!demonDead || !killOp || killOp.payload?.target !== context.player.position || !killOp.payload?.result) {
      return false;
    }
    const transformOp = lastTimeline.operations.find((op) => op.abilityKey === "BecomeDemon");
    if (transformOp) {
      return false;
    }
    return true;
  },
  effect: (operation, players) => {
    const player = players[operation.payload?.target];
    if (player) {
      player.character = {
        key: "Imp",
        kind: "Demons",
        abilities: ["Kill", "KnowAbsent", "Transform"]
      };
    }
  }
};

// src/abilities/wakenKnowCharacter/index.ts
var WakenKnowCharacter = {
  key: "WakenKnowCharacter",
  validate: (context) => {
    if (context.time !== "night" || !isDeadPlayer(context.player)) return false;
    const timeline = context.timelines.find((timeline2) => timeline2.turn === context.turn && timeline2.time === context.time);
    const atBeginingOfTimeline = timeline?.initPlayers.find((p) => p.position === context.player.position);
    if (!atBeginingOfTimeline) return false;
    if (isDeadPlayer(atBeginingOfTimeline)) return false;
    return true;
  }
};

// src/abilities/index.ts
var abilities = [
  KnowAbsent,
  Poison,
  KnowTownsfolk,
  KnowOutsiders,
  KnowMinions,
  KnowSeat,
  Guard,
  Kill,
  BecomeDemon,
  Scapegoat,
  Transform,
  DigKnowCharacter,
  KnowEvilAround,
  CheckImp,
  ChooseMaster,
  WakenKnowCharacter,
  Peep,
  Nomination,
  Slay,
  Excute,
  ExcuteByRack,
  Defense,
  Drunk2,
  Enemy
];
var getAbility = (key) => abilities.find((ability) => ability.key === key);

// src/timeline.ts
var nextTimeline = (players, timelines, abilityOrder, options) => {
  let lastTimeline = timelines[timelines.length - 1];
  const orderedAbilities = abilityOrder.flatMap((key) => getAbility(key) || []);
  const timeline = lastTimeline ? {
    turn: lastTimeline.time === "night" ? lastTimeline.turn : lastTimeline.turn + 1,
    time: lastTimeline.time === "day" ? "night" : "day",
    operations: []
  } : {
    turn: 1,
    time: "night",
    operations: []
  };
  updateNomination(timelines, players, options);
  timelines.push(timeline);
  setupTimelines(timelines, players, orderedAbilities, options);
};
var createOperation = (abilityKey, effector, payload, timeline) => {
  timeline.operations.push({
    abilityKey,
    effector,
    turn: timeline.turn,
    time: timeline.time,
    hasEffect: true,
    payload,
    manual: true
  });
};
var updatePayload = (timeline, operationIdx, payload) => {
  timeline.operations[operationIdx].payload = payload;
};
var timelinesWithPlayerStatus = (timelines, players, options) => {
  let effectingOperations = [];
  setupOperationOnGameStart(players, effectingOperations, options);
  const waitOperationPlayers = copyPlayers(players);
  effectingOperations.forEach((opertion) => {
    effectManagedOperation(opertion, waitOperationPlayers, timelines);
  });
  const timelinesWithPlayerStatus2 = timelines.map((timeline) => {
    let timelineInitPlayers = [];
    const operations = timeline.operations.map((operation) => {
      let clearStatusPlayers = copyPlayers(waitOperationPlayers);
      effectingOperations = effectingOperations.filter((operation2) => clearInvalidEffectingOperations(operation2, clearStatusPlayers, timeline));
      effectingOperations.forEach((opertion) => {
        effectManagedOperation(opertion, clearStatusPlayers, timelines);
      });
      if (timelineInitPlayers.length) {
        timelineInitPlayers = copyPlayers(clearStatusPlayers);
      }
      const initPlayers2 = copyPlayers(clearStatusPlayers);
      if (operation.hasEffect) {
        effectingOperations.push(operation);
        effectManagedOperation(operation, clearStatusPlayers, timelines);
        effectingOperations = effectingOperations.filter((operation2) => clearInvalidEffectingOperations(operation2, clearStatusPlayers, timeline));
        clearStatusPlayers = copyPlayers(waitOperationPlayers);
        effectingOperations.forEach((opertion) => {
          effectManagedOperation(opertion, clearStatusPlayers, timelines);
        });
      }
      const effectedPlayers2 = copyPlayers(clearStatusPlayers);
      return {
        ...operation,
        initPlayers: initPlayers2,
        effectedPlayers: effectedPlayers2
      };
    });
    const firstOperation = operations[0];
    const lastOperation = operations[operations.length - 1];
    const initPlayers = firstOperation ? firstOperation.initPlayers : [];
    const effectedPlayers = lastOperation ? lastOperation.effectedPlayers : [];
    return {
      ...timeline,
      initPlayers,
      effectedPlayers,
      operations
    };
  });
  return timelinesWithPlayerStatus2.reduce((acc, nextTimeline2) => {
    const lastTimeline = acc[acc.length - 1];
    if (lastTimeline) {
      nextTimeline2.initPlayers = nextTimeline2.initPlayers.length ? nextTimeline2.initPlayers : lastTimeline.effectedPlayers;
      nextTimeline2.effectedPlayers = nextTimeline2.effectedPlayers.length ? nextTimeline2.effectedPlayers : nextTimeline2.initPlayers;
    }
    acc.push({ ...nextTimeline2 });
    return acc;
  }, []);
};
var setupTimelines = (timelines, players, orderedAbilities, options) => {
  let effectingOperations = [];
  setupOperationOnGameStart(players, effectingOperations, options);
  timelines.forEach((timeline) => {
    effectingOperations = effectingOperations.filter((opertion) => clearInvalidEffectingOperations(opertion, players, timeline));
    effectingOperations = setupOperations(timeline, effectingOperations, players, orderedAbilities, timelines, options);
  });
};
var setupOperations = (timeline, effectingOperations, players, orderedAbilities, timelines, options) => {
  const manualOperations = timeline.operations.filter((operation) => operation.manual);
  effectingOperations = effectingOperations.concat(manualOperations);
  const waitOperationPlayers = copyPlayers(players);
  effectingOperations.forEach((opertion) => {
    effectManagedOperation(opertion, waitOperationPlayers, timelines);
  });
  orderedAbilities.forEach((ability) => {
    const effectors = waitOperationPlayers.filter((player) => player.character.abilities.includes(ability.key));
    effectors.forEach((effector) => {
      const clearStatusPlayers = copyPlayers(waitOperationPlayers);
      effectingOperations = effectingOperations.filter((opertion) => clearInvalidEffectingOperations(opertion, players, timeline));
      effectingOperations.forEach((opertion) => {
        effectManagedOperation(opertion, clearStatusPlayers, timelines);
      });
      const player = clearStatusPlayers.find((p) => p.position === effector.position);
      const effectingTimelinesIdx = timelines.findIndex((t) => t.time === timeline.time && t.turn === timeline.turn);
      const effectingTimelines = timelines.slice(0, effectingTimelinesIdx + 1);
      const context = {
        player,
        players: clearStatusPlayers,
        turn: timeline.turn,
        time: timeline.time,
        timelines: timelinesWithPlayerStatus(effectingTimelines, players, options)
      };
      if (ability.validate(context)) {
        const operationIdx = timeline.operations.findIndex((operation2) => operation2.abilityKey === ability.key && operation2.effector === effector.position);
        let operation;
        if (operationIdx === -1) {
          operation = {
            abilityKey: ability.key,
            effector: effector.position,
            turn: timeline.turn,
            time: timeline.time,
            hasEffect: !!ability.effect
          };
          timeline.operations.push(operation);
        } else {
          operation = timeline.operations[operationIdx];
        }
        if (operation.hasEffect) {
          effectingOperations.push(operation);
          if (ability.autoPayload) {
            operation.payload = ability.autoPayload(context);
          }
        }
      } else {
        timeline.operations = timeline.operations.filter((operation) => operation.abilityKey !== ability.key || operation.effector !== effector.position);
      }
    });
  });
  return effectingOperations;
};
var clearInvalidEffectingOperations = (effectingOperation, players, currentTimeline) => {
  const ability = getAbility(effectingOperation.abilityKey);
  if (ability?.effectCondition === "alive") {
    const player = players[effectingOperation.effector];
    if (isDeadPlayer(player)) {
      return false;
    }
  }
  if (ability?.effectDuration === "ntd") {
    if (currentTimeline.turn != effectingOperation.turn) {
      return false;
    }
  }
  return true;
};
var effectManagedOperation = (effectingOperation, players, timelines) => {
  const ability = getAbility(effectingOperation.abilityKey);
  if (ability) {
    ability.effect?.(effectingOperation, players, timelines);
  }
};
var updateNomination = (timelines, players, options) => {
  const timeline = timelines[timelines.length - 1];
  if (!timeline || timeline.time !== "day") {
    return;
  }
  const excuteOperation = timeline.operations.find((op) => op.abilityKey === Excute.key);
  if (excuteOperation) {
    return;
  }
  const statusTimelines = timelinesWithPlayerStatus(timelines, players, options);
  const lastTimeline = statusTimelines[statusTimelines.length - 1];
  const playersOnRack = lastTimeline.effectedPlayers.filter((p) => p.isOnGallows);
  if (playersOnRack.length === 0) {
    return;
  }
  let target = -1;
  if (playersOnRack.length > 1) {
    const nominations = timeline.operations.filter((op) => op.abilityKey === Nomination.key && Array.isArray(op.payload?.voters));
    const voteCount = nominations.flatMap((op) => {
      const voters = op.payload?.voters || [];
      return Array.isArray(voters) ? voters.length : [];
    });
    const maxVoteCount = Math.max(...voteCount);
    const matchNominations = nominations.filter((op) => op.payload?.voters.length === maxVoteCount);
    if (matchNominations.length != 1) {
      target = -1;
    } else {
      target = matchNominations[0].payload?.target;
    }
  } else {
    target = playersOnRack[0].position;
  }
  if (target === -1) {
    return;
  }
  timeline.operations.push({
    abilityKey: ExcuteByRack.key,
    effector: -1,
    turn: timeline.turn,
    time: timeline.time,
    hasEffect: true,
    manual: true,
    payload: {
      target
    }
  });
};
var setupOperationOnGameStart = (players, effectingOperations, options) => {
  const drunkPlayerIdx = players.findIndex((p) => p.character.key === Drunk.key);
  if (drunkPlayerIdx !== -1) {
    effectingOperations.push({
      abilityKey: Drunk2.key,
      effector: -1,
      turn: 1,
      time: "night",
      hasEffect: true,
      payload: {
        target: drunkPlayerIdx,
        character: options?.drunk
      },
      manual: true
    });
  }
  const enemyPlayerIdx = players.findIndex((p) => p.character.key === options?.enemy);
  if (enemyPlayerIdx !== -1) {
    effectingOperations.push({
      abilityKey: Enemy.key,
      effector: -1,
      turn: 1,
      time: "night",
      hasEffect: true,
      manual: true,
      payload: {
        target: enemyPlayerIdx
      }
    });
  }
};

exports.All = All;
exports.Artist = Artist;
exports.Assassin = Assassin;
exports.Barber = Barber;
exports.Baron = Baron;
exports.BecomeDemon = BecomeDemon;
exports.Butler = Butler;
exports.Cerenovus = Cerenovus;
exports.Chambermaid = Chambermaid;
exports.CharacterForKey = CharacterForKey;
exports.CheckImp = CheckImp;
exports.Chef = Chef;
exports.ChooseMaster = ChooseMaster;
exports.Clockmaker = Clockmaker;
exports.Courtier = Courtier;
exports.Defense = Defense;
exports.Devilsadvocate = Devilsadvocate;
exports.DigKnowCharacter = DigKnowCharacter;
exports.Dreamer = Dreamer;
exports.Drunk = Drunk;
exports.DrunkAbility = Drunk2;
exports.Empath = Empath;
exports.Enemy = Enemy;
exports.Eviltwin = Eviltwin;
exports.Excute = Excute;
exports.ExcuteByRack = ExcuteByRack;
exports.Exorcist = Exorcist;
exports.Fanggu = Fanggu;
exports.Flowergirl = Flowergirl;
exports.Fool = Fool;
exports.FortuneTeller = FortuneTeller;
exports.Gambler = Gambler;
exports.Godfather = Godfather;
exports.Goon = Goon;
exports.Gossip = Gossip;
exports.Grandmother = Grandmother;
exports.Guard = Guard;
exports.Imp = Imp;
exports.Innkeeper = Innkeeper;
exports.Investigator = Investigator;
exports.Juggler = Juggler;
exports.Kill = Kill;
exports.Klutz = Klutz;
exports.KnowAbsent = KnowAbsent;
exports.KnowEvilAround = KnowEvilAround;
exports.KnowMinions = KnowMinions;
exports.KnowOutsiders = KnowOutsiders;
exports.KnowSeat = KnowSeat;
exports.KnowTownsfolk = KnowTownsfolk;
exports.Librarian = Librarian;
exports.Lunatic = Lunatic;
exports.Mastermind = Mastermind;
exports.Mathematician = Mathematician;
exports.Mayor = Mayor;
exports.Minstrel = Minstrel;
exports.Monk = Monk;
exports.Moonchild = Moonchild;
exports.Mutant = Mutant;
exports.Nodashii = Nodashii;
exports.Nomination = Nomination;
exports.Oracle = Oracle;
exports.Pacifist = Pacifist;
exports.Peep = Peep;
exports.Philosopher = Philosopher;
exports.Pithag = Pithag;
exports.Po = Po;
exports.Poison = Poison;
exports.Poisoner = Poisoner;
exports.Professor = Professor;
exports.Pukka = Pukka;
exports.Ravenkeeper = Ravenkeeper;
exports.Recluse = Recluse;
exports.Sage = Sage;
exports.Sailor = Sailor;
exports.Saint = Saint;
exports.Savant = Savant;
exports.Scapegoat = Scapegoat;
exports.ScarletWoman = ScarletWoman;
exports.Seamstress = Seamstress;
exports.Shabaloth = Shabaloth;
exports.Slay = Slay;
exports.Slayer = Slayer;
exports.Snakecharmer = Snakecharmer;
exports.Soldier = Soldier;
exports.Spy = Spy;
exports.Sweetheart = Sweetheart;
exports.Tealady = Tealady;
exports.Tinker = Tinker;
exports.Towncrier = Towncrier;
exports.Transform = Transform;
exports.Undertaker = Undertaker;
exports.Vigormortis = Vigormortis;
exports.Virgin = Virgin;
exports.Vortox = Vortox;
exports.WakenKnowCharacter = WakenKnowCharacter;
exports.Washerwoman = Washerwoman;
exports.Witch = Witch;
exports.Zombuul = Zombuul;
exports.copyPlayers = copyPlayers;
exports.createOperation = createOperation;
exports.getAbility = getAbility;
exports.hasRealAbility = hasRealAbility;
exports.isAlivePlayer = isAlivePlayer;
exports.isDeadPlayer = isDeadPlayer;
exports.nextTimeline = nextTimeline;
exports.setupTimelines = setupTimelines;
exports.timelinesWithPlayerStatus = timelinesWithPlayerStatus;
exports.updatePayload = updatePayload;
