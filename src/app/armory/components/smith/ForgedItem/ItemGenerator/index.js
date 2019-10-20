import { get, set, isEmpty } from 'lodash';

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

function calculateArmorProps(typeId, options, lvl) {
    const { armor: armorPoints, magicArmor: magicArmorPoints, rare } = options;
    const { baseArmor, baseArmorGrow, baseMagicArmor, baseMagicArmorGrow } = getDefaultItemProps(typeId);
    const armor = calculateRating(baseArmor, baseArmorGrow, lvl, armorPoints);
    const magicArmor = calculateRating(baseMagicArmor, baseMagicArmorGrow, lvl, magicArmorPoints);

    return {
        armor: +armor.toFixed(2),
        magicArmor: +magicArmor.toFixed(2),
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
    const typeMultiplier = type === 'twoHandWeapon' ? 2 : 1;

    Object.values(names).forEach((name, i) => {
        const { label, sources } = ratingsList[name];
        let points = get(options, `stat${i + 1}`, 0);
        const baseStatForGrow = get(nameReq, `require${i + 1}`, 'none');
        let baseGrow = get(sources, baseStatForGrow, 0);
        // так как третья стата не опирается на напрямую на одну из источников, присваеваем ей первую из возможных
        // и вычитаем 3 поинта как шраф за новую стату
        if(i === 2) {
            baseGrow = Object.values(sources)[0];
            points -= 3;
        }
        const value = +(calculateRating(baseGrow, baseGrow, lvl, points).toFixed(2)) * typeMultiplier;
        const req = { id: name, label, value };
        set(res, `stat${i + 1}`, req);
    })

    return res;
}

function createItem(options, lvl) {
    const { type, subtype, name } = options;

    if(isEmpty(options)) {
        return {};
    }

    const { stat1, stat2, stat3 } = calculatePositiveStats(type, options, lvl);
    const { req1, req2 } = calculateRequireStats(options, lvl);

    let resultProps = {
        name,
        itemClass: { type, subtype },
        lvl,
        stat1,
        stat2,
        stat3,
        req1,
        req2,
        breedingPrint: JSON.stringify(options),
    }

    switch(type) {
        case 'oneHandWeapon':
        case 'twoHandWeapon':
            if(subtype === 'shield') {
                const { armor, magicArmor } = calculateArmorProps(`${type}_${subtype}`, options, lvl);
                return {
                    ...resultProps,
                    armor, magicArmor
                }
            }

            const { damage, damageMin, damageMax, speed, DPS } = calculateDamageProps(`${type}_${subtype}`, options, lvl);
            resultProps = {
                ...resultProps,
                damage, damageMin, damageMax, speed, DPS,
            }
            break;

        case 'lightArmor':
        case 'mediumArmor':
        case 'heavyArmor':
            const { armor, magicArmor } = calculateArmorProps(`${type}_${subtype}`, options, lvl);
            resultProps = {
                ...resultProps,
                armor, magicArmor,
            }
            break;

        default:
            console.warn('unrecognized type', type);
    }

    console.log('AFTER CREATE', resultProps);

    return resultProps;
}

export { createItem };
