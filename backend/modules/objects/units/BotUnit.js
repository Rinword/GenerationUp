const BaseUnit = require('./baseUnit');
const helpers =  require('../../helpers');
const specData = require('../../dataToDB/SpecData');
const PF = require('pathfinding');

const BOT_ACTIVITY_LOWER = 20; //двигательная активность ботов, 20 - беспокойные, 200 - нормальные, 2000 - еле подвижные
const HIGHLIGHT_VIEW_RADIUS = true; //подсветка радиуса обзора текущего выбранного юнита
const UPDATE_DISTANCES_TICK = 30; //частота обновления окружающих объектов, каждые 15/60 кадров/сек = 4 раза в секунду

class BotUnit extends BaseUnit {
    constructor(name, x, y, grid, map) {
        super(x, y, grid, map);

        this.type = 'unit'; //charItem, mapItem, unit
        this.name = name;
        this.movable = true;
        this.destructable = true;
        this.color = helpers.getRandomColor();

        this.setRandomStats = this.setRandomStats.bind(this);
        this.updateStatsFromGear = this.updateStatsFromGear.bind(this);
        this.initClassSkills = this.initClassSkills.bind(this);

        this.setRandomStats(4);
        this.updateStatsFromGear();

        this.charData.skills.active.autoAttack = { //тут строго надо соблюдать одинаковость названия атрибута и name внутри него для обеспечения удобного доступа
            socket: 0,
            name: 'autoAttack',
            langName: 'Автоатака',
            cost: {
                epCost: this.charData.gear.leftHand.size === 1 ? 10 : 30
            },
            target: 'enemy',
            castTime: this.charData.gear.leftHand.castTime,
            coolDownTime: this.charData.gear.leftHand.coolDownTime,
            coolDownCurrTime: 0,
            damage: this.charData.gear.leftHand.damage,
            currentDamage: this.charData.gear.leftHand.damage,
            calcDamage: stats => {
                return this.charData.gear.leftHand.damage * (1 + 0.05 * stats.attackPower);
            },
            range: this.charData.gear.leftHand.range,
            damageType: this.charData.gear.leftHand.damageType,
            iconName: '_skills_unit_melee_autoattack',
            tooltipType: 'skill',
        }

        this.initClassSkills();
        // // добавляем по случайному скилу из каждой специальности
        this.setRandomSkillFromSpec(specData.getSpecNameByCode(this.data.classCode.charAt(0)));
        this.setRandomSkillFromSpec(specData.getSpecNameByCode(this.data.classCode.charAt(1)));

        // this.updateActionsList();
    }

    initClassSkills() {
        specData.initClass(this); //по коду специальностей загружает скилы, таланты и прочее для текущего бота
    }

    setRandomStats(num) {
        let addStatsPoints = num;

        while(1) {
            for(let stat in this.charData.stats.base) {
                if(helpers.randomInteger(0, 10) < 2) {
                    this.charData.stats.base[stat] += 1;
                    this.charData.stats.current[stat] += 1;
                    addStatsPoints--;
                    if(addStatsPoints === 0) break;
                }
            }
            if(addStatsPoints === 0) break;
        }
    }

    updateStatsFromGear() {
        let gear = this.charData.gear;

        for (let item in gear) {
            if (gear[item]) {
                gear[item].stats.forEach(stats => {
                    for (let stat in stats) {
                        this.charData.gearStats[stat] += stats[stat];
                    }
                });
                if (gear[item].armor) {
                    this.charData.gearStats.armor += gear[item].armor;
                }
            }

        }
    }

    setSkill(skillName) {
        let skill = specData.findSkill(skillName);
        let aSkills = this.charData.skills.active;
        let aSlsCnt = 0;
        for(let pr in aSkills) {aSlsCnt++}
        if(aSlsCnt > 5) return;
        this.charData.skills.active[skillName] = Object.assign({}, skill);
        this.charData.skills.active[skillName].socket = aSlsCnt;
    }

    setRandomSkillFromSpec(specName) {
        let skillsArr = [];
        let skillsObj = this.charData.classData[specName].skills;
        for(let skill in skillsObj) {
            skillsArr.push(skill);
        }
        this.setSkill( skillsArr[helpers.randomInteger(0, skillsArr.length - 1)] )
    }
}

module.exports = BotUnit;
