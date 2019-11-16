import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column } from 'ui/UxBox';

import InventoryCell from './InventoryCell';
import ActionsTab from './ActionsTab';

const DEFAULT_INVENTORY_SIZE = 207;

import './styles.scss';

class Inventory extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {}
        }
    }

    onItemClick = selectedItem => {
        const { onSelect } = this.props;
        this.setState({ selectedItem });
    }

    render() {
        const { data, size = 207 } = this.props;
        const { selectedItem } = this.state;
        const emptySlots = [...(new Array(size - data.length))].map((_, id) =>({ id }))

        return (
            <Row className={cx('inventory', this.props.className)} ai="flex-start">
                <Column className="inventory__actions-tab" padding="10px" margin="10px 0 0 0">
                    <ActionsTab item={selectedItem} />
                </Column>
                <Column className="inventory__container-wrap">
                    <Row className="inventory__filters" padding="10px">
                        filters tab
                    </Row>
                    <Row className="inventory__container" multiStr={true} ai="flex-start" padding="10px">
                        {data.concat(emptySlots).map(i => <InventoryCell key={i.id} item={i} onSelect={this.onItemClick} selected={selectedItem.id === i.id} />)}
                    </Row>
                </Column>
            </Row>
        );
    }
}

Inventory.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({})),
    size: PropTypes.number,
};

Inventory.defaultProps = {
    className: '',
    data: [],
    size: DEFAULT_INVENTORY_SIZE
};

export default Inventory;
