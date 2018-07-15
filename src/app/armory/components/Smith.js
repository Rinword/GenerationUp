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

    componentWillMount() {
        axios.post('/api/armory/create', {
            num: 10,
        }).then(res => {
            if(res.data.data) {
                this.setState({data: res.data.data})
            }
        })
    }

    onCreateClick = () => {
        axios.post('/api/armory/create', {
            num: 10,
        }).then(res => {
            if(res.data.data) {
                this.setState({data: res.data.data})
            }
        })
    }

    render() {
        console.log('render', this.state);
        return (
            <Column className={cx('smith', this.props.className)}>
                <Row className={cx('smith__header')} padding="10px 0">
                    <Btn onClick={this.onCreateClick}>Создать предмет +</Btn>
                </Row>
                <Row className={cx('smith__content')} padding="10px">
                    {this.state.data.map((item, i) => <GearItem key={i} {...item} />)}
                </Row>
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
