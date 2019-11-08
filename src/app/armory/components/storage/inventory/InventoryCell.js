import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import { Row, Column, Btn } from 'ui/UxBox';

import './styles.scss';

class InventoryCell extends React.PureComponent {
    render() {
        const { item } = this.props;

        return (
            <div className={cx('inventory-cell', this.props.className)}>
                {item.id}
            </div>
        );
    }
}

InventoryCell.propTypes = {
    className: PropTypes.string,
};

InventoryCell.defaultProps = {
    className: '',
};

export default InventoryCell;
