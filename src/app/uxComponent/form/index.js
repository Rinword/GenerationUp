import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';
import ComponentBuilder from './componentBuilder';


class Form extends React.PureComponent {
    render() {
        const { initialValues = {}, validate, getRef, config = [], info = {}, className } = this.props;

        return (
            <Formik
                initialValues={initialValues}
                validate={validate}
                ref={getRef}
            >
                {formikProps => (
                    <FormikForm className={className}>
                        <ComponentBuilder
                            components={config}
                            formikProps={formikProps}
                            info={info}
                        />
                    </FormikForm>
                )}
            </Formik>
        )
    }
}

Form.propTypes = {
    initialValues: PropTypes.shape({}),
    validate: PropTypes.func,
    getRef: PropTypes.func,
    config: PropTypes.array,
    info: PropTypes.shape({}),
    className: PropTypes.string
}

Form.defaultProps = {
    initialValues: {},
    validate: () => {},
    getRef: () => {},
    config: [],
    info: {},
    className: ''
}

export { Form };
