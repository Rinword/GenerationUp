// const langdict = require('./langdict');
// const specData = require('./SpecData');
const helpers = require('../helpers');

module.exports = {
    getItemById(id) {
        for(let key in this.data) {
            for( let key2 in this.data[key] ) {
                if (this.data[key][key2].iconName === id) return this.data[key][key2];
            }
        }

        return null;
    },

    getItemByName(itemName) {
        for(let key in this.data) {
            for( let key2 in this.data[key] ) {
                if (this.data[key][key2].name === itemName) return this.data[key][key2];
            }
        }

        return null;
    },

    getRandomItemByClassName(className) {
        const items = this.data[className];
        if(!items) return null;

        const rnd = helpers.randomInteger(0, Object.values(items).length - 1)

        return items[rnd];

    },

    // initGetDataListener() { //TODO потом будут просто запросы к серверу,
    //     let itemsDataObj = {};
    //     let me = this;
    //     window.addEventListener('TooltipsSetAllInfo', function (event) {
    //         if(event.detail) {
    //             // me.findRequiredDataWithIdArr(event.detail)
    //             me.returnAllObjects()
    //         }
    //     },false);
    // },

    // findRequiredDataWithIdArr(reqArr) {
    //     let me = this;
    //     let resObj = {};
    //     reqArr.forEach(itemId => {
    //         resObj[itemId] = me.getItemById(itemId);
    //     });
    //     let event = new CustomEvent("TooltipsGetAllInfo", {
    //         detail: resObj  //TODO возврат только имеющихся на странице подсказок. Дохнет, когда юнит обновляется,
    //                         // надо при старте игры формировать список созданных предметов и сразу добавлять его к выдаче
    //     });
    //     window.dispatchEvent(event);
    // },

    // returnAllObjects() {
    //     let me = this;
    //     let resObj = {};
    //     for(let cls in me.data) {
    //         for(let item in me.data[cls]) {
    //             resObj[me.data[cls][item].iconName] = me.data[cls][item];
    //         }
    //     };
    //     langdict.refactorLang(resObj); //дополнение массива названиями для выбранного языка
    //     Object.assign( resObj, specData.returnAllSkills() );
    //     let event = new CustomEvent("TooltipsGetAllInfo", {
    //         detail: resObj  //пока что возвращается список ВСЕХ предметов, а не имеющихся на странице.
    //     });
    //     window.dispatchEvent(event);
    // },

    data: {
        leftHand: {
            0: {
                name: 'Простой полуторный меч',
                type: 'item',
                tooltipType: 'weapon',
                deepType: 'sword',
                size: 2, //двуручный
                itemLevel: 1,
                rare: 0,
                damage: 7,
                range: 1,
                DPS: '4.67',
                castTime: 1000, //время осуществления атаки
                coolDownTime: 1500, //время между атаками
                requires: [{strength: 3}],
                stats:[],
                description: 'Просто. Дешево. Сердито',
                iconName: '_items_leftHand_0'
            },
            1: {
                name: 'Короткий клинок стражника',
                type: 'item',
                tooltipType: 'weapon',
                deepType: 'sword',
                size: 1,
                itemLevel: 1,
                rare: 0,
                damage: 4,
                range: 1,
                DPS: '4.00',
                castTime: 500,
                coolDownTime: 500,
                requires: [{agility: 5}],
                stats:[{critRating: 1}],
                description: '',
                iconName: '_items_leftHand_1'
            },
            2: {
                name: 'Блестящий клеймор',
                type: 'item',
                tooltipType: 'weapon',
                deepType: 'sword',
                size: 2,
                itemLevel: 3,
                rare: 1,
                damage: 18,
                range: 1,
                DPS: '9.00',
                castTime: 1000,
                coolDownTime: 1500,
                requires: [{strength: 6}, {agility: 4}],
                stats:[{attackPower:2}, {critRating: 1}, {hpMax: 10}],
                description: '',
                iconName: '_items_leftHand_2'
            },
            3: {
                name: 'Кованый бурей клинок',
                type: 'item',
                tooltipType: 'weapon',
                deepType: 'sword',
                size: 1,
                itemLevel: 3,
                rare: 2,
                damage: 8,
                range: 1,
                DPS: '8.00',
                castTime: 700,
                coolDownTime: 500,
                requires: [{intellect: 8}],
                stats:[{spellPower:4},{ critRating: 2}, {mpMax: 10}],
                description: 'Запах грозы струится по его лезвию',
                iconName: '_items_leftHand_3'
            },
            4: {
                name: 'Шепот Аиура',
                type: 'item',
                tooltipType: 'weapon',
                deepType: 'sword',
                size: 2,
                itemLevel: 5,
                rare: 3,
                damage: 25,
                range: 1,
                DPS: '12.50',
                castTime: 2000,
                coolDownTime: 2000,
                requires: [{strength: 9}],
                stats:[{attackPower:9}, {critRating: 6}, {epMax: 15}],
                description: 'Иногда едва уловимый голос шепчет о руинах и пепле давно погибшего мира',
                iconName: '_items_leftHand_4'
            },
        },
        chest: {
            0: {
                name: 'Наплеч последнего полководца',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'chest',
                itemLevel: 2,
                rare: 2,
                armorType: 1, //1 - средний
                armor: 17,
                requires: [{strength: 7}],
                stats:[{attackPower:2}, {critRating: 2}, {hpMax: 25}],
                description: 'Герб сгинувшей во тьме империи все еще угрожающе сияет на груди',
                iconName: '_items_chest_0'
            },
            1: {
                name: 'Крестьянский тулупчик',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'chest',
                itemLevel: 1,
                rare: 0,
                armorType: 1, //1 - средний
                armor: 4,
                requires: [{strength: 3}],
                stats:[{attackPower:1}],
                description: '',
                iconName: '_items_chest_1'
            },
            2: {
                name: 'Вороная бригантина',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'chest',
                itemLevel: 1,
                rare: 1,
                armorType: 2, //1 - средний
                armor: 14,
                requires: [{strength: 5}, {stamina: 4}],
                stats:[{attackPower:1}, {defenceRating: 3}],
                description: '',
                iconName: '_items_chest_2'
            },
        },
        gloves: {
            0: {
                name: 'Перчатки бортника',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'gloves',
                itemLevel: 1,
                rare: 0,
                armorType: 1,
                armor: 3,
                requires: [],
                stats: [],
                description: '',
                iconName: '_items_gloves_0'
            },
            1: {
                name: 'Рукавицы громилы',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'gloves',
                itemLevel: 2,
                rare: 1,
                armorType: 2,
                armor: 8,
                requires: [{strength: 4}],
                stats: [{attackPower: 2}],
                description: '',
                iconName: '_items_gloves_1'
            },
            2: {
                name: 'Перчатки из шкуры Смауга',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'gloves',
                itemLevel: 5,
                rare: 3,
                armorType: 1,
                armor: 12,
                requires: [{intellect: 8}, {spirit:4}],
                stats: [{spellPower: 4}, {critRating: 4}, {mpRegen: 1.5}],
                description: 'Сила огня яростью срывается с кончиков пальцев',
                iconName: '_items_gloves_2'
            },
        },
        boots: {
            0: {
                name: 'Кметские обмотки',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'boots',
                itemLevel: 1,
                rare: 0,
                armorType: 0,
                armor: 1,
                requires: [],
                stats:[],
                description: '',
                iconName: '_items_boots_0'
            },
            1: {
                name: 'Высокие армейские сапоги',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'boots',
                itemLevel: 2,
                rare: 1,
                armorType: 1,
                armor: 4,
                requires: [{stamina: 6}],
                stats:[{hpMax: 30}],
                description: '',
                iconName: '_items_boots_1'
            },
            2: {
                name: 'Мягкие кожаные сапоги',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'boots',
                itemLevel: 3,
                rare: 2,
                armorType: 0,
                armor: 4,
                requires: [{intellect: 5}, {spirit: 6}],
                stats:[{mpMax: 30}, {mpRegen: 1}],
                description: '',
                iconName: '_items_boots_2'
            },
        },
        pants: {
            0: {
                name: 'Разбойничьи штаны',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'pants',
                itemLevel: 2,
                rare: 0,
                armorType: 1,
                armor: 3,
                requires: [],
                stats:[],
                description: 'Чики-брики и в дамки',
                iconName: '_items_pants_0'
            },
            1: {
                name: 'Подрясник боевого мага',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'pants',
                itemLevel: 2,
                rare: 2,
                armorType: 0,
                armor: 4,
                requires: [{intellect: 6}, {spirit: 4}],
                stats:[{mpMax: 20}, {mpRegen: 1}],
                description: 'Искусная работа. Сейчас таких не делают',
                iconName: '_items_pants_1'
            },
            2: {
                name: 'Выкованные титанами поножи',
                type: 'item',
                tooltipType: 'wear',
                deepType: 'pants',
                itemLevel: 4,
                rare: 3,
                armorType: 2,
                armor: 12,
                requires: [{strength: 7}, {stamina: 7}],
                stats:[ {hpMax:30}, {hpRegen: 0.5}, {defenceRating: 2}],
                description: 'Случайно попавший в наш мир могущественный предмет',
                iconName: '_items_pants_2'
            },
        },
    },
}