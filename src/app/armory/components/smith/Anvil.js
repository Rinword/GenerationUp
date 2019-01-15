import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';

import { Row, Column, Btn } from 'ui/UxBox';
import ComponentBuilder from 'ui/form/componentBuilder';
import { generateDefaultValues } from 'ui/form/helpers';

import { pointsFromRare, baseItemConfig } from './createItemOptions';

// import './styles.scss';

class Anvil extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = this.getStateWithRare(generateDefaultValues(baseItemConfig));
    }

    onValidate = values => {
        this.setState(this.getStateWithRare(values));
    }

    getStateWithRare = (values) => {
        const { rare = 'usual' } = values;
        const { points, stats, maxRequiredStats } = pointsFromRare[rare];

        return {
            maxPoints: points,
            freePoints: points,
            stats,
            maxRequiredStats,
            values: values,
            data: {}
        }
    }

    render() {
        const { values, maxPoints, freePoints, stats, maxRequiredStats } = this.state;
        const { name, rare, type, subtype } = values;
        const initialValues = generateDefaultValues(baseItemConfig);

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
                <p><b>{name}</b>, {rare} {subtype} ( {type} )</p>
                <p>Points: {freePoints}/{maxPoints}</p>
                <p>(Max stats: {stats})</p>
                <p>(Max required stats: {maxRequiredStats})</p>
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
