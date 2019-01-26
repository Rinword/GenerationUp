import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';

import styles from './customStyles';

class SelectField extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    filteredOptions = () => {
        const { options, excludedOptions, field } = this.props;
        const { value } = field;

        return options;
    }

    onChange = value => {
        const { form, field } = this.props;
        const { setFieldValue } = form;
        const { name } = field;

        if(setFieldValue instanceof Function) {
            setFieldValue(name, value);
        }

    }

    render() {
        const { className, options, field } = this.props;
        const { value } = field;

        return (
            <Select
                className={cx('ux-select', className)}
                // classNamePrefix="react-select"
                styles={styles}
                defaultValue={value}
                value={value}
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
    excludedOptions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
};

SelectField.defaultProps = {
    className: '',
    options: [],
};

export default SelectField;
