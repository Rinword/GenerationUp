import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import socket from 'app/io';

import './styles.scss';

class RightPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cap: 0,
        };
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
