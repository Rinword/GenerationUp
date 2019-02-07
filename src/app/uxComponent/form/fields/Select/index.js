import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';
import get from 'lodash/get';

import stylesJS from './customStyles';
import styles from './styles.scss';

function Sticker({ option = {}, currentOption = {}, onChange }) {
    const { label, value, disabled = false } = option;
    const { value: currentValue } = currentOption;
    const isSelected = currentValue === value;

    const className = cx('ux-select__sticker', {
        ['ux-select__sticker_selected']: isSelected,
        ['ux-select__sticker_disabled']: disabled,
    });

    return <div className={className} onClick={() => disabled ? '' : onChange(option)}>{label}</div>
}

class SelectField extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    filteredOptions = () => {
        const { options, excludedOptions, info, field } = this.props;
        const { value } = field;

        if(excludedOptions instanceof Array) {
            return options.filter(opt => !(excludedOptions.indexOf(opt.value) > -1) || opt.value === value);
        }

        const { statePath } = excludedOptions;
        const stateExOptions = get(info, statePath, []);

        return options.filter(opt => !(stateExOptions.indexOf(opt.value) > -1) || opt.value === value);
    }

    disabledOptions = filteredOptions => {
        const { disabledOptions = ["intellect"], info } = this.props;

        if(disabledOptions instanceof Array) {
            return filteredOptions.map(opt => {
                if(disabledOptions.indexOf(opt.value) < 0) {
                    return opt;
                }

                return {
                    ...opt,
                    disabled: true,
                }
            } );
        }

        const { statePath } = disabledOptions;
        const stateDisOptions = get(info, statePath, ["intellect"]);

        console.log(filteredOptions, stateDisOptions)

        return filteredOptions.map(opt => {
            if(stateDisOptions.indexOf(opt.value) < 0) {
                return opt;
            }

            return {
                ...opt,
                disabled: true,
            }
        });
    }

    onChange = optionValue => {
        const { form, field } = this.props;
        const { setFieldValue } = form;
        const { name } = field;

        const { value } = optionValue;

        if(setFieldValue instanceof Function) {
            setFieldValue(name, value);
        }
    }

    render() {
        const { className, options, field, style } = this.props;
        const { displayMode = 'default' } = style;

        const { value } = field;

        const filteredOptions = this.filteredOptions();
        const finalOptions = this.disabledOptions(filteredOptions);
        const currentOption = this.filteredOptions().find( i => i.value === value) || filteredOptions[0];

        switch(displayMode) {
            case 'stickers':
                return ( <div className={cx('ux-select', 'ux-select_stickers')}>
                    {finalOptions.map((option, i) =>
                        <Sticker
                            key={option.value}
                            option={option}
                            currentOption={currentOption}
                            onChange={this.onChange}
                        />)}
                </div>);

            default:
                return (
                    <Select
                        className={cx(className)}
                        styles={stylesJS}
                        value={currentOption}
                        onChange={this.onChange}
                        options={finalOptions}
                    />
                );
        }
    }
}

SelectField.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    excludedOptions: PropTypes.oneOfType([
        PropTypes.shape({

        }),
        PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }))
    ]),
};

SelectField.defaultProps = {
    className: '',
    options: [],
    excludedOptions: [],
};

export default SelectField;
