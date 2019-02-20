import get from 'lodash/get';
import set from 'lodash/set';

import baseItemsOptions from './baseItemsOptions.json';
import baseGenericOptions from './baseGenericOptions.json';

import { statsOptions, ratingsList } from 'src/app/armory/components/smith/createItemOptions';

function getDefaultItemProps(id = '') {
    return baseItemsOptions[id] || {};
}

function getStatPowerByLvl(lvl = 1, quality = 'usual') {
    const { level = {} } = baseGenericOptions;
    const { func = 'atan' } = level;

    if(func === 'linear') {
        if(lvl < 30) {
            return 0.01 * (-0.5 * lvl + 100);
        }

        return 0.01 * (-0.357 * lvl + 95.7);
    }

    return 0;
}

function getStatPowerByPoints(points = 0, quality = 'usual') {
    return 0.1 * points;
}

function calculateRating(startValue, baseGrow, lvl, points) {
    const levelRating = baseGrow * (lvl - 1) * getStatPowerByLvl(lvl);
    // всегда берем наибольшее по модулю изменение для параметра: либо points * baseGrow либо 10% * levelRating
    const pointsRatingAbsolute =  Math.max(Math.abs(points * baseGrow), Math.abs(levelRating * getStatPowerByPoints(points)));
    // учитываем, что поинты могут идти в минус, а также улучшение статы тоже может быть в минут (интервал атак например)
    const finalGrow = startValue + levelRating + Math.sign(points) * Math.sign(baseGrow) * pointsRatingAbsolute;

    // учитываем ситуацию, когда стата может упасть ниже стартового значения, например damage при -5 points
    return points < 0 && startValue > finalGrow ? startValue : finalGrow;
}

function calculateDamageProps(typeId, options, lvl) {
    const { damage: damagePoints, DPS: DPSPoints, rare } = options;
    const { baseDamage, baseDamageGrow, baseSpeed, baseSpeedGrow } = getDefaultItemProps(typeId);
    const damage = calculateRating(baseDamage, baseDamageGrow, lvl, damagePoints);
    const speed = calculateRating(baseSpeed, baseSpeedGrow, 1, DPSPoints);

    const DPS = +(damage / speed).toFixed(2);
    const damageMin = +(damage - Math.max(1, 0.1 * damage)).toFixed(0);
    const damageMax = +(damage + Math.max(1, 0.1 * damage)).toFixed(0);

    return {
        damage: +damage.toFixed(2),
        damageMin,
        damageMax,
        speed: +speed.toFixed(2),
        DPS,
    }
}

function calculateRequireStats(options, lvl) {
    const { nameReq = {} } = options;

    const res = {};

    Object.values(nameReq).forEach((name, i) => {
        const points = get(options, `require${i + 1}`, 0);
        const value = +(calculateRating(3, 0.91, lvl, -points).toFixed(0));
        const label = statsOptions.find(i => i.value === name).label;
        const req = { id: name, label, value };
        set(res, `req${i + 1}`, req);
    })

    return res;
}

function calculatePositiveStats (type, options, lvl) {
    const { names = {}, nameReq } = options;

    const res = {};

    Object.values(names).forEach((name, i) => {
        const { label, sources } = ratingsList[name];
        const points = get(options, `stat${i + 1}`, 0);
        const baseStatForGrow = get(nameReq, `require${i + 1}`, 'none');
        const baseGrow = get(sources, baseStatForGrow, 0);
        const value = +(calculateRating(baseGrow, baseGrow, lvl, points).toFixed(2));
        const req = { id: name, label, value };
        set(res, `stat${i + 1}`, req);
    })

    console.log('RESSS', res);

    return res;
}

function createItem(options, lvl) {
    const { type, subtype, name } = options;
    const { damage, damageMin, damageMax, speed, DPS } = calculateDamageProps(`${type}_${subtype}`, options, lvl);
    const { stat1, stat2, stat3 } = calculatePositiveStats(type, options, lvl);
    const { req1, req2 } = calculateRequireStats(options, lvl);

    return {
        name,
        damage,
        damageMin,
        damageMax,
        speed,
        DPS,
        lvl,
        stat1,
        stat2,
        stat3,
        req1,
        req2,
        breedingPrint: JSON.stringify(options),
    }
}

export { createItem };
