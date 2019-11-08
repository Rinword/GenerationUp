import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn, Form } from 'ui/UxBox';
import ForgedItem from './ForgedItem';
import { createItem }  from './ForgedItem/ItemGenerator';
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

const reagents = [
    {
        icon: 'reagent_white-steel',
        title: 'Белая сталь',
        rare: 3,
        quantity: 2,
    },
    {
        icon: 'reagent_copper',
        rare: 1,
        title: 'Медь',
        quantity: 1,
    },
    {
        icon: 'reagent_usual-steel',
        rare: 0,
        title: 'Обычная сталь',
        quantity: 6,
    },
    {
        icon: 'reagent_light-leather',
        rare: 0,
        title: 'Легкая кожа',
        quantity: 1,
    },
]

const work = [
    {
        icon: 'work_thin-bs',
        title: 'Тонкая ковка',
        rare: 2,
        quantity: 2,
    },
    {
        icon: 'work_balancing',
        title: 'Балансировка',
        rare: 1,
        quantity: 1,
    },
    {
        icon: 'work_rough-bs',
        title: 'Грубая ковка',
        rare: 0,
        quantity: 6,
    },
]

function CraftItem ({ icon, rare, title, quantity }) {
    return (
        <Row jc="space-between" className="craft-item">
            <div className={`craft-item__icon icon icon_size_24 icon_bg-size_32 icon_${icon}`} />
            <div className="craft-item__title" data-rareText={rare}>{title}</div>
            <div className="craft-item__quantity">{quantity}</div>
        </Row>
    )
}

class CreateItemPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { level: 4 };
    }

    createItem = () => {
        const { blueprint } = this.props;
        const { level, pickedBlueprint } = this.state;
        const forgedItem = createItem(blueprint, level);
        console.log('FORGED', forgedItem);
        axios.post('/api/v1/storage/item/create', forgedItem).then(res => {
            if(res.data.data) {
                console.log('SUC');
            }
        })
    }

    render() {
        const { blueprint = null } = this.props;
        const { level } = this.state;

        if(!blueprint) {
            return null;
        }

        return (
            <Row className={cx('create-item-form', this.props.className)} padding="15px 15px 5px">
                <Row className="create-item-form__reagents" ai="stretch" flex="2 1 auto">
                    <Column ai="flex-start">
                        <p><b>Реагенты:</b></p>
                        {reagents.map(item => <CraftItem key={item.title} {...item}/>)}
                    </Column>
                    <Column ai="flex-start">
                        <p><b>Работа:</b></p>
                        {work.map(item => <CraftItem key={item.title} {...item}/>)}
                    </Column>
                </Row>
                <Column className="load-print-form__create-button" ai="flex-end" flex="1 1 auto">
                    <ForgedItem options={blueprint} lvl={level} />
                    <Btn onClick={this.createItem}>Создать предмет</Btn>
                </Column>
            </Row>
        );
    }
}

CreateItemPanel.propTypes = {
    className: PropTypes.string,
};

CreateItemPanel.defaultProps = {
    className: '',
};

export { CreateItemPanel };
