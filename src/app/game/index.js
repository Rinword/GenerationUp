import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column, Btn } from 'ui/UxBox';

import './styles.scss';

class Game extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('game', this.props.className)}>
                <div />
            </div>
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
