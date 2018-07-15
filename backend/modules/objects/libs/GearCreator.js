const helpers =  require('../../helpers');

class GearCreator  {
    constructor() {
        this.data = {
            chest: {
                0: {
                    name: 'Наплеч последнего полководца',
                    type: 'item',
                    tooltipType: 'wear',
                    deepType: 'chest',
                    rare: 2,
                    armor: { armorType: 1, base: 3, iLevelBase: 1.32 },
                    description: 'Герб сгинувшей во тьме империи все еще угрожающе сияет на груди',
                    iconName: '_items_chest_0'
                },
                1: {
                    name: 'Крестьянский тулупчик',
                    type: 'item',
                    tooltipType: 'wear',
                    deepType: 'chest',
                    rare: 0,
                    armor: { armorType: 1, base: 4, iLevelBase: 1.12 },
                    armorType: 1, //1 - средний
                    description: '',
                    iconName: '_items_chest_1'
                },
                2: {
                    name: 'Вороная бригантина',
                    type: 'item',
                    tooltipType: 'wear',
                    deepType: 'chest',
                    rare: 1,
                    armor: { armorType: 2, base: 8, iLevelBase: 1.42 },
                    requires: [{strength: 5}, {stamina: 4}],
                    stats: [{attackPower: 1}, {defenceRating: 3}],
                    description: '',
                    iconName: '_items_chest_2'
                },
            }
        }

        this.stats = {
            strength: {
                attackPower: 0.5, //0.5 AP за 1 очко
                hpMax: 7,
                defenceRating: 1,
            },
            agility: {
                critChance: 0.5,
                critMultiplier: 1,
                epMax: 1,
            },
            stamina: {
                hpMax: 10,
                hpRegen: 0.5,
                defenceRating: 2,
                epRegen: 1,
            },
            intellect: {
                mpMax: 10,
                critChance: 0.5,
                spellPower: 0.5,
            },
            spirit: {
                hpRegen: 0.7,
                mpRegen: 0.7,
                epRegen: 1,
            },
        }
    }

    createItem(name, level = 1, req, stats) {
        if(!name || isNaN(parseInt(level))) {
            console.warn('wrong data in createItem', name, level)
            return null;
        }

        const source = this._getItemBluePrintByName(name);
        if(source) {
            const req = this._getRandomReq(source.rare);

            return {
                ...source,
                level,
                armor: this._calcArmor(source.armor, source.rare, level),
                magicArmor: this._calcMagicArmor(source.armor, source.rare, level),
                requires: req,
                stats: this._generateStats(level, source.rare, stats, req),
            }
        }

        console.warn('wrong source for', name, source);

        return {};
    }
    
    _calcArmor(armor, rare, level) {
        return ((armor.armorType + 1) * 0.5) * (armor.base + level * armor.iLevelBase) * ((rare + 1) * 1.1)
    }

    _calcMagicArmor(armor, rare, level) {
        return ((2 - armor.armorType) * 0.5) * (3 + level * armor.iLevelBase) * ((rare + 1) * 1.1)
    }

    _generateStats(level = 1, rare, stats, req) {
        const freePoints = 2 * (level - 1) * (1 + 0.25 * rare);

        if(!req) {
            req = this._getRandomReq(rare);
        }
        if(!stats) {
            stats = this._getRandomStats(req, level, rare, freePoints);
        }

        return stats;
    }

    _getRandomReq(rare) {
        return [{strength: 4}, {stamina: 5}]
    }

    _getRandomStats(req, level, rare, freePoints) {
        const res = {};
        if(req) {
            for(let i in req) {
                res[this._getRandomStat(req[i])] = 3 * (req[i] - 2);
                console.log('--RAND', res)
            }
        }
        const statsNum = Object.keys(res).length;

        for(let i in res) {
            res[i] = (3 * (res[i] - 2) + freePoints / statsNum) * this._getCost(res[i]);
        }

        console.log('2) STATS', res);

        return res;
    }

    _getRandomStat(stat) {
        stat = Object.keys(stat)[0];
        const num = helpers.randomInteger(0, Object.keys(this.stats[stat]).length - 1);

        console.log('STAT', num, this.stats[stat][num]);
        return this.stats[stat][num];
    }

    _getCost(stat) {
        for(let m_stat in this.stats) {
            for(let i in this.stats[m_stat]) {
                if(i === stat) {
                    return this.stats[m_stat][i];
                }
            }
        }
        console.warn('wrong name of stat', stat);

        return 0;
    }


    _getItemBluePrintByName(name) {
        if(!name) {
            return null;
        }

        for(let type in this.data) {
            for(let i in this.data[type]) {
                if(this.data[type][i].name === name) {
                    return this.data[type][i];
                }
            }
        }

        console.warn('No matches with', name);

        return null;
    }
}

module.exports = new GearCreator();
