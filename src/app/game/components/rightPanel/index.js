import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Btn, Row, Column } from 'ui/UxBox';

import socket from 'app/io';

import './styles.scss';

class RightPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cap: 0,
        };

        this.onMapSettingsChange = this.onMapSettingsChange.bind(this);
        this.onControlClick = this.onControlClick.bind(this);
        this.onLeftClickSelect = this.onLeftClickSelect.bind(this);
    }

    onControlClick(event) {
        const action = event.target.dataset.control;
        socket.getSocket().emit('game_control', { action, params: {} })
    }

    onMapSettingsChange(event) {
        const param = event.target.attributes.id.value;
        const value = event.target.checked;
        this.props.onMapSettinsChange({[param]: !value});
    }

    onLeftClickSelect(event) {
        socket.getSocket().emit('game_control', { action: `left_click_${event.target.value}` });
    }

    componentDidMount() {
        socket.getSocket().on('update_units', data => {
            this.setState({cap: data.cap})
        })
    }

    render() {
        return (
            <div className={cx('right-panel', this.props.className)}>
                <div>Frame: {this.state.cap}</div>
                <Column margin="10px">
                    <Row>
                        <Btn data-control="pause" onClick={this.onControlClick}>Пауза</Btn>
                        <Btn data-control="start_again" onClick={this.onControlClick}>Начать заново</Btn>
                    </Row>

                    <Column padding="20px 0 0">
                        <Row><b>Настройки карты:</b></Row>
                        <Row margin="5px 0 5px">
                            <input type="checkbox" id="displayGridCells" onChange={this.onMapSettingsChange} />
                            <label htmlFor="displayGridCells">Скрыть разметку</label>
                        </Row>
                        <Row margin="5px 0">
                            <input type="checkbox" id="displayGridCoords" onChange={this.onMapSettingsChange} />
                            <label htmlFor="displayGridCoords">Скрыть координаты клеток</label>
                        </Row>
                        <Row margin="5px 0">
                            <input type="checkbox" id="displayNoWalkable" onChange={this.onMapSettingsChange} />
                            <label htmlFor="displayNoWalkable">Скрыть недоступные клетки</label>
                        </Row>
                        <Row margin="5px 0">
                            <input type="checkbox" id="displayCurrentWays" onChange={this.onMapSettingsChange} />
                            <label htmlFor="displayCurrentWays">Скрыть маршруты ботов</label>
                        </Row>
                    </Column>
                    <Column padding="10px 0">
                        <Row><b>Действие левой кнопки мыши:</b></Row>
                        <Row>
                            <form onChange={this.onLeftClickSelect}>
                                <Row padding="5px 0 0 0">
                                    <input name="leftClickAction" type="radio" id="moveTo" value="moveTo"/>
                                    <label htmlFor="moveTo">moveTo</label>
                                </Row>
                                <Row padding="5px 0 0 0">
                                    <input name="leftClickAction" type="radio" id="selectUnit" value="selectUnit"/>
                                    <label htmlFor="selectUnit">selectUnit</label>
                                </Row>
                            </form>
                        </Row>
                    </Column>
                </Column>
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
