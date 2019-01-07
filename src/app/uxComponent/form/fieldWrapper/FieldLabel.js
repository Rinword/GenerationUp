import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from '../styles.scss';

/**
 * Render label for field if text exists (should be already translated)
 * @param theme
 * @param text
 * @return {*}
 * @constructor
 */
export default function FieldLabel({ theme, text }) {
    if (!text) return null;

    return <p className={cx(styles['ux-field-wrap__label'], styles[`theme_${theme}`])}>{text}</p>;
}

FieldLabel.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    text: PropTypes.string,
};

FieldLabel.defaultProps = {
    theme: 'light',
    text: '',
};