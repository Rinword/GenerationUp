import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ForgedItem from '../../smith/ForgedItem';
import { work, reagents, CraftItem } from '../../smith/CreateItemPanel'

import { Row, Column, Btn } from 'ui/UxBox';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './styles.scss';


class ActionsTab extends React.PureComponent {
    render() {
        const { item = {} } = this.props;

        return (
            <Column className={cx('inventory-actions-tab', this.props.className)}>
                <Row ai="flex-start">
                    <Row flex="1 0 240px" ai="flex-start" style={{ minHeight: '270px' }}>
                        <ForgedItem item={item} />
                    </Row>
                    <Column flex="1 1 auto" ai="flex-end">
                        <p>Стоимость: 840 or</p>
                        <p>Прочность: 50/85</p>
                        <p>Экипировано: Joe</p>
                    </Column>
                </Row>
                <Tabs activeTab={2} className="react-tabs react-tabs_size_small actions-tab">
                    <TabList>
                        <Tab>Улучшить</Tab>
                        <Tab>Разобрать</Tab>
                        <Tab>Продать</Tab>
                        <Tab>Уничтожить</Tab>
                    </TabList>
                    <TabPanel>
                        <p>
                            Улучшить предмет путем повышения его уровня. Выберите требуемый уровень и увидите ресурсы и
                            и работу необходимую для его улучшения.
                        </p>
                        <p>Уровень: 19</p>
                        <p>Реагенты:</p>
                        <Row multiStr>
                            {reagents.map(i => <CraftItem key={i.title} {...i}/>)}
                        </Row>
                        <p>Работа:</p>
                        <Row multiStr>
                            {work.map(i => <CraftItem key={i.title} {...i}/>)}
                        </Row>
                        <Row jc="flex-end">
                            <Btn>Отремотировать</Btn>
                            <Btn>Улучшить</Btn>
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <Column className="actions-tab" jc="flex-start">
                            <p>
                                Разобрав предмет на компоненты вы вернете часть ресурсов затраченные на его создание.
                                Это действие займет время ваших ремесленников. Действие необратимо.
                                В случае отмены разборки вы теряете предмет и получаете часть ресурсов от полной разборки.
                            </p>
                            <p>Разобрав этот предмет вы получите:</p>
                            <Row multiStr>
                                {reagents.map(i => <CraftItem key={i.title} {...i}/>)}
                            </Row>
                            <p>Разбока потребует следующую работу:</p>
                            <Row multiStr>
                                {work.map(i => <CraftItem key={i.title} {...i}/>)}
                            </Row>
                            <Row jc="flex-end">
                                <Btn>Разобрать</Btn>
                            </Row>
                        </Column>


                    </TabPanel>
                    <TabPanel>
                        <p>Стоимость: 840 or</p>
                        <p>Средняя стоимость в этом регионе: 920 or</p>
                        <Row jc="flex-end">
                            <Btn>Продать</Btn>
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <p>Уничтожение предмета мгновенно освободит слот в инвентаре. Это действие необратимо.</p>
                        <Row jc="flex-end">
                            <Btn>Учичтожить предмет</Btn>
                        </Row>
                    </TabPanel>
                </Tabs>
            </Column>
        );
    }
}

ActionsTab.propTypes = {
    className: PropTypes.string,
    selected: PropTypes.shape({}),
};

ActionsTab.defaultProps = {
    className: '',
    selected: {}
};

export default ActionsTab;
