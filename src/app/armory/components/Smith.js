import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn } from 'ui/UxBox';

import Anvil from './smith/Anvil';
import ShowRoom from './smith/ShowRoom';

import './smith.scss';

class Smith extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {data: []};
    }

    onChange = itemOptions => {
        // console.log(itemOptions)

        this.setState({ itemOptions });
    }

    render() {
        const { itemOptions } = this.state;

        return (
            <Row ai="flex-start" className={cx('smith', this.props.className)}>
                <Anvil className="smith__anvil" onChange={this.onChange}/>
                <ShowRoom className="smith__show-room" itemOptions={itemOptions}/>
            </Row>
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
