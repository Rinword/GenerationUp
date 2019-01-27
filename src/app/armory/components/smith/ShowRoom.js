import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column } from 'ui/UxBox';
import { generateItems } from './helpers';
import ForgedItem from './ForgedItem';

import './styles.scss';

class ShowRoom extends React.PureComponent {
    constructor(props) {
        super(props);
        const { itemOptions } = props;
        const data = generateItems(itemOptions)

        this.state = { data };
    }

    componentWillReceiveProps(nextProps) {
        const { itemOptions } = nextProps;
        const { itemOptions: oldItemOptions } = this.props;

        if(JSON.stringify(itemOptions) !== JSON.stringify(oldItemOptions)) {
            const data = generateItems(itemOptions);

            this.setState({ data });
        }
    }

    render() {
        const { data } = this.state;

        return (
            <Column className={cx('show-room', this.props.className)} padding="15px">
                <Row className="show-room__header">
                    header
                </Row>
                <Row className="show-room__content" >
                    {data.map(item => <ForgedItem key={item.rare + item.lvl} {...item} />)}
                </Row>
            </Column>
        );
    }
}

ShowRoom.propTypes = {
    className: PropTypes.string,
    itemOptions: PropTypes.shape({}),
};

ShowRoom.defaultProps = {
    className: '',
    itemOptions: {},
};

export default ShowRoom;