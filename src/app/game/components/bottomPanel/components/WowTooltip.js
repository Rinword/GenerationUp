import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dict from 'backend/modules/dataToDB/langdict';

import './tooltops.scss';

const armorTypes = ['Легкий доспех', 'Средний доспех', 'Тяжелый доспех'];
const sizeTypes = ['', 'Одноручное', 'Двуручное'];
const deepTypes = {
    artefact1: 'Артефакт',
    artefact2: 'Артефакт',
    chest: 'Грудь',
    gloves: 'Руки',
    leftHand: 'Левая рука',
    pants: 'Штаны',
    boots: 'Ноги',
    rightHand: 'Правая рука'
};

class WowTooltip extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { data } = this.props;
        dict.refactorLang(data);
        const { name, rare, deepType, itemLevel, requires, stats, tooltipType, armor, armorType } = data;
        const { DPS, damage, castTime, coolDownTime, size, range, description } = data;

        let TooltipType = <div>{JSON.stringify(data)}</div>;

        switch (tooltipType) {
            case 'wear':
                TooltipType = <WearRows armor={armor} armorType={armorType} deepType={deepType}/>
                break;
            case 'weapon':
                TooltipType = <WeaponRows
                    DPS={DPS}
                    damage={damage}
                    castTime={castTime}
                    coolDownTime={coolDownTime}
                    deepType={deepType}
                    size={size}
                    range={range}
                />
                break;
            case 'skill':
                TooltipType = <SkillRows armor={armor} armorType={armorType} deepType={deepType}/>
                break;
        }

        return (
            <div className={cx('wow-tooltip', this.props.className)}>
                <h2 className={cx('wow-tooltip__name', `wow-tooltip__name_rare_${rare}`)}>{name}</h2>
                <hr/>
                <div className={cx('wow-tooltip__row')}>
                    <p>Уровень предмета: </p>
                    <span>{itemLevel}</span>
                </div>
                {TooltipType}
                <Stats data={stats} />
                <Requires data={requires} />
                {description && <hr/>}
                {description && <div className={cx('wow-tooltip__description')}>{description}</div>}
            </div>
        )
    }
}

const Requires = ({ data }) => {
    if(!data || !data.length) return null;

    return (
        <div className={cx('wow-tooltip__column', 'wow-tooltip__column_require')}>
            <p>Требуется:</p>
            {data.map(req => <h3 key={req.name}>{`${req.langName}: ${req.value}`}</h3>)}
        </div>
    )
}

Requires.propTypes = {
    data: PropTypes.array,
}

const Stats = ({ data }) => {
    if(!data || !data.length) return null;

    return (
        <div className={cx('wow-tooltip__column', 'wow-tooltip__column_stats')}>
            {data.map(stat => <div className={cx('wow-tooltip__row')} key={stat.name}><span>{stat.langName}</span><span>+ {stat.value}</span></div>)}
        </div>
    )
}
Stats.propTypes = {
    data: PropTypes.array,
}

const WearRows = ({armor, deepType, armorType}) => {
    return [
        <div key={'armor'} className={cx('wow-tooltip__row')}>
            <p>{armor.langName} </p>
            <span>{armor.value}</span>
        </div>,
        <div key={'armorType'} className={cx('wow-tooltip__row')}>
            <p>{deepTypes[deepType]}</p>
            <span>{armorTypes[armorType]}</span>
        </div>,
    ]
}

const WeaponRows = ({DPS, damage, size, range, coolDownTime, deepType}) => {
    const _range = range > 1 ? range : 'Ближний бой';
    return [
        <div key={'damage'} className={cx('wow-tooltip__row')}>
            <p>Урон:</p>
            <span>{`${damage} (DPS: ${DPS})`}</span>
        </div>,
        <div key={'spec'} className={cx('wow-tooltip__row')}>
            <p>{deepTypes[deepType]}</p>
            <span>{((coolDownTime) / 1000).toFixed(0)} сек.</span>
        </div>,
        <div key={'size'} className={cx('wow-tooltip__row')}>
            <p>{sizeTypes[size]}</p>
            <span> </span>
        </div>,
        <div key={'range'} className={cx('wow-tooltip__row')}>
            <p>Дальность атаки</p>
            <span>{_range}</span>
        </div>,
    ]
}

const SkillRows = ({armor}) => {
    return [
        <div key={'armor'} className={cx('wow-tooltip__row')}>
            <p>{armor.langName} </p>
            <span>{armor.value}</span>
        </div>,
        <div key={'armorType'} className={cx('wow-tooltip__row')}>
            {/*<p>{deepTypes[deepType]}</p>*/}
            {/*<span>{armorTypes[armorType]}</span>*/}
        </div>,
    ]
}

WowTooltip.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
};

WowTooltip.defaultProps = {
    className: '',
    data: {},
};

export default WowTooltip;
