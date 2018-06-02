import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'lodash/get';

import { Row, Column } from 'ui/UxBox';

import './styles.scss';

class UnitGear extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { charData = {}, name, color, data = {} } = this.props.data || {};
        const currentStats = get(charData, 'stats.current', {});
        const { strength, stamina, agility, spirit, intellect, defenceRating, critRating } = currentStats;
        const { attackPower, spellPower, speed, armor, absoluteArmor, defence, attack, DPS } = currentStats;

        return (
            <div className={cx('unit-gear', this.props.className)}>
                <Column className={cx('unit-gear__stats')}>
                    <Row jc="space-around" ai="center">
                        <span className={cx('unit-gear__stat')}>C: <b>{strength}</b></span>
                        <span className={cx('unit-gear__stat')}>Л: <b>{agility}</b></span>
                        <span className={cx('unit-gear__stat')}>И: <b>{intellect}</b></span>
                        <span className={cx('unit-gear__stat')}>Д: <b>{spirit}</b></span>
                        <span className={cx('unit-gear__stat')}>В: <b>{stamina}</b></span>
                    </Row>
                    <hr />
                    <StatRow name={'Защита'} value={`${defence}% + (${absoluteArmor})`}/>
                    <StatRow name={'Атака'} value={`${attack} (DPS: ${(DPS || 0).toFixed(0)})`}/>
                    <hr />
                    <StatRow name={'Рейтинг защиты'} value={defenceRating}/>
                    <StatRow name={'Рейтинг крит. удара'} value={critRating}/>
                    <StatRow name={'Сила атаки'} value={attackPower}/>
                    <StatRow name={'Сила заклинаний'} value={spellPower}/>
                    <StatRow name={'Скорость движ.'} value={(speed || 0).toFixed(0)}/>
                    <StatRow name={'Броня'} value={armor}/>
                </Column>
            </div>
        );
    }
}

const StatRow = ({ name, value }) => {
    return (
        <Row className={cx('unit-gear__stat-row')} jc="space-between" ai="stretch">
            <h3>{name}</h3>
            <p>{value}</p>
        </Row>
    )
}

UnitGear.propTypes = {
    className: PropTypes.string,
};

UnitGear.defaultProps = {
    className: '',
};

export default UnitGear;
