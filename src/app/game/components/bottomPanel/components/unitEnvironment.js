import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tooltip } from 'ui/UxBox';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WowTooltip from './subComponents/WowTooltip';

import './tabs.scss';
import './styles.scss';

const baseConfig = {
    artefact1: null,
    artefact2: null,
    chest: null,
    gloves: null,
    leftHand: null,
    pants: null,
    rightHand: null
}

class UnitEnvironment extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { charData = {}, name, color, data = {} } = this.props.data || {};
        const gear = Object.assign(baseConfig, charData.gear || {});

        return (
            <div className={cx('unit-environment', this.props.className)}>
                <Tabs>
                    <TabList>
                        <Tab>Шмот</Tab>
                        <Tab>Окружение</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="wear-panel">
                            <div className="wear-panel__hero-logo icon icon_character" />
                            {Object.values(gear).map( (item, i) => {
                                if(item && item.deepType) {
                                    return (
                                        <Tooltip key={item.deepType} data={item} Overlay={WowTooltip}>
                                            <div
                                                className={cx(`wear-panel__${item.deepType}`, 'icon', '')}
                                                data-imgid={item.iconName}
                                                data-rare={item.rare}
                                            />
                                        </Tooltip>)
                                }

                                const missedName = Object.keys(gear)[i];
                                return <div key={missedName} className={cx(`wear-panel__${missedName}`, 'icon', '')} />
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Окружение</h2>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

UnitEnvironment.propTypes = {
    className: PropTypes.string,
};

UnitEnvironment.defaultProps = {
    className: '',
};

export default UnitEnvironment;
