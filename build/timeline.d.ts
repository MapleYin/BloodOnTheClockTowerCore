declare function NextTimeline(bookKey: string, players: IPlayer[]): ITimeline;
declare function NextTimeline(lastTimeline: ITimeline): ITimeline;
export { NextTimeline };
export declare const UpdateOperations: (timeline: ITimeline) => void;
