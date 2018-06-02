import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

const Bar = ({value, maxValue, height, color, regen }) => {
    const percent = (value * 100 / maxValue).toFixed(0);
    return (
        <div className={cx('ux-bar', `ux-bar_color_${color}`)} style={{flex: `0 0 ${height}px`}}>
            <div className={cx('ux-bar__wrap', `ux-bar__wrap_color_${color}`)}>
                <div className={cx('ux-bar__progress')} style={{width: `${percent}%`}}/>
                <div className={cx('ux-bar__percent')}><b>{percent}%</b>{`(${value.toFixed(0)}/${maxValue})`}</div>
            </div>
            <div className={cx('ux-bar__regen', {['ux-bar__regen_negative']: regen < 0})}>{regen >= 0 ? `+${regen.toFixed(0)}` : regen.toFixed(0)}</div>
        </div>
    )
}

Bar.propTypes = {
    value: PropTypes.number,
    maxValue: PropTypes.number,
    height: PropTypes.number,
    regen: PropTypes.number,
    color: PropTypes.oneOf(['hp', 'mp', 'ep']),
};

Bar.defaultProps = {
    value: 1,
    maxValue: 1,
    color: 'hp',
    regen: 0,
};

export default Bar;
