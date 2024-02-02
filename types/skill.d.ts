declare namespace Payload {
    interface Player {
        seat: number
    }
    interface Players {
        seats: number[]
    }
    interface Number {
        number: number
    }
    interface Character {
        character: string
    }
    interface Characters {
        characters: string[]
    }
    interface Result {
        result: boolean
    }
    interface TimeLine {
        timeline: true
    }

    namespace Options {
        interface Character {
            character: {
                requireInput?: boolean
                static?: string;
                kinds?: EKind[];
                exist?: "inGame" | "notInGame" | "all";
            } & Options.Range

        }
        interface Player {
            player: {
                requireInput?: boolean
                dead?: boolean;
                kinds?: EKind[];
            } & Options.Range
        }
        interface Range<T = number> {
            range?: {
                min?: T;
                max?: T;
            }
        }
        interface Result {
            result: {
                display?: [string, string]
                prompt: string
                subPrompt?: string
                default?: boolean
            }
        }
        interface Output {
            output?: {
                disabled?: boolean
            }
        }

        interface Display {
            display?: {
                excution?: boolean
                players?: boolean
            }
        }
    }
}

type PayloadDefind = {
    "C": Payload.Character,
    "N": Payload.Number,
    "P": Payload.Player,
    "PS": Payload.Players,
    "CS": Payload.Characters,
    "P_C": Payload.Player & Payload.Character,
    "P_N": Payload.Player & Payload.Number,
    "P_CS": Payload.Player & Payload.Characters,
    "P_R": Payload.Player & Payload.Result,
    "PS_R": Payload.Players & Payload.Result,
    "PS_C": Payload.Players & Payload.Character,
    "T": Payload.TimeLine,
    "NM": Payload.Player & Payload.Players & Payload.Result,
    "A": ITimeline
}

type PayloadOptionDefind = {
    "C": Payload.Options.Character;
    "N": Payload.Options.Range;
    "P": Payload.Options.Player;
    "PS": Payload.Options.Player;
    "CS": Payload.Options.Character;
    "P_C": Payload.Options.Player & Payload.Options.Character;
    "P_N": Payload.Options.Player & Payload.Options.Range;
    "P_CS": Payload.Options.Character & Payload.Options.Player;
    "P_R": Payload.Options.Player & Payload.Options.Result;
    "PS_R": Payload.Options.Player & Payload.Options.Result;
    "PS_C": Payload.Options.Character & Payload.Options.Player;
    "T": {};
    "NM": {};
    "A": {}
}

type PayloadKey = keyof PayloadDefind
type PayloadType = PayloadDefind[PayloadKey]
type PayloadOptions = PayloadOptionDefind[PayloadKey]

interface IContext {

    timeline: ITimeLine

    player: IPlayer
    
    players: IPlayer[]
}

type ISkill = {
    key: string
    description: string

    valid: (context: IContext) => boolean

    effect?: (effector: number, payload: PayloadDefind[PayloadKey], players: IPlayer[]) => void

    /**
     * @deprecated use `type` instead
     */
    payloadKey?: PayloadKey
    type: PayloadKey
    options: PayloadOptionDefind[PayloadKey] & Payload.Options.Output & Payload.Options.Display
}