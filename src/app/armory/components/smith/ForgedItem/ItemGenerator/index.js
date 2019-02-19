import baseItemsOptions from './baseItemsOptions.json';
import baseGenericOptions from './baseGenericOptions.json';

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

function calculateRequireStats () {
    return {
        req1: { id: 'strength', label: 'Сила', value: 12 },
        req2: { id: 'stamina', label: 'Выносливость', value: 9 },
    }
}

function calculatePositiveStats () {
    return {
        stat1: { id: 'critChance', label: 'Рейт.крит. удара', value: 12 },
        stat2: { id: 'epRegen', label: 'Восстан. энергии', value: '+0.8/сек' },
        stat3: { },
    }
}

function createItem(options, lvl) {
    const { type, subtype, name } = options;
    const { damage, damageMin, damageMax, speed, DPS } = calculateDamageProps(`${type}_${subtype}`, options, lvl);
    const { stat1, stat2, stat3 } = calculatePositiveStats(`${type}_${subtype}`, options, lvl);
    const { req1, req2 } = calculateRequireStats(`${type}_${subtype}`, options, lvl);

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
