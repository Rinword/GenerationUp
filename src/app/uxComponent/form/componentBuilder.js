import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'ui/UxBox';

import './styles.scss';

import { TextField, Counter, IconCellPicker, Select } from 'ui/form/fields';

const componentMap = {
    text: TextField,
    counter: Counter,
    select: Select,
    'icon-cell-picker': IconCellPicker,
}

function getKey (item, idx) {
    const { model = idx, subModel = '' } = item;

    return `${model}_${subModel || ''}` ;
}

function RowComponentRender(props) {
    const { list, style, info } = props;
    
    return (
        <Row {...style}>
            {list.map( (item, i) => <ComponentRenderer key={getKey(item, i)} { ...item } info={info} />)}
        </Row>
    )
}

RowComponentRender.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.shape({}),
    info: PropTypes.shape({}),
}

RowComponentRender.defaultProps = {
    list: [],
    style: {},
    info: {},
}

/**
 * Handles selection and rendering of components from a string name.
 *
 * @param {string} props.type - String type which will be used to select from the componentsMap.
 * @param {string} props.model - String with model path in form state, also use for field name in formik.
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
        <div>No render for <b>{type}</b></div>
    );
}

function ComponentBuilder ({ components, formikProps, info }) {
    return components.map( (item, i) => {
        const { type } = item;
        switch (type) {
            case 'row':
                return <RowComponentRender key={getKey(item, i)} { ...item } info={info} />
            default:
                return <ComponentRenderer key={getKey(item)} { ...item } info={info} />
        }
    })
}

export default ComponentBuilder;
