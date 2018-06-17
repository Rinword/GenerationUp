const helpers =  require('../../helpers');

class RatingCalculator {
    constructor() {
        this.data = this.obtainData();
    }

    calcRatingForObject(obj) {
        // this.currObj = obj;
        let actionsList = obj.behaviourData.actionsList; //список только со скиловыми действиями
        actionsList = actionsList.concat( this.getMovingStrategies(obj) ); //дополнение списка действиями перемещений

        actionsList.forEach(action => {
            action.rating = this.calcRatingWithInfluence(action, obj).rating;
            action.behaviourArr = this.calcRatingWithInfluence(action, obj).behaviourArr;
            action.fullId = `${action.brainsForAction.type}_${action.action.name}_${action.target.uuid || action.target.name}`;
        });

        // console.log('AL', actionsList)

        return actionsList;
    }

    calcRatingWithInfluence(action, obj) {
        // console.log('brains', action);
        let sumRating = 0;
        let miltRating = 1;

        const influenceFactors = action.brainsForAction && action.brainsForAction.influenceFactors;
        let sumFCnt = 0;
        let behaviourArr = [];
        influenceFactors && influenceFactors.forEach(factor => {
            let ratingPiece = this.getFactor(factor, action, obj)();

            if (factor.type === 'addend'){
                sumRating += ratingPiece;
                behaviourArr.push({name: factor.name, type: factor.type, rating: ratingPiece});
                sumFCnt++;
            }
            if (factor.type === 'mult'){
                ratingPiece =  (ratingPiece / 100);
                behaviourArr.push({name: factor.name, type: factor.type, rating: ratingPiece});
                miltRating *= ratingPiece
            }
        });

        if(!influenceFactors) { //временная имитация для отстуствующих моделей поведения
            sumRating = helpers.randomInteger(0, 15);
        }
        if(sumFCnt >= 1)
            sumRating = sumRating / sumFCnt;

        return {
            rating: +( (sumRating * miltRating).toFixed(0) ),
            behaviourArr: behaviourArr,
        };
    }

    getFactor(factor, action, obj){
        let skill = action.action;
        if(action.brainsForAction.type) {
            return this.data.factors[factor.name].bind(this, action, skill, factor, obj);
        } else {
            return this.data.factors.defaultAction.bind(this, factor.name, obj);
        }
    }

    getInterpolateRating(ratingMask, value, min, max) {
        let rating = 1;
        if(value > max) return rating;

        let pcValue = 50;
        let i = 0;
        let valueScale = [0, 100];
        if(ratingMask.pA) { //формирование из абсолютных значений (например число врагов в радиусе атаки - макс. число условно бесконечно)
            valueScale = ratingMask.pA;
            pcValue = value;
        } else {
            valueScale = ratingMask.p; //формирование из относительных значений (например текущий процент здоровья или перезарядка умения)
            pcValue = +( (value / (max - min) * 100).toFixed(0) );
        }
        while(valueScale[i] <= pcValue) {
            i++;
        }
        if(pcValue === valueScale[i - 1]) { //если значение попало прямо в калибрующую точку (20% хп)
            // console.log('калибрующая точка', pcValue, 'значение', ratingMask.v[i-1]);
            rating = ratingMask.v[i - 1];
        } else {
            rating = +(helpers.linealInterpolation(valueScale[i - 1], ratingMask.v[i - 1], valueScale[i], ratingMask.v[i], pcValue).toFixed(0));
            // console.log('промежучная точка, интерполируем', pcValue, 'между ', valueScale[i-1], valueScale[i]);
        }

        return rating;
    }

    getMovingStrategies(currObj) {
        let arr = [];
        let rc = this;
        let tactic = currObj.behaviourData.brains.actions;
        for(let tact in tactic) {
            if(tactic[tact].type === 'nt_moving') { //для безцелевых стратегий (поиск цели например)
                arr.push( {
                    rating: 0,
                    action: {
                        action: rc.getMovingStrategy(tactic[tact].name).action,
                        name: tactic[tact].name,
                        langName: rc.getMovingStrategy(tactic[tact].name).langName,
                    },
                    target: {
                        name: ''
                    },
                    brainsForAction: tactic[tact]
                })
            }
            if(tactic[tact].type === 'moving') { //для всех остальныъ (сблизиться на расстояние атаки, убежать от угрозы)
                currObj.behaviourData.environmentObjs.forEach(obj => {
                    arr.push( {
                        rating: 0,
                        action: {
                            action: rc.getMovingStrategy(tactic[tact].name).action,
                            name: tactic[tact].name,
                            langName: rc.getMovingStrategy(tactic[tact].name).langName,
                        },
                        target: obj,
                        brainsForAction: tactic[tact]
                    })
                })

            }
        }

        return arr;
    }

    getMovingStrategy(name) {
        return this.data.movingStrategies[name] && this.data.movingStrategies[name] || null
    }


    obtainData() {
        let minValue = 0;
        let maxValue = 1;
        return {
            factors: {
                selfCD: function (action, skill, factor, obj) {
                    minValue = 0;
                    maxValue = 100;
                    let value = +( (skill.coolDownCurrTime / skill.coolDownTime * 100).toFixed(0) );
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },
                targetInAttackRadius(action, skill, factor, obj) {
                    let attackRange = skill.range;
                    // let distanceToTarget = obj.behaviourData.environmentObjs[obj.behaviourData.environmentObjs.indexOf(action.target)];
                    let distanceToTarget = obj.behaviourData.environmentObjs.find(i => i.uuid === action.target.uuid).distance;
                    let value = 1;
                    if(distanceToTarget > attackRange) value = 0;
                    // console.log('range', attackRange, 'envObjs', this.currObj.behaviourData.environmentObjsDist);
                    //TODO не совсем корректно, это не дистация атаки, а сколько ходов нужно для сближения. Но для мили атак подходит
                    minValue = 0;
                    maxValue = 1;
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },
                distanceToTarget(action, skill, factor, obj) {
                    // let attackRange = skill.range;
                    let value = obj.behaviourData.environmentObjs.find(i => i.uuid === action.target.uuid).distance;
                    // console.log('range', attackRange, 'envObjs', this.currObj.behaviourData.environmentObjsDist);
                    // console.log('distToTarget', value, action.target.name)
                    //TODO не совсем корректно, это не дистация атаки, а сколько ходов нужно для сближения. Но для мили атак подходит
                    minValue = -1;
                    maxValue = 100;
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },

                targetHP: function (action, skill, factor) {
                    minValue = 0;
                    maxValue = 100;
                    let value = action.target.charData.stats.current.hpPc;
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },
                enemyCnt: function (action, skill, factor, obj) {
                    let value = obj.behaviourData.environmentObjs.filter(i => i.color !== obj.color).length;
                    minValue = 0;
                    maxValue = 100;
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },

                hasMana: function (action, skill, factor, obj) {
                    const value = obj.charData.stats.current.mp;
                    minValue = 0;
                    maxValue = obj.charData.stats.current.mpMax;

                    const mask = {
                        pA: factor.ratingMask.pA.map(i => i),
                        v: factor.ratingMask.v.map(i => i)
                    };
                    const cost = skill.cost.mpCost;
                    const costX2 = 2 * skill.cost.mpCost;
                    if(cost > maxValue) return 0; //если маны в принципе не хватает на скилл - досвиданья
                    mask.pA[mask.pA.indexOf('cost')] = cost;
                    mask.pA[mask.pA.indexOf('2cost')] = costX2;
                    mask.pA[mask.pA.indexOf('full')] = maxValue;

                    return this.getInterpolateRating(mask, value, minValue, maxValue);
                },

                hasEnergy: function (action, skill, factor, obj) {
                    let value = obj.charData.stats.current.ep;
                    minValue = 0;
                    maxValue = obj.charData.stats.current.epMax;

                    const mask = {
                        pA: factor.ratingMask.pA.map(i => i),
                        v: factor.ratingMask.v.map(i => i)
                    };
                    const cost = skill.cost.epCost;
                    const costX2 = 2 * skill.cost.epCost;
                    if(cost > maxValue) return 0;

                    mask.pA[mask.pA.indexOf('cost')] = cost;
                    mask.pA[mask.pA.indexOf('2cost')] = costX2;
                    mask.pA[mask.pA.indexOf('full')] = maxValue;

                    return this.getInterpolateRating(mask, value, minValue, maxValue);
                },

                isEnemy: function (action, skill, factor, obj) {
                    let value = 0;
                    obj.color === action.target.color ? value = 1 : value = 0;
                    minValue = 0;
                    maxValue = 1;
                    return this.getInterpolateRating(factor.ratingMask, value, minValue, maxValue);
                },

                defaultAction: function (name) {
                    console.log('Нет поведения для фактора', name, 'проверьте название или добавьте обработчик');
                    return 1;
                }
            },

            movingStrategies: {
                randomMoving: { /*@non-target Action*/
                    langName: 'Поиск цели',
                    action: function (action, obj) {
                        if(!obj.movingData.isBusyNow) {
                            while(1) {
                                let x = helpers.randomInteger(1, 3);
                                let y = helpers.randomInteger(1, 3);
                                if(helpers.randomInteger(0, 1) === 0) x = -x;
                                if(helpers.randomInteger(0, 1) === 0) y = -y;

                                let cellX = obj.baseGeometry.curX + x;
                                let cellY = obj.baseGeometry.curY + y;
                                if(obj.isWalkable(cellX, cellY)) {
                                    obj.moveTo(cellX, cellY);
                                    break;
                                }
                            }
                        }
                    },

                },
                approachToMiliDist: {
                    langName: 'Сблизиться с',
                    action: function (action, obj) {
                        let cellX = action.target.baseGeometry.curX;
                        let cellY = action.target.baseGeometry.curY;
                        obj.moveTo(cellX, cellY, true);
                    },
                },
            }
        }
    }
}

module.exports = RatingCalculator;
