import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

import { TextField, Counter, IconCellPicker } from 'ui/form/fields'

const componentMap = {
    text: TextField,
    counter: Counter,
    'icon-cell-picker': IconCellPicker,
}

/**
 * Handles selection and rendering of components from a string name.
 * @param {string} type - String type which will be used to select from the componentsMap.
 * @param {string} model - String with model path in form state, also use for field name in formik.
 * @param {object} props - Props to be passed to the child component.
 * @returns {React.Component}
 */
function ComponentRenderer(props) {
    const { type, model } = props;
    const Component = componentMap[type];

    if (Component) {
        return <Component {...props} name={model} />;
    }

    return (
        <div className={cx('wizard__itemWrap', 'wizard__itemWrap_itemNotFound')}>
            No render for <b>{type}</b>
        </div>
    );
}

function getKey (item, idx) {
    const { model = idx, subModel = '' } = item;

    return `${model}_${subModel || ''}` ;
}

function ComponentBuilder ({ components, formikProps, info }) {
    return components.map( item => <ComponentRenderer key={getKey(item)} { ...item } info={info} />)
}

export default ComponentBuilder;
