import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';
import get from 'lodash/get';
import without from 'lodash/without';

import { Row, Column, Btn } from 'ui/UxBox';
import ComponentBuilder from 'ui/form/componentBuilder';
import { generateDefaultValues } from 'ui/form/helpers';

import { pointsFromRare, baseItemConfig, specialItemConfig, ratingsList, statsOptions } from './createItemOptions';

import './styles.scss';

class Anvil extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            itemStats: {}
        };
    }

    componentWillMount() {
        this.setState(this.getStateWithRare(generateDefaultValues(baseItemConfig)), () => this.onChange());
    }

    onValidate = values => {
        this.setState(this.getStateWithRare(values), () => this.onChange());

    }

    onDateValidate = itemStats => {
        // validate for max points
        const { maxPoints } = this.state;
        const freePoints = this.calculateFreePoints(itemStats, maxPoints);
        const blockedRows =  this.calculateBlockedRows(itemStats, maxPoints);
        const blockedStats = this.calculateBlockedStats(itemStats);
        const blockedRequiredStats = this.calculateBlockedRequiredStats(itemStats)

        this.setState({ itemStats, freePoints, blockedRows, blockedStats, blockedRequiredStats}, () => this.onChange());
    }

    onChange = () => {
        const { onChange } = this.props;
        const { itemProps, itemStats } = this.state;

        onChange({...itemProps, ...itemStats});
    }

    getStateWithRare = (itemProps = {}) => {
        const { itemStats } = this.state;
        const { rare = 'rare' } = itemProps;
        const { points, stats, maxRequiredStats } = pointsFromRare[rare];

        return {
            maxPoints: points,
            stats,
            maxRequiredStats,
            freePoints: this.calculateFreePoints(itemStats, points),
            blockedRows: this.calculateBlockedRows(itemStats, points),
            blockedStats: this.calculateBlockedStats(itemStats),
            blockedRequiredStats: this.calculateBlockedRequiredStats(itemStats),
            itemProps,
        }
    }

    calculateFreePoints = (stats, maxPoints) => {
        return maxPoints - Object.values(stats).reduce((sum, current) => {
            return isNaN(current) ? sum : sum + current
        }, 0);
    }

    calculateBlockedRows = (stats, maxPoints) => {
        const freePoints = this.calculateFreePoints(stats, maxPoints);
        const toReturn = {};

        // если нет свободных очков - блочим все стрелки на прибавку
        if(freePoints <= 0) {
            for(const i in stats) {
                toReturn[i] = { increase: true }
            }
        }

        return toReturn;
    }

    calculateBlockedRequiredStats = stats => {
        const { names = {}, nameReq = {} } = stats;
        const { stat1, stat2, stat3 } = names;
        const optionsArray = statsOptions.map(option => option.value);
        const stat1Sources = Object.keys(get(ratingsList, `${stat1}.sources`, {})) || [];
        const stat2Sources = Object.keys(get(ratingsList, `${stat2}.sources`, {})) || [];
        const stat3Sources = Object.keys(get(ratingsList, `${stat3}.sources`, {})) || [];

        return {
            require1: without(optionsArray, ...stat1Sources),
            require2: without(optionsArray, ...stat2Sources),
            require3: [],
        }
    }

    calculateBlockedStats = ({ names = {}}) => {
        return Object.values(names);
    }

    getSpecialTypeConfig = () => {
        const { itemProps } = this.state;
        const { type } = itemProps;
        let slotType = 'armor';
        switch (type) {
            case 'oneHandWeapon':
            case 'twoHandWeapon':
                slotType = 'weapon'
        }

        return specialItemConfig[slotType] || []
    }

    render() {
        const { itemProps, maxPoints, freePoints, stats, maxRequiredStats } = this.state;
        const { name, rare, type, subtype } = itemProps;
        const initialValues = generateDefaultValues(baseItemConfig);

        const initialData = {};
        const specialItemConfig = this.getSpecialTypeConfig();
        const specialInitialValues = generateDefaultValues(this.getSpecialTypeConfig(), this.state);

        return (
            <Column ai="flex-start" className={cx('anvil', this.props.className)}>
                <Formik
                    initialValues={initialValues}
                    validate={this.onValidate}
                >
                    {formikProps => (
                        <Form>
                            <ComponentBuilder
                                components={baseItemConfig}
                                formikProps={formikProps}
                            />
                        </Form>
                    )}
                </Formik>

                <p><b>{name}</b>, {rare} {subtype} [ {type} ] (stats: {stats} / req. stats: {maxRequiredStats})</p>
                <hr/>
                <Row jc="space-between" padding="0 20px 0 0">
                    <p>Free Points: </p>
                    <p className="anvil__points">{freePoints}/{maxPoints}</p>
                </Row>
                <hr/>

                <Formik
                    initialValues={specialInitialValues}
                    validate={this.onDateValidate}
                >
                    {formikProps => (
                        <Form className="anvil__special-form">
                            <ComponentBuilder
                                components={specialItemConfig}
                                formikProps={formikProps}
                                info={this.state}
                            />
                        </Form>
                    )}
                </Formik>
            </Column>
        );
    }
}

Anvil.propTypes = {
    className: PropTypes.string,
};

Anvil.defaultProps = {
    className: '',
};

export default Anvil;
