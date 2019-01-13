import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { get } from 'lodash';

import './styles.scss';

class IconCellPicker extends React.Component {
    constructor(props) {
        super(props);

        const { field, options } = props;
        let { value } = field;

        if(!value) {
            value = get(options, '[0].value', null)
        }

        this.state = { value };
    }

    shouldComponentUpdate(nextProps) {
        const { value: oldValue } = this.state;
        const { field } = nextProps;
        const { value: newValue } = field;

        if(oldValue !== newValue) {
            this.setState({ value: newValue });
        }

        return oldValue !== newValue;
    }

    onChange = event => {
        const { onChange, form, field } = this.props;
        const { setFieldValue } = form;
        const { name } = field;

        event.preventDefault();
        event.stopPropagation();

        const value = get(event, 'target.dataset.value', null);

        if(value === null) return;

        if(setFieldValue instanceof Function && name) {
            setFieldValue(name, value);
        }

        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        const { className, options, props } = this.props;
        const { noBg } = props;

        return (
            <div className={cx('ux-icon-cell-picker', className, {
                'ux-icon-cell-picker_noBg': noBg,
            })}>
                {options.map(option =>
                    <IconCell key={option.value} {...option} selected={value} onClick={this.onChange}/>)}
            </div>
        );
    }
}

IconCellPicker.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    form: PropTypes.shape({}),
    field: PropTypes.shape({}),
    noBg: PropTypes.shape({
        noBg: PropTypes.bool,
    }),
};

IconCellPicker.defaultProps = {
    className: '',
    options: [],
    form: {},
    field: {},
    props: {
        noBg: false,
    },
};

function IconCell({ name, value, icon, selected, disabled, onClick }) {
    const isSelected = value === selected;

    return (
        <div className={cx('ux-icon-cell-picker__item', {
            'ux-icon-cell-picker__item_selected': isSelected ,
            'ux-icon-cell-picker__item_disabled': disabled
        })}>
            <div
                data-value={value}
                className={cx('icon', `icon_${icon}`, 'ux-icon-cell-picker__icon')}
                onClick={disabled ? '' : onClick}
            />
            {/*<span style={{position: 'absolute', zIndex: 10, bottom: '-10%'}}>{name}</span>*/}
        </div>
    )
}

IconCell.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    icon: PropTypes.string,
    selected: PropTypes.any,
    disabled: PropTypes.bool,
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

IconCell.defaultProps = {
    name: '',
    value: '',
    icon: 'default',
    disabled: false,
    selected: PropTypes.any,
    onClick: () => {},
}

export default IconCellPicker;
