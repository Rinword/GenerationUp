import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column } from 'ui/UxBox';
import { createItem }  from './ItemGenerator';

import './styles.scss';

class ForgedItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { className } = this.props;
        const { options, lvl } = this.props;
        const { name, type, subtype, names } = options;
        // const { stat1, stat2 } = types;
        const forgedItem = createItem(options, lvl);

        const { damage, damageMin, damageMax, speed, DPS } = forgedItem;

        // console.log('forgedItem', forgedItem);

        return (
            <Column padding="10px" margin="5px" className={cx('forged-item', className)}>
                <Row jc="space-between" ai="center" className={'forged-item__header'}>
                    <span>{name}</span>
                    <img src="defaultImg" alt=""/>
                </Row>
                <hr/>
                <Row jc="space-between">
                    <span>Урон:</span>
                    <span>{`${damageMin} - ${damageMax} (${damage})`}</span>
                </Row>
                <Row jc="space-between">
                    <span>{`DPS: ${DPS}`}</span>
                    <span>{`${speed} sec`}</span>
                </Row>
                <Row jc="space-between">
                    <span>Уровень предмета:</span>
                    <span>{lvl}</span>
                </Row>
                <Row jc="space-between">
                    <span>{type}</span>
                    <span>{subtype}</span>
                </Row>
            </Column>
        );
    }
}

ForgedItem.propTypes = {
    className: PropTypes.string,
};

ForgedItem.defaultProps = {
    className: '',
};

export default ForgedItem;
