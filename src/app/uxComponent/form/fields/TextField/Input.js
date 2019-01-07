import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './input.scss';

class Input extends React.PureComponent {
    onChange = event => {
        const { onChange, form = {}, field = {} } = this.props;
        const { handleChange } = form;
        const { name } = field;

        if (name && handleChange) {
            handleChange(event);
        }

        if (onChange instanceof Function) {
            onChange(event.target.value);
        }
    };

    onBlur = event => {
        const { onBlur, form } = this.props;
        const { handleBlur } = form;

        if (handleBlur && event) {
            handleBlur(event);
        }

        if (onBlur instanceof Function) {
            onBlur();
        }
    };

    render() {
        const {
            type,
            field, // formik field
            value,
            onClick,
            disabled,
            readonly,
            extraClass,
            placeholder,
            onEnterPress,
        } = this.props;

        const { name, value: formicValue } = field;

        const _handleKeyPress = e => {
            if (e.key === 'Enter') {
                onEnterPress();
            }
        };

        const finalValue = formicValue || value;

        const className = cx(style['ux-input'], { [style['ux-input_disabled']]: disabled }, extraClass);

        return (
            <input
                type={type}
                name={name}
                value={finalValue}
                onClick={onClick}
                onBlur={this.onBlur}
                readOnly={readonly}
                disabled={disabled}
                className={className}
                placeholder={placeholder}
                onKeyPress={_handleKeyPress}
                onChange={this.onChange}
            />
        );
    }
}

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    form: PropTypes.shape({}),
    field: PropTypes.shape({}),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onEnterPress: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    extraClass: PropTypes.string,
};

function noFunc() {}

Input.defaultProps = {
    value: '',
    form: {},
    field: {},
    type: 'text',
    placeholder: '',
    extraClass: '',
    onChange: noFunc,
    onClick: noFunc,
    onBlur: noFunc,
    onEnterPress: noFunc,
    readonly: false,
    disabled: false,
};

export default Input;