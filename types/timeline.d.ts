interface ITimelineExtra {
    excuteInDay?: IPlayer
}
interface ITimeline {
    /**
     * @deprecated use `bookKey` instead
     */
    book?: IBook

    bookKey: string

    turn: number
    time: "day" | "night"

    players: IPlayer[]
    operatedPlayers: IPlayer[]

    operations: IOperation[]

    extra?: ITimelineExtra
}