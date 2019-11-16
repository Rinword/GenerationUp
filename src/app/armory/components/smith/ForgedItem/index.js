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
        const { className, item } = this.props;
        if(!item) {
            return null;
        }

        const { name, itemClass = {}, rare = 2, lvl } = item;
        const { type, subtype } = itemClass;
        const { damageMin, damageMax, speed, DPS, armor, magicArmor } = item;
        const { stat1 = {}, stat2 = {}, stat3 = {}, req1 = {}, req2 = {} } = item;
        const { label: stat1Name, value: stat1Value } = stat1;
        const { label: stat2Name, value: stat2Value } = stat2;
        const { label: stat3Name, value: stat3Value } = stat3;
        const { label: req1Name, value: req1Value } = req1;
        const { label: req2Name, value: req2Value } = req2;

        console.log('FORGED', this.props);

        return (
            <Column padding="10px" margin="5px" className={cx('forged-item', className)} data-rareBg={rare}>
                <Row jc="space-between" ai="center" className={'forged-item__header'}>
                    <b data-rareText={rare}>{name}</b>
                    <img src="defaultImg" alt=""/>
                </Row>
                <hr data-rareBg={rare}/>
                <Row jc="space-between">
                    <span>Уровень предмета:</span>
                    <span>{lvl}</span>
                </Row>
                <Row jc="space-between">
                    <span>{type}</span>
                    <span>{subtype}</span>
                </Row>
                {armor &&
                <Row jc="space-between">
                    <span>Броня:</span>
                    <span>{armor}</span>
                </Row>}
                {magicArmor &&
                <Row jc="space-between">
                    <span>Маг. стойкость:</span>
                    <span>{magicArmor}</span>
                </Row>}
                { DPS && speed &&
                <Row jc="space-between">
                    <span>{`DPS: ${DPS}`}</span>
                    <span>{`${speed} sec`}</span>
                </Row>}
                {damageMax && damageMin &&
                <Row jc="space-between">
                    <span>Урон:</span>
                    <span>{`${damageMin} - ${damageMax}`}</span>
                </Row>}
                <Row jc="space-between" margin="10px 0 0" className={cx('forged-item__row', 'forged-item__row_positive')}>
                    <span>{stat1Name}</span>
                    <span>{stat1Value}</span>
                </Row>

                <Row jc="space-between" className={cx('forged-item__row', 'forged-item__row_positive')}>
                    <span>{stat2Name}</span>
                    <span>{stat2Value}</span>
                </Row>
                <Row jc="space-between" className={cx('forged-item__row', 'forged-item__row_positive')}>
                    <span>{stat3Name}</span>
                    <span>{stat3Value}</span>
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
    item: PropTypes.shape({})
};

ForgedItem.defaultProps = {
    className: '',
    item: null,
};

export default ForgedItem;
