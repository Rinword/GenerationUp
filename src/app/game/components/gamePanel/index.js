import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import Game from './GameView';

import './styles.scss';

class GamePanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};

        this.getCanvas = canvas => this.canvas = canvas;
    }

    componentDidMount() {
        console.log(this.getCanvas())
        // this.game = new Game(this.getCanvas());

    }

    render() {
        return (
            <div className={cx('game-panel', this.props.className)}>
                <canvas className="main-panel__canvas" height='600' width='900' id='mainCanvas' ref={this.getCanvas} />
            </div>
        );
    }
}

GamePanel.propTypes = {
    className: PropTypes.string,
};

GamePanel.defaultProps = {
    className: '',
};

export default GamePanel;
