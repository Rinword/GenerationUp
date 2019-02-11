import { get, set, isEmpty } from 'lodash';

/**
 * Check value in path for match value or isDefined
 * @param {object} data - object with data
 * @param {string} path - path for match
 * @param {any} value
 * @param {array} oneOfValues
 * @param {boolean} isDefined - returns true is value in path is not lead to false
 * @param {number} moreThan - returns true is value in path is not lead to false
 * @return {boolean}
 */
function checkInDataWithPath(data, path, value, oneOfValues, isDefined, moreThan) {
    if (!path) {
        return true;
    }

    if (isDefined === false) {
        return !get(data, path, '');
    }

    if (isDefined) {
        return Boolean(get(data, path, ''));
    }

    if(!Number.isNaN(moreThan) && moreThan !== undefined) {
        // console.log('!!!', moreThan, get(data, path, 0), get(data, path, 0) > moreThan);
        return get(data, path, 0) > moreThan;
    }

    if(oneOfValues instanceof Array) {
        return oneOfValues.indexOf(get(data, path, '')) > -1;
    }

    if (value !== undefined) {
        return get(data, path) === value;
    }

    return true;
}

/**
 * Check props with path and validate it with type
 * @param {object} model - options to check
 * @param props - props of field
 * @return {boolean}
 */
function checkInProps(model, props) {
    if (!model || isEmpty(props)) return true;
    const { path, type } = model;

    const options = get(props, path, []);

    switch (type) {
        case 'Array':
            return options.length > 0;

        default:
            console.warn('unrecognized showIf type', type);
            return true;
    }
}

/**
 * Returns true if the item can be shown.
 * Some items have a show if field, which we'll check here.
 *
 * @param {object} form - Formik state representation.
 * @param {object} field - Formik field info.
 * @param {object} info - Wizard state options.
 * @param {object|undefined} showIf - Show if containing checking information.
 * @returns {Boolean}
 */
export function showIfChecker({ form, field = {}, info, showIf, ...props }) {
    if (!(showIf instanceof Object)) return true;

    const { path, statePath, isDefined, value, hasDataInProps, noResetModelValues, oneOfValues, moreThan } = showIf;
    const { values } = form;

    const isShown =
        checkInDataWithPath(info, statePath, value, oneOfValues, isDefined, moreThan) &&
        checkInDataWithPath(values, path, value, oneOfValues, isDefined, moreThan) &&
        checkInProps(hasDataInProps, props);

    const formValue = form.values[field.name];

    // remove value from form if this field not shown, otherwise it will be inside form.values and
    // can make wrong wizard loading with dependent selects
    // if (!noResetModelValues && !isShown && formValue) {
    //     // delete form.values[field.name];
    //     if (form.setFieldValue instanceof Function) {
    //         form.setFieldValue(field.name, undefined);
    //     }
    // }

    return isShown;
}

/**
 * Returns object with defaultValuesForm
 * @param config
 * @param info
 * @returns {object}
 */
export function generateDefaultValues(config, info = {}) {
    const formModel = {};

    const checkRow = field => {
        const { type, model, defaultValue, subModel, showIf } = field;

        const isShown =
            showIfChecker({ form: { values: JSON.parse(JSON.stringify(formModel)) }, field: { name: model }, showIf, info });

        if(defaultValue !== undefined && isShown) {
            set(formModel, model, defaultValue);
        }
    }

    config.forEach(field => {
        const { type, list = [] } = field;
        if(type === 'row') {
            list.forEach(checkRow)
        }

        return checkRow(field)
    });

    return formModel;
}