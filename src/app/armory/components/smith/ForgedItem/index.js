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

        const { damage, damageMin, damageMax, speed, DPS, stat1 = {}, stat2 = {}, req1 = {}, req2 = {} } = forgedItem;
        const { label: stat1Name, value: stat1Value } = stat1;
        const { label: stat2Name, value: stat2Value } = stat2;
        const { label: req1Name, value: req1Value } = req1;
        const { label: req2Name, value: req2Value } = req2;

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
                    <span>{`${damageMin} - ${damageMax}`}</span>
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
                <Row jc="space-between" margin="10px 0 0" className={cx('forged-item__row', 'forged-item__row_positive')}>
                    <span>{stat1Name}</span>
                    <span>{stat1Value}</span>
                </Row>
                <Row jc="space-between" className={cx('forged-item__row', 'forged-item__row_positive')}>
                    <span>{stat2Name}</span>
                    <span>{stat2Value}</span>
                </Row>
                <Row jc="space-between" margin="10px 0 0" className={cx('forged-item__row', 'forged-item__row_required')}>
                    <span>{req1Name}</span>
                    <span>{req1Value}</span>
                </Row>
                <Row jc="space-between" className={cx('forged-item__row', 'forged-item__row_required')}>
                    <span>{req2Name}</span>
                    <span>{req2Value}</span>
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
