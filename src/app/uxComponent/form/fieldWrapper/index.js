import React from 'react';

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
            const { props = {}, style = {}, model = {} } = this.props;
            const { label } = props;
            const { size, theme, hidden, margin, overflow, display } = style;

            if (!showIfChecker(this.props)) {
                return null;
            }

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
                    <FieldLabel text={label} theme={theme} display={display} />
                    <Component {...this.props} />
                    <FieldError text={errorText} name={model} />
                </FieldContainer>
            );
        }
    }
}

export default FieldWrapperHOC;
