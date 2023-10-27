import { EKind, ICharacter } from "./character";

export const GroupedChatacters = (characters: ICharacter[]) => {
    const groupMap = characters.reduce((previousValue, character) => {
        if (character.kind in previousValue) {
            previousValue[character.kind].push(character)
        } else {
            previousValue[character.kind] = [character]
        }
        return previousValue
    }, {} as Record<EKind, ICharacter[]>)

    const groupedOrder: EKind[] = ["Townsfolk", "Outsiders", "Minions", "Demons"]

    return groupedOrder.map(kind => {
        const characters = groupMap[kind]
        if (!characters) {
            return null
        }
        return {
            kind,
            characters
        }
    }).filter(item => !!item) as { kind: EKind, characters: ICharacter[] }[]
}