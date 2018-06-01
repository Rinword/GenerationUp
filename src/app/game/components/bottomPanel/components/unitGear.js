import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

class UnitGear extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('unit-gear', this.props.className)}>
                gear
            </div>
        );
    }
}

UnitGear.propTypes = {
    className: PropTypes.string,
};

UnitGear.defaultProps = {
    className: '',
};

export default UnitGear;
