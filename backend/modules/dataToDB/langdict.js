const helpers = require('../helpers');

module.exports = {
    data: {
        stats: {
            strength: {
                en: 'strength',
                ru: 'сила'
            },
            agility: {
                en: 'agility',
                ru: 'ловкость'
            },
            intellect: {
                en: 'intellect',
                ru: 'интеллект'
            },
            spirit: {
                en: 'spirit',
                ru: 'дух'
            },
            stamina: {
                en: 'stamina',
                ru: 'выносливость'
            },

            viewRadius: {
                en: 'view radius',
                ru: 'обзор'
            },
            hp: {
                en: 'health',
                ru: 'здоровье'
            },

            hpMax: {
                en: 'max health',
                ru: 'макс. здоровье'
            },
            hpRegen: {
                en: 'h.p./s',
                ru: 'о.з./с'
            },

            mp: {
                en: 'mana',
                ru: 'мана'
            },
            mpMax: {
                en: 'max mana',
                ru: 'макс. мана'
            },
            mpRegen: {
                en: 'm.p./s',
                ru: 'о.м./с'
            },

            ep: {
                en: 'strength',
                ru: 'энергия'
            },
            epMax: {
                en: 'max energy',
                ru: 'макс. энергия'
            },
            epRegen: {
                en: 'e.p./s',
                ru: 'о.э./с'
            },

            critRating: {
                en: 'crit rating',
                ru: 'рейтинг крит. удара'
            },
            critChance: {
                en: 'crit chance',
                ru: 'шанс крит. удара'
            },
            critMultiplier: {
                en: 'crit damage multiplier',
                ru: 'множитель крит. урона'
            },

            defenceRating: {
                en: 'defence rating',
                ru: 'рейтинг защиты'
            },
            defence: {
                en: 'defence',
                ru: 'защита'
            },

            speed: {
                en: 'movement speed',
                ru: 'скорость перемещения'
            },
            armor: {
                en: 'strength',
                ru: 'броня'
            },
            attackPower: {
                en: 'strength',
                ru: 'сила атаки'
            },
            spellPower: {
                en: 'strength',
                ru: 'сила заклинаний'
            },
        }
    },

    setLang(lang) {
        if(!lang) this.lang = 'ru';
        this.lang = lang;
    },

    getPropByName(propName) {
        for(let key in this.data) {
            for(let key2 in this.data[key] ) {
                if (key2 === propName) return this.data[key][key2].ru;
            }
        }

        return null;
    },

    refactorLang(data) {
        let me = this;
        // for(let obj in data) {
        for(let prop in data) {
            if(typeof(data[prop]) === 'object') { //забираемся в stats и requires
                data[prop].length && data[prop].forEach(pr => {
                    for(let inpr in pr) {
                        let refPropValue = me.getPropByName(inpr); //ищем название свойства в словаре strength например
                        if(refPropValue) {
                            pr.langName = helpers.capitalizeFirstLetter(refPropValue);
                            pr.name = refPropValue,
                            pr.value = pr[inpr]; //заменяем {strength: 3} на {name: strength, langName: 'сила', value: 3}
                        }
                    }

                })
            } else {
                let refPropValue = me.getPropByName(prop);
                if(refPropValue) { //!!! Замена поля armor: 17 на armor: {value: 17, langName: 'броня'}
                    data[prop] = {
                        langName: helpers.capitalizeFirstLetter(refPropValue),
                        name: refPropValue,
                        value: data[prop]
                    }
                }
            }
        }
        // }
    }
}