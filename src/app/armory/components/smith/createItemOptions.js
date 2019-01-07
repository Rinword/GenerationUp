export const pointsFromRare = {
    0: { points: 6, stats: 1, maxRequiredStats: 1 },
    1: { points: 12, stats: 2, maxRequiredStats: 2 },
    2: { points: 18, stats: 2, maxRequiredStats: 2 },
    3: { points: 24, stats: 3, maxRequiredStats: 2 }
}

export const baseItemConfig = [
    {
        type: "text",
        model: "name",
    },
    {
        type: "icon-cell-picker",
        model: "rare",
        options: [
            { name: "usual", value: 0, icon: 'rare_usual' },
            { name: "unusual", value: 1, icon: 'rare_unusual' },
            { name: "rare", value: 2, icon: 'rare_rare' },
            { name: "epic", value: 3, icon: 'rare_epic' },
            { name: "legendary", value: 4, icon: 'rare_legendary' },
        ]
    },
    {
        type: "icon-cell-picker",
        model: "type",
        options: [
            { name: "one-hand weapon", value: "oneHandWeapon", icon: "weapon_one_hand" },
            { name: "two-hand weapon", value: "twoHandWeapon", icon: "weapon_two_hand" },
            { name: "light armor", value: "lightArmor", icon: "armor_light" },
            { name: "medium armor", value: "mediumArmor", icon: "armor_medium" },
            { name: "heavy armor", value: "heavyArmor", icon: "armor_heavy" },
        ]
    },
    {
        type: "icon-cell-picker",
        model: "subtype",
        options: [
            { name: "dagger", value: "dagger", icon: "weapon_dagger" },
            { name: "sword", value: "sword", icon: "weapon_sword" },
            { name: "shield", value: "shield", icon: "armor_shield" },
        ],
        showIf: {
            path: "type",
            value: "oneHandWeapon"
        }
    },
    {
        type: "icon-cell-picker",
        model: "subtype",
        options: [
            { name: "dagger", value: "dagger", icon: "weapon_dagger" },
            { name: "sword", value: "sword", icon: "weapon_sword" },
            { name: "shield", value: "shield", icon: "armor_shield" },
        ],
        showIf: {
            path: "type",
            oneOfValues: ["lightArmor", "mediumArmor", "heavyArmor"]
        }
    }
]