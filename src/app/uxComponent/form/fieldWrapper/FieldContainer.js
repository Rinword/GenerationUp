import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import '../styles.scss';

/**
 * Wrap the field container and apply visible staff like size, margin,
 * @param children
 * @param size
 * @param hasError
 * @param hidden
 * @param name
 * @param overflow
 * @param margin
 * @return {XML}
 * @constructor
 */
export default function FieldContainer({ children, size, hasError, hidden, name, overflow, margin }) {
    const className = cx(
        'ux-field-wrap',
        `ux-field-wrap_size_${size}`,
        `ux-field-wrap_overflow_${overflow}`,
        {
            ['ux-field-wrap_invalid']: hasError,
            ['ux-field-wrap_hidden']: hidden,
            [`ux-field-wrap_margin_${margin}`]: margin,
        }
    );
    const id = name ? `container_${name.replace('.', '-')}` : null;

    return (
        <div id={id} className={className}>
            {children}
        </div>
    );
}

FieldContainer.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf('xxs, xs, s, m, l, xl, xxl'),
    hidden: PropTypes.bool,
    hasError: PropTypes.bool,
    name: PropTypes.string,
    overflow: PropTypes.string,
    margin: PropTypes.string,
};

FieldContainer.defaultProps = {
    size: 'm',
    hidden: false,
    hasError: false,
    name: '',
    overflow: 'hidden',
    margin: '',
};
