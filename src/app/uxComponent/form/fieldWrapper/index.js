import React from 'react';
import PropTypes from 'prop-types';

import FieldError from './FieldError';
import FieldLabel from './FieldLabel';
import FieldContainer from './FieldContainer';

import { showIfChecker } from '../helpers';

const nullComponentFunc = () => null;

const FieldWrapperHOC = Component => {
    if (!Component) {
        if (__DEV__) {
            console.error('Component is', Component);
        }
        return nullComponentFunc;
    }

    return class Wrapped extends React.Component {

        render() {
            const { hidden, errorMessage, label, name, size, theme, overflow, margin } = this.props;

            if (!showIfChecker(this.props)) {
                return null;
            }

            // this.checkDefaultValue();

            // const errorText = this.checkError() ? errorMessage : '';
            const errorText = '';

            return (
                <FieldContainer
                    size={size}
                    label={label}
                    theme={theme}
                    hidden={hidden}
                    margin={margin}
                    overflow={overflow}
                    hasError={Boolean(errorText)}
                >
                    <FieldLabel text={label} theme={theme} />
                    <Component {...this.props} />
                    <FieldError text={errorText} name={name} />
                </FieldContainer>
            );
        }
    }
}

export default FieldWrapperHOC;
