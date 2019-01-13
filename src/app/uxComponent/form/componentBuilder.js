import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.scss';

import { TextField, IconCellPicker } from 'ui/form/fields'

const componentMap = {
    text: TextField,
    'icon-cell-picker': IconCellPicker,
}

/**
 * Handles selection and rendering of components from a string name.
 * @param {string} type - String type which will be used to select from the componentsMap.
 * @param {string} model - String with model path in form state, also use for field name in formik.
 * @param {object} props - Props to be passed to the child component.
 * @returns {React.Component}
 */
function ComponentRenderer({ type, model, ...props }) {
    const Component = componentMap[type];

    if (Component) {
        return <Component {...props} name={model} />;
    }

    return (
        <div className={cx(styles.wizard__itemWrap, styles.wizard__itemWrap_itemNotFound)}>
            No render for <b>{type}</b>
        </div>
    );
}

function ComponentBuilder ({ components, formikProps }) {
    return components.map( item => <ComponentRenderer key={item.model} { ...item } />)
}

export default ComponentBuilder;
