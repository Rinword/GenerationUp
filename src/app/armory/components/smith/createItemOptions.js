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
        inputStyle: {
            fontSize: '32px',
            paddingLeft: 0,
        }
    },
    {
        type: "icon-cell-picker",
        model: "rare",
        props: {
            noBg: true,
        },
        options: [
            { name: "usual", value: "usual", icon: 'common_usual' },
            { name: "unusual", value: "unusual", icon: 'common_unusual' },
            { name: "rare", value: "rare", icon: 'common_rare' },
            { name: "epic", value: "epic", icon: 'common_epic' },
            { name: "legendary", value: "legendary", icon: 'common_legendary', disabled: true },
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
        model: "subtype1",
        options: [
            { name: "staff", value: "staff", icon: "weapon_staff" },
            { name: "sword", value: "sword", icon: "weapon_sword" },
            { name: "bow", value: "bow", icon: "weapon_bow" },
        ],
        showIf: {
            path: "type",
            value: "twoHandWeapon"
        }
    },
    {
        type: "icon-cell-picker",
        model: "subtype2",
        options: [
            { name: "gloves", value: "gloves", icon: "armor_gloves" },
            { name: "chest", value: "chest", icon: "armor_chest" },
            { name: "pants", value: "pants", icon: "armor_pants" },
            { name: "boots", value: "boots", icon: "armor_boots" },
        ],
        showIf: {
            path: "type",
            oneOfValues: ["lightArmor", "mediumArmor", "heavyArmor"]
        }
    }
]