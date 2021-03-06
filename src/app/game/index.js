import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column, Btn } from 'ui/UxBox';

import GamePanel from './components/gamePanel';
import RightPanel from './components/rightPanel';
import BottomPanel from './components/bottomPanel';

import './styles.scss';

class Game extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            mapSettings: {}
        };

        this.onMapSettinsChange = this.onMapSettinsChange.bind(this);
    }

    onMapSettinsChange(setting) {
        this.setState({mapSettings: {...this.state.mapSettings, ...setting }})
    }

    render() {
        return (
            <Column className={cx('game', this.props.className)}>
                <Row className="game__main-panel" ai="stretch">
                    <GamePanel settings={this.state} />
                    <RightPanel onMapSettinsChange={this.onMapSettinsChange}/>
                </Row>
                <Row className="game__bottom-panel">
                    <BottomPanel />
                </Row>
            </Column>
        );
    }
}

Game.propTypes = {
    className: PropTypes.string,
};

Game.defaultProps = {
    className: '',
};

export default Game;
