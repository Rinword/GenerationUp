export const pointsFromRare = {
    usual: { points: 6, stats: 1, maxRequiredStats: 1 },
    unusual: { points: 12, stats: 2, maxRequiredStats: 2 },
    rare: { points: 18, stats: 2, maxRequiredStats: 2 },
    epic: { points: 24, stats: 3, maxRequiredStats: 2 },
    legendary: { points: 24, stats: 3, maxRequiredStats: 2 }
}

export const baseItemConfig = [
    {
        type: "text",
        model: "name",
        defaultValue: "Name",
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
        defaultValue: "usual",
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
        defaultValue: "oneHandWeapon",
        options: [
            { name: "one-hand weapon", value: "oneHandWeapon", icon: "weapon_one_hand" },
            { name: "two-hand weapon", value: "twoHandWeapon", icon: "weapon_two_hand" },
            { name: "light armor", value: "lightArmor", icon: "armor_light" },
            { name: "medium armor", value: "mediumArmor", icon: "armor_medium" },
            { name: "heavy armor", value: "heavyArmor", icon: "armor_heavy" },
        ],
        resetValuesOnChange: ['subtype']
    },
    {
        type: "icon-cell-picker",
        model: "subtype",
        subModel: "oneHandWeapon",
        defaultValue: "dagger",
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
        subModel: "twoHandWeapon",
        defaultValue: "staff",
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
        model: "subtype",
        subModel: "armor",
        defaultValue: "gloves",
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