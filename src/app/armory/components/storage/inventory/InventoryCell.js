import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import { Row, Column, Btn } from 'ui/UxBox';

import './styles.scss';

const iconMapping = {
    mediumArmor_boots: '_items_boots_0',
    twoHandWeapon_sword: '_items_leftHand_0',
    heavyArmor_chest: '_items_chest_2',
}

function getIconNameByItemType({ type, subtype } = {}) {

        console.log('icon', `${type}_${subtype}`);
    return iconMapping[`${type}_${subtype}`] || '';
}

class InventoryCell extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.selected !== nextProps.selected
    }

    render() {
        const { item = {}, onSelect, selected } = this.props;
        const { name, rare } = item;
        name && console.log('ITEM', item);

        const className = name ? `icon icon_size_22 icon_bg-size_22` : ''

        return (
            <div data-rare={rare} onClick={() => onSelect(item)} className={cx('inventory-cell', this.props.className, {
                ['inventory-cell_selected']: selected
            })}>
                <div data-imgid={getIconNameByItemType(item.itemClass)} className={className}/>
            </div>
        );
    }
}

InventoryCell.propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    selected: PropTypes.boolean,
};

InventoryCell.defaultProps = {
    className: '',
    onSelect: () => {},
    selected: false,
};

export default InventoryCell;
