export const pointsFromRare = {
    usual: { points: 6, stats: 1, maxRequiredStats: 1 },
    unusual: { points: 12, stats: 2, maxRequiredStats: 2 },
    rare: { points: 18, stats: 2, maxRequiredStats: 2 },
    epic: { points: 24, stats: 3, maxRequiredStats: 3 },
    legendary: { points: 24, stats: 3, maxRequiredStats: 3 }
}

export const baseItemConfig = [
    {
        type: "text",
        model: "name",
        defaultValue: "Name",
        style: {
            size: 'auto'
        },
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
        style: {
            size: 'auto'
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
        style: {
            size: 'auto'
        },
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
        style: {
            size: 'auto'
        },
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
        style: {
            size: 'auto'
        },
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

export const ratingsList = [
    {
        label: 'Рейт. крит. удара',
        value: 'critChance',
        sources: [{ agility: 0.5 }, { intellect: 0.5 }]
    },
    {
        label: 'Множитель крит. урона',
        value: 'critMultiplier',
        sources: [{ agility: 1 }]
    },
    {
        label: 'Сила атаки',
        value: 'attackPower',
        sources: [{ strength: 0.5 }]
    },
    {
        label: 'Сила заклинаний',
        value: 'epRegen',
        sources: [{ spellPower: 0.5 }]
    },
    {
        label: 'Макс. здоровье',
        value: 'hpMax',
        sources: [{ strength: 7 }, { stamina: 10 }]
    },
    {
        label: 'Макс. мана',
        value: 'mpMax',
        sources: [{ intellect: 10 }]
    },
    {
        label: 'Макс. энергия',
        value: 'epMax',
        sources: [{ agility: 2 }]
    },
    {
        label: 'Восстан. здоровья',
        value: 'hpRegen',
        sources: [{ stamina: 0.5 }, { spirit: 0.7 }]
    },
    {
        label: 'Восстан. маны',
        value: 'mpRegen',
        sources: [{ stamina: 0.5 }, { spirit: 0.7 }]
    },
    {
        label: 'Восстан. энегрии',
        value: 'epRegen',
        sources: [{ spirit: 1 }]
    },
    {
        label: 'Рейтинг защиты',
        value: 'defenceRating',
        sources: [{ strength: 1, stamina: 2 }]
    }
]

export const specialItemConfig = {
    weapon: [
        {
            type: 'counter',
            model: 'damage',
            defaultValue: 0,
            minValue: -2,
            maxValue: 2,
            style: {
                display: 'row',
                margin: 'top_10',
                size: 'full',
            },
            externalStateIncreaseControl: 'blockedRows',
            props: {
                label: 'Damage',
            },
        },
        {
            type: 'counter',
            model: 'DPS',
            defaultValue: 0,
            minValue: -2,
            maxValue: 2,
            style: {
                display: 'row',
                margin: 'top_10',
                size: 'full',
            },
            externalStateIncreaseControl: 'blockedRows',
            props: {
                label: 'DPS'
            }
        },
        {
            type: 'row',
            style: {
                jc: 'space-between',
                margin: '20px 0 0 0',
            },
            list: [
                {
                    type: 'select',
                    model: 'types.stat1',
                    defaultValue: 'critChance',
                    style: {
                        display: 'row',
                        size: 'l',
                    },
                    options: ratingsList,
                    excludedOptions: {
                        statePath: 'blockedStats'
                    },
                    showIf: {
                        statePath: 'stats',
                        moreThan: 0
                    }
                },
                {
                    type: 'counter',
                    model: 'stat1',
                    defaultValue: 0,
                    minValue: -5,
                    maxValue: 5,
                    style: {
                        display: 'row',
                        size: 's',
                    },
                    showIf: {
                        statePath: 'stats',
                        moreThan: 0
                    }
                },
            ],
        },
        {
            type: 'row',
            style: {
                jc: 'space-between',
                margin: '10px 0 0'
            },
            list: [
                {
                    type: 'select',
                    model: 'types.stat2',
                    style: {
                        display: 'row',
                        size: 'l',
                    },
                    excludedOptions: {
                        statePath: 'blockedStats'
                    },
                    defaultValue: 'critMultiplier',
                    options: ratingsList,
                    showIf: {
                        statePath: 'stats',
                        moreThan: 1
                    }
                },
                {
                    type: 'counter',
                    model: 'stat2',
                    defaultValue: 0,
                    minValue: -5,
                    maxValue: 5,
                    style: {
                        display: 'row',
                        size: 's',
                    },
                    showIf: {
                        statePath: 'stats',
                        moreThan: 1
                    }
                },
            ]
        },
        {
            type: 'row',
            style: {
                jc: 'space-between',
                margin: '10px 0 0'
            },
            list: [
                {
                    type: 'select',
                    model: 'types.stat3',
                    defaultValue: 'attackPower',
                    style: {
                        display: 'row',
                        size: 'l',
                    },
                    excludedOptions: {
                        statePath: 'blockedStats'
                    },
                    options: ratingsList,
                    showIf: {
                        statePath: 'stats',
                        moreThan: 2
                    }
                },
                {
                    type: 'counter',
                    model: 'stat3',
                    defaultValue: 0,
                    minValue: -5,
                    maxValue: 5,
                    style: {
                        display: 'row',
                        size: 's',
                    },
                    showIf: {
                        statePath: 'stats',
                        moreThan: 2
                    }
                },
            ],
            showIf: {
                statePath: 'stats',
                moreThan: 2
            }
        },
        {
            type: 'counter',
            model: 'require1',
            defaultValue: 0,
            minValue: -5,
            maxValue: 5,
            externalStateIncreaseControl: 'blockedRows',
            style: {
                display: 'row',
                margin: 'top_20',
                size: 'full',
            },
            props: {
                label: "Require1",
            },
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 0
            }
        },
        {
            type: 'counter',
            model: 'require2',
            defaultValue: 0,
            minValue: -5,
            maxValue: 5,
            externalStateIncreaseControl: 'blockedRows',
            style: {
                display: 'row',
                margin: 'top_10',
                size: 'full',
            },
            props: {
                label: "Require2",
            },
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 1
            }
        },
        {
            type: 'counter',
            model: 'require3',
            defaultValue: 0,
            minValue: -5,
            maxValue: 5,
            externalStateIncreaseControl: 'blockedRows',
            style: {
                display: 'row',
                margin: 'top_10',
                size: 'full',
            },
            props: {
                label: "Require3",
            },
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 2
            }
        }
    ],
    armor: [
        {
            type: 'counter-row',
            model: 'physicalArmor',
            defaultValue: 0,
            props: {
                label: 'Physical armor'
            }
        },
        {
            type: 'counter-row',
            model: 'magicArmor',
            defaultValue: 0,
            props: {
                label: 'Magic armor'
            }
        },
        {
            type: 'select-and-counter',
            model: 'stat1',
            showIf: {
                statePath: 'stats',
                moreThan: 0
            }
        },
        {
            type: 'select-and-counter',
            model: 'stat2',
            showIf: {
                statePath: 'stats',
                moreThan: 1
            }
        },
        {
            type: 'select-and-counter',
            model: 'stat3',
            showIf: {
                statePath: 'stats',
                moreThan: 2
            }
        },
        {
            type: 'select-row',
            model: 'require1',
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 0
            }
        },
        {
            type: 'select-row',
            model: 'require2',
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 1
            }
        }
    ]
}