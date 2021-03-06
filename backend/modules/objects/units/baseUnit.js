const BaseObject = require('../baseObject');
const PF = require('pathfinding');

const helpers =  require('../../helpers');
const classResolver = require('../../dataToDB/classResolver');
const itemsStorage = require('../../dataToDB/itemsStorage');

const finder = new PF.AStarFinder();

class BaseUnit extends BaseObject {
    constructor(x, y, grid, map, options) {
        super();

        this.wayGrid = grid;
        this.map = map;
        this._options = options;

        this.baseGeometry = {
            type: 'unit',
            curX: x,
            curY: y,
        };

        this.movingData = {
            direction: null,
            currTimeLength: 0,
            lastMoveTime: 0,
            wayArr: [],
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false,
            speed: helpers.randomInteger(1, 4), // 4 клетки в секунду
        };

        this.charData = {
            level: 1,
            gear: {
                chest: itemsStorage.getRandomItemByClassName('chest'),
                gloves: itemsStorage.getRandomItemByClassName('gloves'),
                pants: itemsStorage.getRandomItemByClassName('pants'),
                boots: itemsStorage.getRandomItemByClassName('boots'),
                leftHand: itemsStorage.getRandomItemByClassName('leftHand'),
                rightHand: null,
                artefact1: null,
                artefact2: null,
            },
            gearStats: {
                strength: 0, agility: 0, stamina: 0, intellect: 0, spirit: 0,
                critRating: 0, critMultiplier: 0,
                defenceRating: 0,
                speed: 0, viewRadius: 0,
                hpRegen: 0, mpRegen: 0, epRegen: 0,
                hpMax: 0, mpMax: 0, epMax: 0,
                attackPower: 0,
                spellPower: 0,
                armor: 0,
            },
            stats: {
                base: {
                    strength: 2, agility: 2, stamina: 2, intellect: 2, spirit: 2,
                },
                baseMapStats: {speed: 2, viewRadius: 80},
                current: {strength: 2, agility: 2, stamina: 2, intellect: 2, spirit: 2,
                    hpRegen: 5.5, mpRegen: 1, epRegen: 6,
                    critRating: 0, critChance: 2, critMultiplier: 2,
                    defenceRating: 0, defence: 2,
                    speed: 200,
                    hp: 50, hpMax: 50, hpPc: 100,
                    mp: 10, mpMax: 50, mpPc: 60,
                    ep: 100, epMax: 100, epPc: 100,
                    viewRadius: 3,
                    attackPower: 2,
                    spellPower: 4,
                    armor: 0,
                    absoluteArmor: 0,
                    attack: 1,
                    castSpeed: 1000 //global Cooldown
                }
            },
            talentsMask:{},
            effects: {
                buffs: [],
                debuffs: []
            }



        };

        this.behaviourData = {
            currentAction: null,
            environmentObjs: [],
            actionsList: [],
            moveRating: 0,
            attackRating: 0,
            brains: {
                actions: [
                    {
                        type: 'skill',
                        name: 'autoAttack',
                        influenceFactors: [
                            {
                                name: 'distanceToTarget',
                                type: 'addend',
                                ratingMask: {
                                    pA: [-1, 0, 1,   4,  10, 100],
                                    v:  [0,  0, 50, 40,  5,  0]
                                }
                            },
                            {
                                name: 'targetHP',
                                type: 'addend',
                                ratingMask: {
                                    p: [0, 20,  40, 60, 80, 100],
                                    v: [40, 50, 50, 40, 60, 20]
                                }
                            },
                            {
                                name: 'targetInAttackRadius',
                                type: 'mult',
                                ratingMask: {
                                    pA: [0, 1],
                                    v:  [0, 100]
                                }
                            }
                        ]
                    },
                    {
                        type: 'skill',
                        name: 'mortalStrike',
                        influenceFactors: [
                            {
                                name: 'distanceToTarget',
                                type: 'addend',
                                ratingMask: {
                                    pA: [-1, 0, 1,   4,  10, 100],
                                    v:  [ 0, 0, 80, 60,  20,  0]
                                }
                            },
                            {
                                name: 'targetHP',
                                type: 'addend',
                                ratingMask: {
                                    p: [0, 20,  40, 60, 80, 100],
                                    v: [80, 80, 70, 40, 30, 60]
                                }
                            },
                            {
                                name: 'targetInAttackRadius',
                                type: 'mult',
                                ratingMask: {
                                    pA: [0, 1],
                                    v:  [0, 100]
                                }
                            },
                            {
                                name: 'selfCD',
                                type: 'mult',
                                ratingMask:{
                                    p:[0,100],
                                    v:[100,0]
                                }
                            },
                            {
                                name: 'hasMana',
                                type: 'mult',
                                ratingMask:{
                                    pA:[0, 'cost', '2cost', 'full'],
                                    v:[0,   90,     100,    100]
                                }
                            },
                            {
                                name: 'hasEnergy',
                                type: 'mult',
                                ratingMask:{
                                    pA:[0, 'cost', '2cost', 'full'],
                                    v: [0,  90,     100,     100]
                                }
                            }
                        ]
                    },
                    {
                        type: 'skill',
                        name: 'fireball',
                        influenceFactors: [
                            {
                                name: 'distanceToTarget',
                                type: 'addend',
                                ratingMask: {
                                    pA: [-1, 0, 1,   4,  10, 100],
                                    v:  [ 0, 0, 60, 100,  80,  80]
                                }
                            },
                            {
                                name: 'targetHP',
                                type: 'addend',
                                ratingMask: {
                                    p: [0,  20, 40, 60, 80, 100],
                                    v: [80, 80, 70, 40, 30, 60]
                                }
                            },
                            {
                                name: 'targetInAttackRadius',
                                type: 'mult',
                                ratingMask: {
                                    pA: [0, 1],
                                    v:  [0, 100]
                                }
                            },
                            {
                                name: 'selfCD',
                                type: 'mult',
                                ratingMask:{
                                    p:[0,100],
                                    v:[100,0]
                                }
                            },
                            {
                                name: 'hasMana',
                                type: 'mult',
                                ratingMask:{
                                    pA:[0, 'cost', '2cost', 'full'],
                                    v: [0,  90,     100,    100]
                                }
                            },
                            {
                                name: 'hasEnergy',
                                type: 'mult',
                                ratingMask:{
                                    pA:[0, 'cost', '2cost', 'full'],
                                    v: [0,  90,     100,     100]
                                }
                            }
                        ]
                    },
                    {
                        type: 'nt_moving',
                        name: 'randomMoving',
                        influenceFactors: [
                            {
                                name: 'enemyCnt',
                                type: 'addend',
                                ratingMask: {
                                    pA: [0,  1,  2, 100],
                                    v:  [70, 30, 10, 0]
                                }
                            },
                        ]
                    },
                    {
                        type: 'moving',
                        name: 'approachToMiliDist',
                        influenceFactors: [
                            {
                                name: 'distanceToTarget',
                                type: 'addend',
                                ratingMask: {
                                    pA: [-1, 1, 3,  20],
                                    v:  [ 0, 0, 50, 20]
                                }
                            },
                            {
                                name: 'targetHP',
                                type: 'addend',
                                ratingMask: {
                                    p: [0, 20,  40, 60, 80, 100],
                                    v: [100, 70, 60, 20, 40, 30]
                                }
                            },
                            {
                                name: 'isEnemy',
                                type: 'mult',
                                ratingMask: {
                                    pA: [0,   1],
                                    v: [100, 50]
                                }
                            },
                        ]
                    }
                ]
            }
        };

        this.data = {
            ...this.generateUnitClass(0, 4),
        }

        this.charData.skills = { //характеристики скиллов приведены для текущих характеристик и талантов. Бафы считаются отдельно
            active: {},
            passive: [],
            aura: []
        };

        this.isWalkable = this.isWalkable.bind(this);
        this.updateNoWalkable = this.updateNoWalkable.bind(this);
        this.getFreeCell = this.getFreeCell.bind(this);
        this.updateStats = this.updateStats.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
        this.checkEnvironmentObjs = this.checkEnvironmentObjs.bind(this);
        this.getCellsInViewRadius = this.getCellsInViewRadius.bind(this);
        this.calculateDistance = this.calculateDistance.bind(this);
        this._getBrainsForSkillName = this._getBrainsForSkillName.bind(this);

        this.checkEnvironmentObjs();
    }

    generateUnitClass(code1, code2) {
        let classCode = '';
        if( typeof code1 !== 'undefined' && typeof code2 !== 'undefined') {
            classCode = code1.toString() + code2.toString()
        } else {
            while(1) {
                classCode = helpers.randomInteger(0, 6).toString() + helpers.randomInteger(0, 6).toString();
                if(classCode[0] !== classCode[1]) break;
            }
        }
        let className = classResolver.getClassNameById(classCode);

        return { className, classCode }
    }

    update(frame, gameData) {
        //random moving
        this.frame = frame;
        let shouldMove = false;
        if(this.movingData.lastMoveTime % 10 === 0) {
            shouldMove = helpers.randomInteger(0, this.movingData.lastMoveTime) >= 60;
        }

        if(!this.movingData.isBusyNow && shouldMove) {
            let cellX = this.baseGeometry.curX;
            let cellY = this.baseGeometry.curY;
            const { x, y } = this.getFreeCell(cellX, cellY);
            this.moveTo(x, y);

            return;
        } else {
            this.movingData.lastMoveTime++;
        }

        this.move();
        this.updateStats();
        this.updateSkills();
        this.checkEnvironmentObjs(gameData);
        this.updateActionsList();
    }

    updateStats() {
        let curStats = this.charData.stats.current;
        let gd = this.charData.gearStats;

        curStats.hpRegen = (1 + gd.hpRegen)*(1 + 0.1*curStats.stamina + 0.05*curStats.spirit);
        curStats.mpRegen = (1 + gd.mpRegen)*(1 + 0.1*curStats.spirit + 0.05*curStats.intellect);
        curStats.epRegen = (3 + gd.epRegen)*(1 + 0.2*curStats.stamina);
        curStats.critRating = +( gd.critRating*(1 + 0.1*curStats.agility) ).toFixed();
        curStats.critChance = +( (helpers.hiperbalNormalizer(curStats.critRating, 50)*100)).toFixed(2);
        curStats.armor = gd.armor;
        curStats.defenceRating = +(gd.defenceRating*(1 + 0.05*curStats.agility + 0.05*curStats.strength)).toFixed(0);
        curStats.defence = +( (helpers.hiperbalNormalizer(curStats.defenceRating, 50)*100)).toFixed(2);
        curStats.speed = (this.charData.stats.baseMapStats.speed + 2*curStats.agility + curStats.strength + 3*curStats.stamina + gd.speed)*(1 + 0.1*curStats.stamina);
        curStats.absoluteArmor = +(curStats.armor*0.07 + curStats.defence*curStats.armor*0.008).toFixed(0);
        curStats.hpPc = +( (curStats.hp/curStats.hpMax)*100).toFixed(0);
        curStats.hpMax = +( (40 + gd.hpMax + (10*curStats.stamina))*(1 + 0.1*curStats.stamina) ).toFixed(0);
        curStats.mpPc = +( (curStats.mp/curStats.mpMax)*100).toFixed(0);
        curStats.mpMax = +(40 + + gd.mpMax + (10*curStats.intellect))*(1 + 0.1*curStats.intellect).toFixed(0);
        curStats.epPc = +( (curStats.ep/curStats.epMax)*100).toFixed(0);
        curStats.epMax = 100 + gd.epMax;

        curStats.attackPower = +( (gd.attackPower)*(1+ 0.05*curStats.strength + 0.05*curStats.agility).toFixed(0));
        curStats.spellPower = +((gd.spellPower)*(1+ 0.05*curStats.intellect + 0.05*curStats.spirit).toFixed(0));
        curStats.attack = (this.charData.gear.leftHand.damage)*(1+ 0.08*curStats.attackPower);
        curStats.DPS = +(curStats.attack*1000/(this.charData.gear.leftHand.castTime + this.charData.gear.leftHand.coolDownTime).toFixed(2));


        //TODO:тут же обновлять коэффиценты умножения для скилов и характеристик
        //regenTick
        if(curStats.hp < curStats.hpMax) {
            curStats.hp += curStats.hpRegen / 60;
            if(curStats.hp >= curStats.hpMax) curStats.hp = curStats.hpMax;
        }
        if(curStats.mp < curStats.mpMax) {
            curStats.mp += curStats.mpRegen / 60;
            if(curStats.mp >= curStats.mpMax) curStats.mp = curStats.mpMax;
        }
        if(curStats.ep < curStats.epMax) {
            curStats.ep += curStats.epRegen / 60;
            if(curStats.ep >= curStats.epMax) curStats.ep = curStats.epMax;
        }
    }

    updateSkills() {
        const aSkills = this.charData.skills.active || {};
        for(let i in aSkills) {
            if(typeof aSkills[i].calcDamage === 'function' && aSkills[i].damage) {
                aSkills[i].currentDamage = aSkills[i].calcDamage.call(this, this.charData.stats.current, aSkills[i]);
            } else {
                console.warn('BAD skill in', aSkills[i])
            }
        }
    }

    updateActionsList() { //TODO возможно стоит перенести логику формирования списка в rc, чтобы и скилы, и перемещения формировались там по имеющимся у бота мозгам
        this.behaviourData.actionsList.length = 0;
        let activeSkills = this.charData.skills.active;
        for(let aSkill in activeSkills) {
            this.behaviourData.environmentObjs.forEach(unit => {
                const isFriendly = (unit.color === this.color);
                let action = {
                    rating: 0,
                    target: unit,
                    action: activeSkills[aSkill],
                    brainsForAction: this._getBrainsForSkillName(aSkill)
                };
                if( (isFriendly && action.action.target === 'friendly') || (!isFriendly && action.action.target === 'enemy') )
                    this.behaviourData.actionsList.push(action); //атаковать союзников нельзя, лечить врагов тоже
            })
        }
        this.behaviourData.actionsList = this._options.rc.calcRatingForObject(this); //!!! Внутри этого же метода происходит подгрузка моделей движения по имеющимся у бота мозгам

        this.behaviourData.actionsList.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;

            return 0;
        });
        // console.log('actionsList', me.behaviourData.actionsList);
    }

    _getBrainsForSkillName(name) {
        let tactic = this.behaviourData.brains.actions;
        for(let tact in tactic) {
            if(tactic[tact].type === 'skill' && tactic[tact].name === name) {
                return tactic[tact]
            }
        }
        return null;
    }

    updateNoWalkable(current, newNode) {
        this.wayGrid.setWalkableAt(current.curY, current.curX, true);
        this.wayGrid.setWalkableAt(newNode[0], newNode[1], false);
        this.map[current.curX][current.curY].inside = null;
        this.map[newNode[1]][newNode[0]].inside = this.uuid;
    }

    isWalkable(x, y) {
        if(!this.wayGrid.nodes[x] || !this.wayGrid.nodes[x][y] ) {
            return false;
        }

        return this.wayGrid.nodes[x][y].walkable;
    }

    getFreeCell(curX, curY, range = 3) {
        while(1) {
            let dx = helpers.randomInteger(1, range);
            let dy = helpers.randomInteger(1, range);
            if(helpers.randomInteger(0,1) === 0) dx = -dx;
            if(helpers.randomInteger(0,1) === 0) dy = -dy;

            if(this.isWalkable(curX + dx, curY + dy)) {
                return {x: curX + dx, y: curY + dy};
            }
        }
    }

    move() {
        if(this.movingData.isBusyNow) {
            this.wayTracker();
            this.movingData.currTimeLength++;
        } else {
            this.movingData.currTimeLength = 0;
        }
    }

    //задает юниту конечную точку, которую нужно достигнуть
    moveTo(x,y, initByCoords, approachMode) {
        this.clearMovingData();
        this.movingData.isBusyNow = true;

        this.movingData.finalTargetPoint = {x, y};

        //определить в каком квадрате грида находится сейчас объект
        let startPoint = { x: this.baseGeometry.curX, y: this.baseGeometry.curY };

        // console.log('START', startPoint.x, startPoint.y, '->', x, y);

        let grid = this.wayGrid.clone();
        let wayArr = [];

        if(approachMode) {
            // grid.nodes[y][x].walkable = true; //принудительно в клоне карты меняем на walkable, иначе не строит маршрут
            // wayArr = finder.findPath(startPoint.x, startPoint.y, this.movingData.finalTargetPoint.x, this.movingData.finalTargetPoint.y, grid);
            // wayArr.pop(); //убираем последнюю точку маршрута, потому что там целевой бот
        } else {
            try {
                wayArr = finder.findPath(startPoint.y, startPoint.x, this.movingData.finalTargetPoint.y, this.movingData.finalTargetPoint.x, grid);
            } catch(err) {
                console.warn(err);
                console.log('....', startPoint, this.movingData.finalTargetPoint, grid);
            }
        }
        this.movingData.wayArr = wayArr;
        this.movingData.wayCounter = 0;
    }

    wayTracker() {
        const md = this.movingData;
        const bg = this.baseGeometry;
        const currTargetCell = md.wayArr[0];

        if(!md.wayArr.length) {
            console.log('FRAME', md.currTimeLength);
            console.warn('Конечная точка недостижима', this.name);
            this.clearMovingData();
            return;
        }

        if(md.currTimeLength === +((60 / md.speed / 2).toFixed(0))) {
            // console.log('FRAME', md.currTimeLength)
            // console.log('-- смена занятой клетки',  bg.curX, bg.curY, '->', currTargetCell[1], currTargetCell[0])
            //сменить текущую занятую клетку на новую
            if(!this.isWalkable(currTargetCell[1], currTargetCell[0])) {
                // console.log('Следующая клетка занята, маршрут прерван', this.name);
                this.clearMovingData();
                return;
            }
            this.updateNoWalkable(bg, currTargetCell);
            bg.curX = currTargetCell[1];
            bg.curY = currTargetCell[0];
        }

        if(md.currTimeLength === +((60 / md.speed).toFixed(0)) || md.currTimeLength === 0) {
            //если это был последний - закончить маршрут и очистить moving data
            // console.log('FRAME', md.currTimeLength)
            md.wayArr.shift();

            if(!md.wayArr.length) {
                // console.log('МАРШРУТ ОКОНЧЕН', this.name, currTargetCell[1], currTargetCell[0]);
                md.currTimeLength = 0;
                this.clearMovingData();
                return;
            }

            // console.log('||Точка достигнута', currTargetCell[1], currTargetCell[0]);

            const newTargetCell = md.wayArr[0];
            const direction = this.getDirectionBy2Cells({x: bg.curX, y: bg.curY }, {x: newTargetCell[1], y: newTargetCell[0]});
            md.direction = direction;
            md.currTimeLength = 0;
            md.frame = this.frame;
        }
    }

    getDirectionBy2Cells(start, finish) {
        let direction = null;
        if(!start || !finish) return direction;
        let deltaX = finish.x - start.x;
        let deltaY = finish.y - start.y;
        if(Math.abs(deltaX)) {
            deltaX > 0 ? direction = 'right' : direction = 'left';
        }

        if(Math.abs(deltaY)) {
            deltaY > 0 ? direction = 'bottom' : direction = 'top';
        }

        if( !Math.abs(deltaX) && !Math.abs(deltaY) ) {
            direction = null;
        }

        return direction;
    }

    checkEnvironmentObjs(gameData) {
        if(gameData) {
            const unitsArr = this.getCellsInViewRadius(this.baseGeometry, this.charData.stats.current.viewRadius);
            this.behaviourData.environmentObjs = unitsArr
                .filter(i => i.inside && (i.inside !== this.uuid) )
                .map(i => this._getOnlyCommonData(gameData.units[i.inside])) //recursive call with map.wayGrid
                .sort((a, b) => a.distance < b.distance);
        }
    }

    getCellsInViewRadius(cell, radius) {
        const map = this.map;
        const resArr = [];

        const top = Math.max(cell.curY - radius, 0);
        const right = Math.min(cell.curX + radius + 1, map.length);
        const bottom = Math.min(cell.curY + radius + 1, map[0].length);
        const left = Math.max(cell.curX - radius, 0);

        for(let i = left; i < right; i++) {
            for(let j = top; j < bottom; j++) {
                const a = (map[i][j]);
                resArr.push(map[i][j]);
            }
        }

        return resArr;
    }

    _getOnlyCommonData(unit) {
        if(!unit) return unit;
        const { name, color, charData, baseGeometry, uuid } = unit;
        const distance = this.calculateDistance(baseGeometry);

        return { name, color, charData, baseGeometry, uuid, distance };

    }

    calculateDistance({ curX, curY }) {
        const grid = this.wayGrid.clone();
        const finder = new PF.AStarFinder();
        grid.setWalkableAt(curY, curX, true); //принудительно в клоне карты меняем на walkable, иначе не строит маршрут
        const path = finder.findPath(this.baseGeometry.curY, this.baseGeometry.curX, curY, curX, grid);

        return path.length - 1;
    }

    clearMovingData() {
        this.movingData = {
            ...this.movingData,
            direction: null,
            currTimeLength: 0,
            lastMoveTime: 0,
            wayArr: [],
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false
        }
    }
}

module.exports = BaseUnit;