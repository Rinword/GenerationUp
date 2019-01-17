import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';

import { Row, Column, Btn } from 'ui/UxBox';
import ComponentBuilder from 'ui/form/componentBuilder';
import { generateDefaultValues } from 'ui/form/helpers';

import { pointsFromRare, baseItemConfig, specialItemConfig } from './createItemOptions';

import './styles.scss';

class Anvil extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

    }

    componentWillMount() {
        this.setState(this.getStateWithRare(generateDefaultValues(baseItemConfig)));
    }

    onValidate = values => {
        this.setState(this.getStateWithRare(values));
    }

    onDateValidate = data => {
        // validate for max points
        this.setState({ data });
    }

    getStateWithRare = (values) => {
        const { data } = this.state;
        const { rare = 'usual' } = values;
        const { points, stats, maxRequiredStats } = pointsFromRare[rare];

        return {
            maxPoints: points,
            freePoints: points,
            stats,
            maxRequiredStats,
            values: values,
            data
        }
    }

    getSpecialTypeConfig = () => {
        const { values } = this.state;
        const { type } = values;
        let slotType = 'armor';
        switch (type) {
            case 'oneHandWeapon':
            case 'twoHandWeapon':
                slotType = 'weapon'
        }

        return specialItemConfig[slotType] || []
    }

    render() {
        const { values, maxPoints, freePoints, stats, maxRequiredStats } = this.state;
        const { name, rare, type, subtype } = values;
        const initialValues = generateDefaultValues(baseItemConfig);

        const initialData = {};
        const specialItemConfig = this.getSpecialTypeConfig();

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
                    initialValues={initialData}
                    validate={this.onDateValidate}
                >
                    {formikProps => (
                        <Form>
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
