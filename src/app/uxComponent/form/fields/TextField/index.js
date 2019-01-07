import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BaseInput from './Input';
import style from './styles.scss';

function renderOnlyWithComponent({ onClick, className, Component }) {
    if (!Component) {
        return null;
    }

    if (onClick instanceof Function) {
        return (
            <div onClick={onClick} className={className} role="button">
                {Component}
            </div>
        );
    }

    return <div className={className}>{Component}</div>;
}

renderOnlyWithComponent.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    Component: PropTypes.node,
};

renderOnlyWithComponent.defaultProps = {
    className: '',
    onClick: undefined,
    Component: false,
};

function getInputParams({
        ref,
        Input,
        theme,
        focused,
        onFocus,
        className,
        maxLength,
        renderLeft,
        onLeftClick,
        renderRight,
        onRightClick,
        renderTooltip,
        overflow,
        Tooltip,
        ...params
    }) {
    return params;
}

class BaseField extends React.PureComponent {
    renderInput() {
        const { Input } = this.props;

        return <Input {...getInputParams(this.props)} />;
    }

    renderLeft = () => {
        const { renderLeft, onLeftClick } = this.props;

        return renderOnlyWithComponent({
            className: style['ux-field__left-content'],
            Component: renderLeft,
            onClick: onLeftClick,
        });
    };

    renderRight = () => {
        const { renderRight, onRightClick } = this.props;

        return renderOnlyWithComponent({
            className: style['ux-field__right-content'],
            Component: renderRight,
            onClick: onRightClick,
        });
    };

    renderTooltip = () => {
        const { renderTooltip } = this.props;

        return renderOnlyWithComponent({
            className: style['ux-field__info-content'],
            Component: renderTooltip,
        });
    };

    render() {
        const { theme, focused, Tooltip, overflow, className } = this.props;

        return (
            <div className={cx(style['ux-field__container'], style[`theme_${theme}`])}>
                <div
                    className={cx(
                        className,
                        style['ux-field'],
                        style['ux-field-wrap__field'],
                        style[`ux-field_overflow_${overflow}`],
                        { [style['ux-field_focused']]: focused }
                    )}
                >
                    {this.renderLeft()}
                    {this.renderInput()}
                    {this.renderRight()}
                    {this.renderTooltip()}
                    {Tooltip && <Tooltip {...this.props} />}
                </div>
            </div>
        );
    }
}

BaseField.propTypes = {
    Input: PropTypes.func,
    onLeftClick: PropTypes.func,
    onRightClick: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onEnterPress: PropTypes.func,

    Tooltip: PropTypes.func,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    className: PropTypes.string,
    overflow: PropTypes.string,

    theme: PropTypes.oneOf(['light', 'dark']),
    renderLeft: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    renderRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    renderTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
};

BaseField.defaultProps = {
    className: '',
    theme: 'light',
    renderLeft: false,
    renderRight: false,
    renderTooltip: false,
    overflow: 'hidden',

    Tooltip: null,
    Input: BaseInput,
    onFocus: () => {},
    onChange: () => {},
    onLeftClick: () => {},
    onRightClick: () => {},
    onEnterPress: () => {},
    disabled: false,
    focused: false,
};

export default BaseField;