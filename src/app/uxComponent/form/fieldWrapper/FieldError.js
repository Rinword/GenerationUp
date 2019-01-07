import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import styles from '../styles.scss';

/**
 * Renders a red error text.
 * Will attempt to translate the text.
 *
 * @param {string} text - Error text if any.
 * @param {string} name - Name (model) of the current field.
 * @param {function} translate - i18next translator.
 * @returns {Return Type} Return description.
 */
export function FieldError({ text, name, translate }) {
    if (Boolean(text) !== true) {
        return null;
    }

    const className = cx(styles['ux-field-wrap__errors-area'], styles['ux-field-wrap__errors-area_shown']);

    if (name === 'amount') {
        return <div className={className}>{text}</div>;
    }

    return <div className={className}>{translate(text)}</div>;
}

FieldError.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string,
    translate: PropTypes.func,
};

FieldError.defaultProps = {
    text: false,
    name: '',
    translate: i => i,
};

/**
 * FieldError emulator from FieldWrapper, special for deep inputs in complex fields
 * @param children - wrapped clean ux-field (without ux-field.wrap)
 * @param {object} form - Formik instance of form
 * @param {object} field - Formik instance of field
 * @param {string} name - deep name for complex field - last part of name after field.name
 * @return {React.Node}
 * @constructor
 */
export function ErrorWrapper({ children, form, field, name }) {
    const isTouched = get(form, `touched.${field.name}`, '');
    const error = isTouched && get(form, `errors.${field.name}.${name}`, '');

    return (
        <div
            className={cx('ux-field-wrapper', {
                'ux-field-wrap_invalid': !!error,
            })}
        >
            {children}
            <div
                className={cx('ux-field-wrap__errors-area', {
                    'ux-field-wrap__errors-area_shown': !!error,
                })}
            >
                {error}
            </div>
        </div>
    );
}

ErrorWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    form: PropTypes.shape({}),
    field: PropTypes.shape({}),
    name: PropTypes.string,
};

ErrorWrapper.defaultProps = {
    form: {},
    field: {},
    name: '',
};

export default FieldError;
