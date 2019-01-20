import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import TextField from '../TextField';

import './styles.scss';

class Class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderLeft = () => {
        const { field, minValue = false } = this.props;
        const { value } = field;
        const isDisabled = (minValue !== false ? value <= minValue : false) || this.checkStateBlock('decrease');
        return <b className={cx('ux-counter__arrow', { ['ux-counter__arrow_disabled'] : isDisabled})}>{'<'}</b>
    }

    renderRight = () => {
        const { field, maxValue = false } = this.props;
        const { value } = field;
        const isDisabled = (maxValue !== false ? value >= maxValue : false) || this.checkStateBlock('increase');
        return <b className={cx('ux-counter__arrow', { ['ux-counter__arrow_disabled'] : isDisabled})}>{'>'}</b>
    }

    decrease = () => {
        const { onChange, form, field, minValue = false } = this.props;
        const { setFieldValue } = form;
        const { name, value } = field;

        if(this.checkStateBlock('decrease') || (minValue !== false && value - 1 < minValue)) {
            return;
        };

        if(setFieldValue instanceof Function) {
            return setFieldValue(name, value - 1);
        }
    }

    increase = () => {
        const { onChange, form, field, maxValue = false } = this.props;
        const { setFieldValue } = form;
        const { name, value } = field;

        if(this.checkStateBlock('increase') || (maxValue !== false && value + 1 > maxValue)) {
            return;
        };

        if(setFieldValue instanceof Function) {
            return setFieldValue(name, value + 1);
        }
    }

    checkStateBlock = type => {
        const { info, externalStateIncreaseControl, model } = this.props;
        return get(info, `${externalStateIncreaseControl}.${model}.${type}`, false);
    }

    render() {
        const { className, renderLeft, renderRight, ...restProps } = this.props;
        const { props = {}, style = {} } = restProps;
        const { label } = props;
        const { display = 'col' } = style;

        if( display === 'row') {
            return (
                <div className={cx('ux-counter', className, 'ux-counter_display_row')}>
                    <span>{label}:</span>
                    <TextField
                        {...restProps}
                        size="s"
                        readonly
                        renderLeft={this.renderLeft()}
                        onLeftClick={this.decrease}
                        renderRight={this.renderRight()}
                        onRightClick={this.increase}
                    />
                </div>
            )
        }

        return (
            <div className={cx('ux-counter', className)}>
                <TextField
                    {...restProps}
                    renderLeft={this.renderLeft()}
                    onLeftClick={this.decrease}
                    renderRight={this.renderRight()}
                    onRightClick={this.increase}
                />
            </div>
        );
    }
}

Class.propTypes = {
    className: PropTypes.string,
};

Class.defaultProps = {
    className: '',
};

export default Class;
