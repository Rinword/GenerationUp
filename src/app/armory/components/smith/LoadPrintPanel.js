import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';
import axios from 'axios';

import ComponentBuilder from 'ui/form/componentBuilder';
import { Row, Column, Btn } from 'ui/UxBox';
import { generateItems } from './helpers';

import './styles.scss';

const formConfig = [
    {
        type: 'select',
        model: 'blueprints',
        style: {
            display: 'row',
            size: 'l',
        },
        defaultValue: '111',
        options: { path: 'info.options'},
    },
]

class LoadPrintPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { options: [], pickedBlueprint: '' };
    }

    componentWillMount() {
        axios.get('/api/v1/blueprints/').then(res => {
            if(res.data.data) {
                const items = Object.entries(res.data.data).map(([key, value]) => ({ label: value.name, value: key }))
                this.setState({ options: items })
            }
        })
    }

    componentWillReceiveProps(nextProps) {}

    onChange = id => {
        console.log('change', id);
        this.setState({ pickedBlueprint: id })
    }

    saveBlueprint = () => {
        const { itemOptions = {} } = this.props;

        console.log('SAVE', itemOptions);

        axios.post('/api/v1/blueprint/create', itemOptions).then(res => {
            if(res.data.data) {
                console.log('!!!')
            }
        })
    }

    render() {
        const { data } = this.state;

        return (
            <Row className={cx('load-print-form', this.props.className)} padding="15px">
                <span>Выберите чертеж из списка:</span>
                <Formik
                    initialValues={{}}
                    validate={this.onChange}
                >
                    {formikProps => (
                        <Form>
                            <ComponentBuilder
                                components={formConfig}
                                formikProps={formikProps}
                                info={this.state}
                            />
                        </Form>
                    )}
                </Formik>
                <Row className="load-print-form__create-button">
                    <span>уровень: 14</span>
                    <Btn onClick={this.saveBlueprint}>Сохранить чертеж</Btn>
                    <Btn>Удалить чертеж</Btn>
                </Row>
            </Row>
        );
    }
}

LoadPrintPanel.propTypes = {
    className: PropTypes.string,
};

LoadPrintPanel.defaultProps = {
    className: '',
};

export { LoadPrintPanel };
