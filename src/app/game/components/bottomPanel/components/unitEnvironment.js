import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

class UnitEnvironment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('unit-environment', this.props.className)}>
                env
            </div>
        );
    }
}

UnitEnvironment.propTypes = {
    className: PropTypes.string,
};

UnitEnvironment.defaultProps = {
    className: '',
};

export default UnitEnvironment;
