import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn } from 'ui/UxBox';

import GearItem from './GearItem';

// import './smith.scss';

class Storage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    componentWillMount() {
        const { data } = this.state;
        axios.get('/api/v1/users/', {
            num: 1,
        }).then(res => {
            if(res.data.data) {
                this.setState( {data: data.concat(res.data.data) })
            }
        })

        axios.post('/api/v1/user/create', {
            name: 'player3',
        }).then(res => {
            if(res.data.data) {
                this.setState( {data: data.concat(res.data.data) })
            }
        })
    }

    onCreateClick = () => {
        const { data } = this.state;
        axios.post('/api/armory/create/item', {
            num: 1,
            random: true,
        }).then(res => {
            if(res.data.data) {
                this.setState({ data: data.concat(res.data.data)})
            }
        })
    }

    render() {
        const { data } = this.state;

        return (
            <Column className={cx('storage', this.props.className)}>
                <Row className={cx('storage__header')} padding="10px 0">
                    <Btn onClick={this.onCreateClick}>Создать случайный предмет +</Btn>
                </Row>
                <Row className={cx('storage__content')} padding="10px">
                    {data.map((item, i) => <GearItem key={i} {...item} />)}
                </Row>
            </Column>
        );
    }
}

Storage.propTypes = {
    className: PropTypes.string,
};

Storage.defaultProps = {
    className: '',
};

export default Storage;
