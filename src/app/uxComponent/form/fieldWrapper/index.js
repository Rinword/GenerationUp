import React from 'react';
import get from 'lodash/get';

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
        checkDefaultValue = () => {
            const { model, form, defaultValue } = this.props;
            const { setFieldValue, values } = form;
            const value = get(values, model);

            if(defaultValue !== undefined && value === undefined) {
                setFieldValue(model, defaultValue);
            }
        }

        //TODO recursion abyss
        removeValue = () => {
            const { model, form } = this.props;
            const { setFieldValue, values } = form;
            const value = get(values, model);

            if(value !== undefined) {
                setFieldValue(model, undefined);
            }
        }

        componentWillUnmount() {
            console.log('unmount', this.props.field.name)
        }

        render() {
            const { props = {}, style = {}, model = {}, form } = this.props;
            const { label } = props;
            const { size, theme, hidden, margin, overflow, display } = style;

            if (!showIfChecker(this.props)) {
                return null;
            }

            this.checkDefaultValue()
            const errorText = '';

            return (
                <FieldContainer
                    form={form}
                    model={model}
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
