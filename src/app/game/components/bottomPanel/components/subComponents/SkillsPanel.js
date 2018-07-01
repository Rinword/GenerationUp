import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { Tooltip } from 'ui/UxBox';
import WowTooltip from './WowTooltip';
import CoolDown from './cooldownMask';

import './skills.scss';

class SkillsPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.formatSkills = this.formatSkills.bind(this);
        this.syncWithCD = this.syncWithCD.bind(this);
        this.state = {
            skills: this.formatSkills(props.skills),
        };
    }

    formatSkills(skillsObj, coolDownData) {
        skillsObj = this.syncWithCD(skillsObj, coolDownData);
        let skillsArr = [];

        skillsArr = skillsArr.concat(Object.values(skillsObj.active || {}));
        while(skillsArr.length < 5) {
            skillsArr.push({name: 'empty' + skillsArr.length})
        }

        return skillsArr;
    }

    syncWithCD(skillsObj, coolDownData) {
        const activeSkills = skillsObj.active;
        for( let key in activeSkills) {
            if(coolDownData[key]) {
                activeSkills[key].coolDownData = coolDownData[key]
            }
        }

        return skillsObj;
    }

    componentWillReceiveProps({ skills, coolDownData}) {
        this.setState({skills: this.formatSkills(skills, coolDownData)});
    }

    render() {
        const { skills } = this.state;

        return (
            <div className={cx('skill-panel', this.props.className)}>
                {skills.map((item, i) =>
                    <CoolDown key={item.name} percent={_.get(item, 'coolDownData.percent', 0)} time={_.get(item, 'coolDownData.time', 0)}>
                        <Tooltip  data={item} Overlay={WowTooltip}>
                            <div
                                className={cx('skill-panel__skill', `icon icon_ability_${i + 1}`)}
                                data-imgid={item.iconName}
                            />
                        </Tooltip>
                    </CoolDown>
                )}
            </div>
        );
    }
}

SkillsPanel.propTypes = {
    className: PropTypes.string,
    skills: PropTypes.object,
    coolDownData: PropTypes.object,
};

SkillsPanel.defaultProps = {
    className: '',
    skills: {},
    coolDownData: {},
};

export default SkillsPanel;
