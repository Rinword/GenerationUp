import React from 'react';
import { Field } from 'formik';

export default function FormicFieldWrapper(Component) {
    return props => <Field {...props} component={Component} />;
}