import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'lodash/get';

import { Row, Column } from 'ui/UxBox';
import Bar from './subComponents/Bar';
import SkillsPanel from './subComponents/SkillsPanel';

import './styles.scss';

class UnitState extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {data: {}};
    }

    render() {
        // console.log(this.props);
        const { charData = {}, name, color, data = {} } = this.props.data || {};
        const { className } = data;
        const { level, skills } = charData;
        const currentStats = get(charData, 'stats.current', {});
        const { hp, hpMax, hpRegen, mp, mpMax, mpRegen, ep, epMax, epRegen } = currentStats;

        return (
            <Column className={cx('unit-state', this.props.className)}>
                <Row className={cx('unit-state__main-info')} ai='flex-start'>
                    <img src="http://cs9.pikabu.ru/post_img/2017/04/08/6/1491639359280040560.jpg" alt="" style={{borderRight: `10px solid ${color}`}}/>
                    <Column className={cx('unit-state__unit-name-wrap')} jc='space-between' ai='flex-start'>
                        <h2>{name}</h2>
                        <p>{className}, <b>{level}</b> уровня</p>
                        <div style={{color: color}}>{color}</div>
                    </Column>
                </Row>
                <Column className={cx('unit-state__bars')} ai='stretch'>
                    <Bar value={hp} maxValue={hpMax} color='hp' height={30} regen={hpRegen} />
                    <Bar value={mp} maxValue={mpMax} color='mp' height={25} regen={mpRegen} />
                    <Bar value={ep} maxValue={epMax} color='ep' height={25} regen={epRegen} />
                </Column>
                <Row className={cx('unit-state__skills')}>
                    <SkillsPanel className={cx('unit-state__skills-panel')} skills={skills}/>
                </Row>
            </Column>
        );
    }
}

UnitState.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object,
};

UnitState.defaultProps = {
    className: '',
};

export default UnitState;
