import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column } from 'ui/UxBox';

import './styles.scss';

class UnitBehaviour extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { behaviourData = {} } = this.props.data || {};
        const actionsList = behaviourData.actionsList || [];

        return (
            <div className={cx(this.props.className, 'unit-behaviour')}>
                <Column className="env-panel" ai="stretch">
                    {actionsList.map((action, i) => (
                        <Column key={action.brainsForAction.name + action.target.name} padding="5px 5px" className={cx('unit-behaviour__row')}>
                            <Row ai="center" className={cx('unit-behaviour__header')}>
                                <span>{i + 1}.</span>
                                <span><b>{action.rating}</b></span>
                                <span>{action.action.langName} </span>
                                <span style={{color: action.target.color}}>{action.target.name || '[no_target]'}</span>
                                <span>{action.brainsForAction.type === 'skill' ? '(действие)' : '(движение)'} </span>

                            </Row>
                            <Row ai="center" multiStr={true}>
                                {action.behaviourArr.map((bh => (
                                    <p
                                        key={bh.name + action.target.name}
                                        className={cx('unit-behaviour__factor')}
                                    >
                                        <span>{bh.name}:</span>
                                        {`${bh.type === 'mult' ? '*' : '+'}${bh.rating}`}
                                    </p>
                                )))}
                            </Row>
                        </Column>
                    ))}
                </Column>
            </div>
        );
    }
}

UnitBehaviour.propTypes = {
    className: PropTypes.string,
};

UnitBehaviour.defaultProps = {
    className: '',
};

export default UnitBehaviour;
