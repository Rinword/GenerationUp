//файл содержит всю информацию по выбранным специальностям
// const langdict = require('./langdict');

module.exports = {
    initClass: function (obj) {
        let first = obj.data.classCode.charAt(0);
        let second = obj.data.classCode.charAt(1);
        obj.charData.classData = {};
        obj.charData.classData[this.data[first].name] = this.data[first];
        obj.charData.classData[this.data[second].name] = this.data[second];
    },

    findSkill(name) {
         for( let spec in this.data) {
             if(this.data[spec].skills[name] !== undefined) return this.data[spec].skills[name];
         }

         return null;
    },
    getSpecNameByCode(code) {
        return this.data[code].name || null
    },

    returnAllSkills() {
        let me = this;
        let resObj = {};
        for(let cls in me.data) {
            for(let item in me.data[cls].skills) {
                resObj[me.data[cls].skills[item].iconName] = me.data[cls].skills[item];
            }
        };
        // langdict.refactorLang(resObj); //дополнение массива названиями для выбранного языка
        return resObj;
    },

    data: {
        '0': {
            name: 'warcraft',
            langName: 'Ратное дело',
            description: 'Бойцы, обучаемые владению мечом, непревзойденные мастера ближнего боя',
            skills: {
                mortalStrike: {
                    description: 'Жестокий удар, наносящий 15 ед. урона  + урон оружия.' +
                    ' Кроме того восстановление здоровья жертвы из любых источников снижено на 25% на 8 сек.',
                    name: 'mortalStrike',
                    langName: 'Смертельный удар',
                    damageType: 'physical',
                    tooltipType: 'skill',
                    target: 'enemy', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 40,
                        mpCost: 10
                    },
                    buffs: [
                        '+5% урона за каждую единицу силы атаки'
                    ],
                    effects: [
                        {
                            damageType: 'physical',
                            buff: false,
                            self: false,
                            duration: 8000,
                            effectType: 'healReduce',
                            values: {
                                hpRegen: 25
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 0,
                    coolDownTime: 10000,
                    coolDownCurrTime: 0,
                    calcDamage: function (stats) {
                        return +( (15 + stats.attack * (1 + 0.05 * stats.attackPower)).toFixed(0) )
                    },
                    damage: 15,
                    range: 1,
                    iconName: '_skills_warcraft_1'
                }
            }
        },
        '1': {
            name: 'defence',
            langName: 'Защита',
            description: 'Выносливые воины, способные выдерживать град ударов страшных чудищ и использовать силу врагов против них же',
            skills: {
                deepDefence: {
                    description: 'Герой уходит в глухую оборону, снижая весь получаемый урона на 40% на 8 секунд. Урон снижается не менее, чем на сумму силы и выносливости',
                    name: 'deepDefence',
                    langName: 'Глухая оборона',
                    damageType: 'physical',
                    tooltipType: 'skill',
                    target: 'friendly', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 40,
                        mpCost: 10
                    },
                    buffs: [
                        '+1 ед. снижения урона за каждую единицу силы и выносливости'
                    ],
                    effects: [
                        {
                            type: 'physical',
                            buff: true,
                            self: true,
                            duration: 8000,
                            effectType: 'charBuff',
                            values: {
                                defence: 40,
                                armor: 1+1,
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 0,
                    coolDownTime: 20000,
                    coolDownCurrTime: 0,
                    // damage: 30 + this.charData.current.attack * (1 + 0.05 * this.charData.current.attackPower),
                    damage: 0,
                    range: 0,
                    iconName: '_skills_defence_1'
                }
            }
        },
        '2': {
            name: 'light',
            langName: 'Свет',
            description: 'Адепты школы Света используют свои заклинания для поддержки союзников на поле боя',
            skills: {
                healing: {
                    // socket: 0,
                    description: 'Восстанавливает союзному живому существу 30 ед. здоровья.',
                    name: 'healing',
                    langName: 'Исцеление',
                    damageType: 'light',
                    tooltipType: 'skill',
                    target: 'friendly', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 10,
                        mpCost: 30
                    },
                    buffs: [
                        '+15% величины исцеления за каждую единицу силы заклинаний'
                    ],
                    effects: [
                        {
                            type: 'light',
                            buff: true,
                            self: true,
                            duration: 8000,
                            effectType: 'charBuff',
                            values: {
                                defence: 40,
                                armor: 1+1,
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 2000,
                    coolDownTime: 6000,
                    coolDownCurrTime: 0,
                    // damage: 30 + this.charData.current.attack * (1 + 0.05 * this.charData.current.attackPower),
                    damage: 15,
                    range: 3,
                    iconName: '_skills_light_1'
                }
            }
        },
        '3': {
            name: 'shadow',
            langName: 'Тьма',
            description: 'Бурлящие внутри приверженцев силы зла заставляют их врагов страдать',
            skills: {
                corruption: {
                    // socket: 0,
                    description: 'Насылает на противника порчу, нанося ему 10 урона школы тьмы каждые 2 сек в течение 10 сек',
                    name: 'corruption',
                    langName: 'Порча',
                    damageType: 'shadow',
                    tooltipType: 'skill',
                    target: 'enemy', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 40,
                        mpCost: 60
                    },
                    buffs: [

                    ],
                    effects: [
                        {
                            type: 'shadow',
                            buff: false,
                            self: false,
                            duration: 8000,
                            effectType: 'DOT',
                            values: {
                                damage: 10,
                                tick: 2000,
                                ticksCnt: 5
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 0,
                    coolDownTime: 12000,
                    coolDownCurrTime: 0,
                    // damage: 30 + this.charData.current.attack * (1 + 0.05 * this.charData.current.attackPower),
                    damage: 50,
                    range: 3,
                    iconName: '_skills_shadow_1'
                }
            }
        },
        '4': {
            name: 'elements',
            langName: 'Стихии',
            description: 'Могущественные чародеи, подчинившие себе разрушительные силы стихий',
            skills: {
                fireball: {
                    description: 'Шар раскаленного огня наносит 15 урона на расстоянии до 3 клеток.',
                    name: 'fireball',
                    langName: 'Огненный шар',
                    damageType: 'elements',
                    tooltipType: 'skill',
                    target: 'enemy', //friendly, cell
                    cost: {
                        epCost: 10,
                        mpCost: 40
                    },
                    buffs: [
                        '+10% урона за каждую единицу силы заклинаний',
                        '+7% к дальности за единицу интеллекта'
                    ],
                    effects: [
                    ],

                    castTime: 1500,
                    coolDownTime: 4000,
                    coolDownCurrTime: 0,
                    calcDamage: function (stats) {
                        return +( (15 * (1 + 0.1 * stats.spellPower)).toFixed(0) )
                    },
                    damage: 15,
                    flySpeed: 200,
                    range: 5,
                    iconName: '_skills_elements_1'
                }
            }
        },
        '5': {
            name: 'nature',
            langName: 'Природа',
            description: 'Отшельники приручившие саму природу способны как поддержать, так и навредить',
            skills: {
                stun: {
                    description: 'Оглушает противника на 5 сек.',
                    name: 'stun',
                    langName: 'Оглушение',
                    damageType: 'physical',
                    tooltipType: 'skill',
                    target: 'enemy', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 30,
                        mpCost: 50
                    },
                    buffs: [
                        '+0.1 сек оглушения за каждую единицу силы атаки и заклинаний'
                    ],
                    effects: [
                        {
                            type: 'nature',
                            buff: false,
                            self: false,
                            duration: 5000,
                            effectType: 'stun',
                            values: {
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 0,
                    coolDownTime: 10000,
                    coolDownCurrTime: 0,
                    // damage: 30 + this.charData.current.attack * (1 + 0.05 * this.charData.current.attackPower),
                    damage: 40,
                    range: 2,
                    iconName: '_skills_nature_1'
                }
            }
        },
        '6': {
            name: 'hunt',
            langName: 'Охота',
            description: 'Искусные следопыты, в совершенстве владеющие луком, кинжалами и расстановкой ловушек',
            skills: {
                trueShot: {
                    description: 'Выстрел, наносящий 25 урона на расстоянии от 2 до 4 клеток.',
                    name: 'trueShot',
                    langName: 'Верный выстрел',
                    damageType: 'physical',
                    tooltipType: 'skill',
                    target: 'enemy', //friendly, cell
                    cost: {
                        // epCost: this.charData.gear.leftHand.size == 1 ? 10 : 30,
                        epCost: 30,
                        mpCost: 10
                    },
                    buffs: [
                        '+10% урона за каждую единицу силы атаки',
                        '+10% дальности за каждую единицу ловкости'
                    ],
                    effects: [
                        {
                            type: 'nature',
                            buff: false,
                            self: false,
                            duration: 5000,
                            effectType: 'stun',
                            values: {
                            },
                            iconName: '_warcraft_buffs_healReduce'
                        }
                    ],
                    castTime: 0,
                    coolDownTime: 10000,
                    coolDownCurrTime: 0,
                    // damage: 30 + this.charData.current.attack * (1 + 0.05 * this.charData.current.attackPower),
                    damage: 20,
                    range: 4,
                    iconName: '_skills_hunt_1'
                }
            }
        },
    },
}