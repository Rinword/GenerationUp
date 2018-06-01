import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

const Bar = ({value = 1, maxValue = 1, height, color }) => {
    const percent = (value * 100 / maxValue).toFixed(0);
    // console.log(value, maxValue, percent);
    return (
        <div className={cx('ux-bar', `ux-bar_color_${color}`)} style={{flex: `0 0 ${height}px`}}>
            <div className={cx('ux-bar__progress')} style={{width: `${percent}%`}}/>
            <div className={cx('ux-bar__percent')}><b>{percent}%</b>{`(${value.toFixed(0)}/${maxValue})`}</div>
        </div>
    )
}

Bar.propTypes = {
    value: PropTypes.number,
    maxValue: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.oneOf(['hp', 'mp', 'ep']),
};

Bar.defaultProps = {};

export default Bar;
