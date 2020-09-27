import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn } from 'ui/UxBox';

import Inventory from './inventory';

import '../../styles.scss';

class Storage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { storage: [] };
    }

    componentDidMount() {
        const { storage } = this.state;
        axios.get('/api/v1/storage/items').then(res => {
            if(res.data.data) {
                this.setState({ 
                    storage: Object.entries(res.data.data)
                    .map( ([key, value]) => ( { ...value, id: key} ))
                })
            }
        })
    }

    onCreateClick = () => {
        const { data } = this.state;
        // axios.post('/api/armory/create/item', {
        //     num: 1,
        //     random: true,
        // }).then(res => {
        //     if(res.data.data) {
        //         this.setState({ data: data.concat(res.data.data)})
        //     }
        // })
    }

    render() {
        const { storage } = this.state;

        console.log('AAA', storage);

        return (
            <Column className={cx('storage', this.props.className)}>
                <Row className={cx('storage__header')} padding="10px 0">
                    <Btn onClick={this.onCreateClick}>Создать случайный предмет +</Btn>
                </Row>
                <Inventory data={storage} />
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
