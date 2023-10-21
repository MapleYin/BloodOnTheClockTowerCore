import { ICharacter } from "./character";
import { IPlayer } from "./player";
import { ISkill } from "./skill";
declare namespace Payload {
    interface Player {
        player: IPlayer;
    }
    interface Players {
        players: IPlayer[];
    }
    interface Number {
        number: number;
    }
    interface Character {
        character: ICharacter;
    }
    interface Characters {
        characters: ICharacter[];
    }
    interface Result {
        result: boolean;
    }
    interface TimeLine {
        timeline: true;
    }
}
type PayloadDefind = {
    "C": Payload.Character;
    "N": Payload.Number;
    "P": Payload.Player;
    "PS": Payload.Players;
    "CS": Payload.Characters;
    "P_C": Payload.Player & Payload.Character;
    "P_N": Payload.Player & Payload.Number;
    "P_CS": Payload.Player & Payload.Characters;
    "P_R": Payload.Player & Payload.Result;
    "PS_R": Payload.Players & Payload.Result;
    "PS_C": Payload.Players & Payload.Character;
    "T": Payload.TimeLine;
    "NM": Payload.Player & Payload.Players & Payload.Result;
};
type Operations = {
    "KnowTownsfolk": "PS_C";
    "KnowOutsiders": "PS_C";
    "KnowMinions": "PS_C";
    "KnowSeat": "N";
    "KnowEvilAround": "N";
    "CheckImp": "PS_R";
    "DigKnowCharacter": "P_C";
    "Guard": "P";
    "WakenKnowCharacter": "P_C";
    "Excute": "P_R";
    "Slay": "P_R";
    "Scapegoat": "P";
    "ChooseMaster": "P";
    "Poison": "P";
    "Peep": "T";
    "BecomeImp": "C";
    "Kill": "P_R";
    "KnowAbsent": "CS";
    "Tramsform": "P";
};
export type OperationName = keyof Operations;
type DistributeOperation<T extends OperationName> = T extends any ? {
    name: T;
    skill: ISkill;
    payload?: PayloadDefind[Operations[T]];
} : never;
export type IOperation = DistributeOperation<OperationName>;
export declare const CreateOperation: (skill: ISkill) => IOperation;
export {};
