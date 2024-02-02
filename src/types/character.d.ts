type EKind = "Townsfolk" | "Outsiders" | "Minions" | "Demons"

interface ICharacter {
    key: string
    name: string
    icon: string
    skill: string
    kind: EKind
    abilities: ISkill[]
}