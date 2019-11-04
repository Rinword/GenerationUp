import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn, Form } from 'ui/UxBox';
import { generateItems } from './helpers';

import './styles.scss';

const formConfig = [
    {
        type: 'select',
        model: 'blueprints',
        style: {
            display: 'row',
            size: 'xl',
        },
        defaultValue: null,
        options: { path: 'info.options'},
    },
]

class LoadPrintPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { options: [], pureOptions: {}, pickedBlueprint: '' };
    }

    componentWillMount() {
        this.getBlueprints();
    }

    getBlueprints = () => {
        axios.get('/api/v1/blueprints/').then(res => {
            if(res.data.data) {
                const items = Object.entries(res.data.data).map(([key, value]) => (
                    { label: `${value.name} (${value.type} ${value.subtype})`, value: key, rare: value.rare }))
                this.setState({ options: items, pureOptions: res.data.data })
            }
        })
    }

    componentWillReceiveProps(nextProps) {}

    onChange = model => {
        const { onChange } = this.props;
        const { pureOptions } = this.state;
        this.setState({ pickedBlueprint: model.blueprints });
        onChange(pureOptions[model.blueprints], model.blueprints)
    }

    saveBlueprint = () => {
        const { itemOptions = {} } = this.props;

        axios.post('/api/v1/blueprint/create', itemOptions).then(res => {
            this.getBlueprints();
        })
    }

    deleteBlueprint = () => {
        const { pickedBlueprint } = this.state;

        if(pickedBlueprint) {
            axios.delete(`/api/v1/blueprint/delete/${pickedBlueprint}`).then(res => {
                this.getBlueprints();
            })
        }
    }

    render() {
        return (
            <Column className={cx('load-print-form', this.props.className)} padding="15px">
                <Row>
                    <Row>
                        <Form
                            validate={this.onChange}
                            config={formConfig}
                            info={this.state}
                        />
                    </Row>
                    <Row jc="flex-end">
                        <Btn onClick={this.saveBlueprint}>Сохранить чертеж</Btn>
                        <Btn onClick={this.deleteBlueprint}>Удалить чертеж</Btn>
                    </Row>
                </Row>
            </Column>
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
