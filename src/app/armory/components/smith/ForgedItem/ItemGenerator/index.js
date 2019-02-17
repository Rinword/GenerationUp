import baseItemsOptions from './baseItemsOptions.json';
import baseGenericOptions from './baseGenericOptions.json';

function getDefaultItemProps(id = '') {
    return baseItemsOptions[id] || {};
}

function getStatPowerByLvl(lvl = '', quality = 'usual') {
    const { level = {} } = baseGenericOptions;
    const { a, Xt, Yt, func = 'atan' } = level;
    const arctg = Math.atan;

    if(func === 'atan') {
        if(lvl < 20) {
            return (-(arctg(lvl - Xt) / arctg(Xt)) + Yt) / 2;
        }

        return (-(0.85 * arctg(lvl - Xt) / arctg(Xt)) + Yt) / 2;
    }

    return 1;
}

function getStatPowerByPoints(points = 0, quality = 'usual') {
    const { statPoints = {} } = baseGenericOptions;
    const { a, Xt, Yt, func = 'atan' } = statPoints;
    const arctg = Math.atan;

    if(func === 'atan') {
        return ((a - 1) * arctg(points - Xt) / arctg(Xt)) + Yt;
    }

    return 1;
}

function calculateDamageProps(typeId, options, lvl) {
    const { damage: damagePoints, DPS: DPSPoints, rare } = options;
    const { baseDamage, baseDamageGrow, baseSpeed, baseSpeedGrow } = getDefaultItemProps(typeId);
    const damage = baseDamage + (baseDamageGrow * (lvl * getStatPowerByLvl(lvl, rare) + (damagePoints + 1) * getStatPowerByPoints(damagePoints, rare)));
    // console.log(lvl, 'LVL', getStatPowerByLvl(lvl, rare), 'POINTS', getStatPowerByPoints(damagePoints, rare))
    const speed = baseSpeed - (baseSpeedGrow * (DPSPoints + 1) * getStatPowerByPoints(DPSPoints, rare));

    const DPS = +(damage / speed).toFixed(2);
    const damageMin = +(damage - Math.max(1, 0.1 * damage)).toFixed(0);
    const damageMax = +(damage + Math.max(1, 0.1 * damage)).toFixed(0);

    console.log('1 LVL', getStatPowerByLvl(1, rare));
    console.log('10 LVL', getStatPowerByLvl(10, rare));
    console.log('20 LVL', getStatPowerByLvl(20, rare));
    console.log('30 LVL', getStatPowerByLvl(30, rare));

    // console.log('1 LVL', getStatPowerByPoints(1, rare));

    return {
        damage: +damage.toFixed(2),
        damageMin,
        damageMax,
        speed: +speed.toFixed(2),
        DPS,
    }

}

function createItem(options, lvl) {
    const { type, subtype, name } = options;
    const { damage, damageMin, damageMax, speed, DPS } = calculateDamageProps(`${type}_${subtype}`, options, lvl);

    return {
        name,
        damage,
        damageMin,
        damageMax,
        speed,
        DPS,
        lvl,
        breedingPrint: JSON.stringify(options),
    }
}

export { createItem };
