import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn } from 'ui/UxBox';

import GearItem from './GearItem';

import './smith.scss';

class Smith extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {data: []};
    }

    render() {
        return (
            <Column className={cx('smith', this.props.className)}>
                Кузница/мастерская
            </Column>
        );
    }
}

Smith.propTypes = {
    className: PropTypes.string,
};

Smith.defaultProps = {
    className: '',
};

export default Smith;
