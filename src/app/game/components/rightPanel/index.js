import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Btn, Row } from 'ui/UxBox';

import socket from 'app/io';

import './styles.scss';

class RightPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cap: 0,
        };
    }

    onControlClick(event) {
        const action = event.target.dataset.control;
        socket.getSocket().emit('game_control', { action, params: {} })
    }

    componentDidMount() {
        socket.getSocket().on('update_units', data => {
            this.setState({cap: data.cap})
        })
    }

    render() {
        return (
            <div className={cx('right-panel', this.props.className)}>
                <div>rightPanel</div>
                <div>Cap: {this.state.cap}</div>
                <Row margin="10px">
                    <Btn data-control="pause" onClick={this.onControlClick}>Пауза</Btn>
                    <Btn data-control="start_again" onClick={this.onControlClick}>Начать заново</Btn>
                </Row>
            </div>
        );
    }
}

RightPanel.propTypes = {
    className: PropTypes.string,
};

RightPanel.defaultProps = {
    className: '',
};

export default RightPanel;
