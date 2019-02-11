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
        defaultValue: "epic",
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

export const ratingsList = {
    critChance: {
        label: 'Рейт. крит. удара',
        sources: {
            agility: 0.5,
            intellect: 0.5
        }
    },
    critMultiplier: {
        label: 'Множитель крит. урона',
        sources: { agility: 1 }
    },
    hasteRating: {
        label: 'Рейтинг скорсти',
        sources: { agility: 1, stamina: 0.7 }
    },
    attackPower: {
        label: 'Сила атаки',
        sources: {strength: 0.5, agility: 0.5 }
    },
    spellPower: {
        label: 'Сила заклинаний',
        sources: { intellect: 0.5 }
    },
    hpMax: {
        label: 'Макс. здоровье',
        sources: {strength: 7, stamina: 10}
    },
    mpMax: {
        label: 'Макс. мана',
        sources: {intellect: 10}
    },
    epMax: {
        label: 'Макс. энергия',
        sources: {agility: 2, stamina: 2}
    },
    hpRegen: {
        label: 'Восстан. здоровья',
        sources: {stamina: 0.5, spirit: 0.7}
    },
    mpRegen: {
        label: 'Восстан. маны',
        sources: {stamina: 0.5, spirit: 0.7}
    },
    epRegen: {
        label: 'Восстан. энегрии',
        sources: {spirit: 1, stamina: 1}
    },
    defenceRating: {
        label: 'Рейтинг защиты',
        sources: { strength: 1, stamina: 2 }
    }
}

export const convertedRatingList = Object.keys(ratingsList).map(value => ({ ...ratingsList[value], value}))

export const statsOptions = [
    { label: 'Сила', value: 'strength' },
    { label: 'Ловкость', value: 'agility' },
    { label: 'Интеллект', value: 'intellect' },
    { label: 'Выносливость', value: 'stamina' },
    { label: 'Дух', value: 'spirit' },
]

export const specialItemConfig = {
    weapon: [
        {
            type: 'counter',
            model: 'damage',
            defaultValue: 0,
            minValue: -5,
            maxValue: 5,
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
            minValue: -5,
            maxValue: 5,
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
                    model: 'names.stat1',
                    defaultValue: 'attackPower',
                    style: {
                        display: 'row',
                        size: 'l',
                    },
                    options: convertedRatingList,
                    excludedOptions: {
                        statePath: 'blockedStats.stat1'
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
                    model: 'names.stat2',
                    style: {
                        display: 'row',
                        size: 'l',
                    },
                    excludedOptions: {
                        statePath: 'blockedStats.stat2'
                    },
                    defaultValue: 'critChance',
                    options: convertedRatingList,
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
                    model: 'names.stat3',
                    defaultValue: 'critMultiplier',
                    style: {
                        size: 'full',
                        displayMode: 'stickers',
                    },
                    excludedOptions: {
                        statePath: 'blockedStats.stat3'
                    },
                    options: convertedRatingList,
                    showIf: {
                        statePath: 'stats',
                        moreThan: 2
                    }
                },
                {
                    type: 'counter',
                    model: 'stat3',
                    defaultValue: 3,
                    minValue: 3,
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
            type: 'row',
            style: {
                jc: 'space-between',
                margin: '20px 0 0'
            },
            list: [
                {
                    type: 'select',
                    model: 'nameReq.require1',
                    defaultValue: 'strength',
                    style: {
                        displayMode: 'stickers',
                        size: 'full',
                    },
                    props: {
                        clearValueIfExcluded: true,
                    },
                    excludedOptions: {
                        statePath: 'blockedRequiredStats.require1'
                    },
                    disabledOptions: {
                        statePath: 'disabledRequiredStats.require1'
                    },
                    options: statsOptions,
                    showIf: {
                        statePath: 'maxRequiredStats',
                        moreThan: 0
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
                        size: 's',
                    },
                    showIf: {
                        statePath: 'maxRequiredStats',
                        moreThan: 0
                    }
                },
            ],
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 0
            }
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
                    model: 'nameReq.require2',
                    defaultValue: 'agility',
                    style: {
                        displayMode: 'stickers',
                        size: 'full',
                    },
                    props: {
                        clearValueIfExcluded: true,
                    },
                    excludedOptions: {
                        statePath: 'blockedRequiredStats.require2'
                    },
                    disabledOptions: {
                        statePath: 'disabledRequiredStats.require2'
                    },
                    options: statsOptions,
                    showIf: {
                        statePath: 'maxRequiredStats',
                        moreThan: 1
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
                        size: 's',
                    },
                    showIf: {
                        statePath: 'maxRequiredStats',
                        moreThan: 1
                    }
                },
            ],
            showIf: {
                statePath: 'maxRequiredStats',
                moreThan: 1
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