import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';
import get from 'lodash/get';
import without from 'lodash/without';

import { Row, Column, Btn } from 'ui/UxBox';
import ComponentBuilder from 'ui/form/componentBuilder';
import { generateDefaultValues } from 'ui/form/helpers';

import { pointsFromRare, baseItemConfig, specialItemConfig, ratingsList, convertedRatingList, statsOptions } from './createItemOptions';

import './styles.scss';

function getAvailableStatsWithSources(selectedStats = {}, commonExcluded = []) {
    const res = [];
    const selectedStatsArray = Object.values(selectedStats);

    convertedRatingList.forEach(rating => {
        const { sources = {}, value } = rating;
        Object.keys(sources).forEach( stat => {
            if(selectedStatsArray.indexOf(stat) < 0) {
                res.push(value);
            }
        })
    })

    return res;
}

class Anvil extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            baseProps: {},
            anvilProps: {},
            specialProps: {},
        };
    }

    componentWillMount() {
        const { anvilProps, baseProps }  = this.calculateBaseProps(generateDefaultValues(baseItemConfig));
        const { anvilProps: forgedAnvilProps, specialProps } = this.calculateSpecialProps({
            anvilProps,
            baseProps,
            specialProps: generateDefaultValues(specialItemConfig.weapon, { baseProps, anvilProps })
        });

        this.setState({ baseProps, anvilProps: forgedAnvilProps, specialProps }, () => {
            this.onChange();
        })
    }

    // calculate rare, type, subtype of weapon
    calculateBaseProps = baseProps => {
        const { rare = 'rare' } = baseProps;
        const { maxPoints, statsNumber, maxRequiredStats } = pointsFromRare[rare];

        return {
            anvilProps: {
                maxPoints,
                statsNumber,
                maxRequiredStats,
            },
            baseProps
        }
    }

    onBasePropsChange = formBaseProps => {
        const { specialProps } = this.state;
        const { anvilProps, baseProps }  = this.calculateBaseProps(formBaseProps);
        const { anvilProps: forgedAnvilProps, specialProps: forgedSpecialProps } = this.calculateSpecialProps({ anvilProps, baseProps, specialProps });

        this.setState({ baseProps, specialProps: forgedSpecialProps, anvilProps: forgedAnvilProps }, () => this.onChange());
    }

    calculateSpecialProps = ({ baseProps, anvilProps, specialProps }) => {
        // validate for max points
        const { maxPoints } = anvilProps;
        const freePoints = this.calculateFreePoints(specialProps, maxPoints);
        const blockedRows =  this.calculateBlockedRows(specialProps, maxPoints);
        const blockedStats = this.calculateBlockedStats(specialProps);
        const blockedRequiredStats = this.calculateBlockedRequiredStats(specialProps);

        return {
            specialProps,
            anvilProps: {
                ...anvilProps,
                freePoints,
                blockedRows,
                blockedStats,
                blockedRequiredStats
            }
        };
    }

    onSpecialPropsChange = specialProps => {
        const { baseProps, anvilProps } = this.state;
        const { anvilProps: forgedAnvilProps, specialProps: forgedSpecialProps } = this.calculateSpecialProps({ baseProps, anvilProps, specialProps });
        this.setState(this.calculateSpecialProps({ anvilProps:forgedAnvilProps, specialProps: forgedSpecialProps }), () => this.onChange())
    }

    onChange = () => {
        const { onChange } = this.props;
        const { baseProps, specialProps } = this.state;

        // console.log('onChange', {...baseProps, ...specialProps});

        onChange({...baseProps, ...specialProps});
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

        return {
            require1: without(optionsArray, ...stat1Sources),
            require2: without(optionsArray, ...stat2Sources),
        }
    }

    calculateBlockedStats = ({ names = {}, nameReq = {}}) => {
        const stat3Available = getAvailableStatsWithSources(nameReq);
        const commonExcluded = Object.values(names);

        return {
            stat1: commonExcluded,
            stat2: commonExcluded,
            stat3: getAvailableStatsWithSources(nameReq, commonExcluded),
        }
    }

    getSpecialTypeConfig = () => {
        const { baseProps } = this.state;
        const { type, subtype } = baseProps;
        let slotType = 'armor';

        switch (type) {
            case 'oneHandWeapon':
            case 'twoHandWeapon':
                slotType = subtype === 'shield'? 'armor' : 'weapon'
        }

        return specialItemConfig[slotType] || [];
    }

    render() {
        const { baseProps, specialProps, anvilProps } = this.state;
        const { name, rare, type, subtype } = baseProps;
        const { freePoints, maxPoints, maxRequiredStats, statsNumber } = anvilProps;

        const initialValues = generateDefaultValues(baseItemConfig);
        const specialItemConfig = this.getSpecialTypeConfig();

        const specialInitialValues = generateDefaultValues(specialItemConfig, this.state);

        return (
            <Column ai="flex-start" className={cx('anvil', this.props.className)}>
                <Formik
                    initialValues={initialValues}
                    validate={this.onBasePropsChange}
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

                <p><b>{name}</b>, {rare} {subtype} [ {type} ] (stats: {statsNumber} / req. stats: {maxRequiredStats})</p>
                <hr/>
                <Row jc="space-between" padding="0 20px 0 0">
                    <p>Free Points: </p>
                    <p className="anvil__points">{freePoints}/{maxPoints}</p>
                </Row>
                <hr/>

                <Formik
                    initialValues={specialInitialValues}
                    validate={this.onSpecialPropsChange}
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
