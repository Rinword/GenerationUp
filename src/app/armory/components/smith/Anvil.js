import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';

import { Row, Column, Btn } from 'ui/UxBox';
import ComponentBuilder from 'ui/form/componentBuilder';

import { pointsFromRare, baseItemConfig } from './createItemOptions';

// import './styles.scss';

class Anvil extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = this.getDefaultStateWithRare();
    }

    onValidate = values => {
        console.log('onChange', values);
    }

    getDefaultStateWithRare = (rare = 1) => {
        const { points, stats, maxRequiredStats } = pointsFromRare[rare];

        return {
            selectedRare: rare,
            maxPoints: points,
            freePoints: points,
            data: {

            }
        }
    }

    render() {
        return (
            <Column ai="flex-start" className={cx('anvil', this.props.className)}>
                <Formik
                    initialValues={{
                        name: 'Name',
                        type: 'oneHandWeapon'
                    }}
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
