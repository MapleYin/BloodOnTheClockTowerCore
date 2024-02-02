type DistributeOperation<T extends PayloadKey> = T extends any ? {
    seat: number
    skill: ISkill
    players: IPlayer[]
    payloadKey: T
    payload?: PayloadDefind[T]
    manual?: boolean
} : never

type IOperation = DistributeOperation<ISkill["type"]>
