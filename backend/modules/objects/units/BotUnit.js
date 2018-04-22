const BaseUnit = require('./baseUnit');
const helpers =  require('../../helpers');
const specData = require('../../dataToDB/SpecData');

const BOT_ACTIVITY_LOWER = 20; //двигательная активность ботов, 20 - беспокойные, 200 - нормальные, 2000 - еле подвижные
const HIGHLIGHT_VIEW_RADIUS = true; //подсветка радиуса обзора текущего выбранного юнита
const UPDATE_DISTANCES_TICK = 30; //частота обновления окружающих объектов, каждые 15/60 кадров/сек = 4 раза в секунду

class BotUnit extends BaseUnit {
    constructor(name, x, y) {
        super(x, y);

        this.id = null;
        this.type = 'unit'; //charItem, mapItem, unit
        this.name = name;
        this.movable = true;
        this.destructable = true;
        this.color = helpers.getRandomColor();

        // let addStatsPoints = 4;
        // while(1) {
        //     for(let stat in this.charData.stats.base) {
        //         if(randomInteger(0,20) < 2) {
        //             this.charData.stats.base[stat] +=1;
        //             this.charData.stats.current[stat] +=1;
        //             addStatsPoints--;
        //             if(addStatsPoints == 0) break;
        //         }
        //     }
        //     if(addStatsPoints == 0) break;
        // }

        // let unitClass = {};
        // // if(this.name =='bot1') {
        //     unitClass = this.generateUnitClass(0,4)
        // // } else {
        // //     unitClass = this.generateUnitClass();
        // // }

        // this.charData.className = unitClass.className;
        // this.charData.classCode = unitClass.classCode;
        //
        // this.initClass();
        // // добавляем по случайному скилу из каждой специальности
        // this.setRandomSkillFromSpec(specData.getSpecNameByCode(this.charData.classCode.charAt(0)));
        // this.setRandomSkillFromSpec(specData.getSpecNameByCode(this.charData.classCode.charAt(1)));
        // //добавить статы от экипировки и пассивных талантов
        // this.updateStatsFromGear();
        //
        // this.checkEnvironmentObjs();
        // this.updateActionsList();
    }

    // initClass() {
    //     specData.initClass(this); //по коду специальностей загружает скилы, таланты и прочее для текущего бота
    // }
}

module.exports = BotUnit;