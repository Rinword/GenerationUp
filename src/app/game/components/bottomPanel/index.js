import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import socket from 'app/io';

import State from './components/unitState';
import Gear from './components/unitGear';
import Environment from './components/unitEnvironment';
import Behaviour from './components/unitBehaviour';

import './styles.scss';

class BottomPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        socket.getSocket().on('update_selected_unit', data => {
            this.setState({data})
        })
    }

    render() {
        return (
            <div className={cx('bottom-panel', this.props.className)}>
                <State className={cx('bottom-panel__state')} {...this.state.data} />
                <Gear className={cx('bottom-panel__gear')} {...this.state.data} />
                <Environment className={cx('bottom-panel__env')} {...this.state.data} />
                <Behaviour className={cx('bottom-panel__behaviour')} {...this.state.data} />
            </div>
        );
    }
}

BottomPanel.propTypes = {
    className: PropTypes.string,
};

BottomPanel.defaultProps = {
    className: '',
};

export default BottomPanel;
