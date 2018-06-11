import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Tooltip } from 'ui/UxBox';
import WowTooltip from './WowTooltip';

import './skills.scss';

class SkillsPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.formatSkills = this.formatSkills.bind(this);
        this.state = {
            skills: this.formatSkills(props.skills),
        };
    }

    formatSkills(skillsObj) {
        let skillsArr = [];
        skillsArr = skillsArr.concat(Object.values(skillsObj.active || {}));
        while(skillsArr.length < 5) {
            skillsArr.push({name: 'empty' + skillsArr.length})
        }

        return skillsArr;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.skills !== this.props.skills) {
            this.setState({skills: this.formatSkills(nextProps.skills)});
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    render() {
        const {skills} = this.state;

        // console.log('skills', skills);

        return (
            <div className={cx('skill-panel', this.props.className)}>
                {skills.map((item, i) =>
                    <Tooltip key={item.name} data={item} Overlay={WowTooltip}>
                        <div
                            className={cx('skill-panel__skill', `icon icon_ability_${i + 1}`)}
                            data-imgid={item.iconName}
                        />
                    </Tooltip>)}
            </div>
        );
    }
}

SkillsPanel.propTypes = {
    className: PropTypes.string,
    skills: PropTypes.object,
};

SkillsPanel.defaultProps = {
    className: '',
    skills: {},
};

export default SkillsPanel;
