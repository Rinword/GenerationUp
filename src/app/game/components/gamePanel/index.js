import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Game from './GameView';

import spriteResolver from './spriteResolver';

import './styles.scss';

class GamePanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gameLoading: true
        };

        this.getCanvas = canvas => {
            if(!this.canvas) {
                this.canvas = canvas;
            }
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        axios( `api/game/default`).then((options) => {
            this.game = new Game(this.canvas, options.data);
            this.game.refresh();
        }).catch(err => {
            console.log('ERROR', err)
        })

    }

    render() {
        return (
            <div className={cx('game-panel', this.props.className)}>
                <div className="game-panel__sources">
                    {spriteResolver.getSources().map(i => <img key={i} src={i} alt="" />)}
                </div>
                <canvas className="game-panel__canvas" height='600' width='900' id='mainCanvas' ref={this.getCanvas} />
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
