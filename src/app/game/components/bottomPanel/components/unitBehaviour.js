import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

class UnitBehaviour extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('unit-behaviour', this.props.className)}>
                behaviour
            </div>
        );
    }
}

UnitBehaviour.propTypes = {
    className: PropTypes.string,
};

UnitBehaviour.defaultProps = {
    className: '',
};

export default UnitBehaviour;
