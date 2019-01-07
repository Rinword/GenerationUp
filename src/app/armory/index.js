import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { Row, Column } from 'ui/UxBox';

import Smith from './components/Smith';
import Storage from './components/Storage';

import './styles.scss';

class About extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('armory', this.props.className)}>
                <Row className={cx('armory__title')}>
                    <h1>Armory</h1>
                </Row>
                <Column className={cx('armory__content')} ai="flex-start">
                    <Tabs>
                        <TabList>
                            <Tab>Кузница</Tab>
                            <Tab>Склад</Tab>
                            <Tab>Персонажи</Tab>
                        </TabList>
                        <TabPanel>
                            <Smith />
                        </TabPanel>
                        <TabPanel>
                            <Storage />
                        </TabPanel>
                        <TabPanel>
                            Персонажи
                        </TabPanel>
                    </Tabs>
                </Column>
            </div>
        );
    }
}

About.propTypes = {
    className: PropTypes.string,
};

About.defaultProps = {
    className: '',
};

export default About;
