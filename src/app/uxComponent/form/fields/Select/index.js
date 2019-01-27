import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';
import get from 'lodash/get';

import styles from './customStyles';

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
        const { className, options, field } = this.props;
        const { value } = field;

        const filteredOptions = this.filteredOptions();
        const optionValue = this.filteredOptions().find( i => i.value === value);

        return (
            <Select
                className={cx('ux-select', className)}
                classNamePrefix="react-select"
                styles={styles}
                value={optionValue}
                onChange={this.onChange}
                options={this.filteredOptions()}
            />
        );
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
