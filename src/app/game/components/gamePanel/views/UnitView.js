import { randomInteger } from 'ui/helpers';
import get from 'lodash/get';

export default class UnitView {
    constructor(unitsLayer, unitData, {cellSize = 40, frameCup = 0}) {
        this.unitsLayer = unitsLayer;
        this.cellSize = cellSize;
        this.frameCap = frameCup;

        this.historyLine = {};
        this.activities = {
            moving: null,
            attack: null,
            buff: null,
            deBuff: null,
        };
        this.state = {
            hp: 100,
            ep: 100,
            mp: 150,
            serverState: unitData,
        }

        this.renderView = this.renderView.bind(this);
        this.renderUnitInterface = this.renderUnitInterface.bind(this);
        this.calculateDelta = this.calculateDelta.bind(this);
        this.updateView = this.updateView.bind(this);
        this.updateData = this.updateData.bind(this);
        this.tick = this.tick.bind(this);
        this.addMoving = this.addMoving.bind(this);
        this._updateUnitPosition = this._updateUnitPosition.bind(this);

        this.renderView(unitData);
    }

    renderView(unitData) {
        // const rObj = this.unitsLayer && this.unitsLayer.getChildByName(unitData.name);
        // if(rObj) {
        //     this._updateItem(unitData, rObj);
        //     return rObj;
        // }

        this.canvasObj = new createjs.Container();
        this.canvasObj.addEventListener("tick", this.tick);
        this.canvasObj.name = unitData.name;

        this.canvasObj.x = unitData.baseGeometry.curX * this.cellSize;
        this.canvasObj.y = unitData.baseGeometry.curY * this.cellSize;

        this.canvasObj.addChild(this.renderBody(unitData.color));
        this.canvasObj.addChild(this.renderUnitInterface(unitData, this.cellSize));

        this.unitsLayer.addChild(this.canvasObj);
    }

    renderUnitInterface ({name = 'Default', data = {}, hp = randomInteger(0, 100), movingData, baseGeometry, color }, cellSize) {
        const obj = new createjs.Container();
        obj.name = 'bot_interface';
        //надпись
        const text = new createjs.Text(name, "16px Arial", "#180401");
        text.name = 'objLabel';
        text.x = obj.x + cellSize / 2;
        text.y = obj.y - 20;
        text.textBaseline = "alphabetic";
        text.textAlign = 'center';

        const classNameLabel = new createjs.Text(data.className, "12px Arial", "#180401");
        classNameLabel.name = 'objClass';
        classNameLabel.x = obj.x + cellSize / 2;
        classNameLabel.y = obj.y - 5;
        classNameLabel.textBaseline = "alphabetic";
        classNameLabel.textAlign = 'center';

        const hpLabel = new createjs.Text(hp.toFixed(0), "18px Arial", "#fff");
        hpLabel.name = 'unitHP';
        hpLabel.x = obj.x + cellSize / 2;
        hpLabel.y = obj.y + cellSize / 2 + 6;
        hpLabel.textBaseline = "alphabetic";
        hpLabel.textAlign = 'center';

        //перенесено в castAnimate
        // const castState = new createjs.Container();
        // castState.name = 'castState';

        obj.addChild(text);
        obj.addChild(classNameLabel);
        obj.setChildIndex(classNameLabel, 0);
        obj.addChild(hpLabel);
        // obj.addChild(castState);
        // obj.addChild(damageLabel);

        return obj;
    }

    renderBody(color) {
        const shape = new createjs.Shape();
        shape.name = 'body';
        let fillObj = shape.graphics.beginFill(color).command;
        const radius = this.cellSize / 2;
        shape.graphics.drawCircle(radius, radius, radius);

        return shape;
    }

    // updateGameView(gameView) {
    //     this.stage = gameView.mainStage;
    // }

    tick() {

    }

    updateView() {
        this.frameCap++;
        const action = this.historyLine[this.frameCap];

        if(action) {
            switch (action.type) {
                case 'moving':
                    this.addMoving(action);
                    break;
                case 'cast':
                    // this.actions.addCast(action);
                    break;
                default:
            }
        }

        this._updateUnitPosition();
        // this._updateUnitState();
        // this._updateUnitInterface();
    }

    addMoving(action) {
        const { dx, dy } = this.calculateDelta(action);

        this.activities.moving = { dx, dy, destroyAfter: this.frameCap + action.duration };
    }

    _updateUnitPosition() {
        const moveAction = this.activities.moving;
        if(!moveAction) return;
        if(moveAction.destroyAfter && moveAction.destroyAfter === this.frameCap) {
            this.activities.moving = null;
            this.canvasObj.x = this.state.serverState.baseGeometry.curX * this.cellSize;
            this.canvasObj.y = this.state.serverState.baseGeometry.curY * this.cellSize;
            return;
        }

        this.canvasObj.x += moveAction.dx;
        this.canvasObj.y += moveAction.dy;
    }

    updateData(serverUnitData, frontFrame, backendFrame) {
        this.state.serverState = serverUnitData;
        const md = serverUnitData.movingData;

        if(md.direction && !this.historyLine[md.frame]) {
            this.historyLine[md.frame] = {
                type: 'moving',
                speed: md.speed,
                direction: md.direction,
                duration: +((60 / md.speed).toFixed(0)),
            }
        }

        // console.log(this.historyLine, this.frameCap, frontFrame, backendFrame);
    }

    calculateDelta(action) {
        const viewVelocity = action.speed * this.cellSize / 60;
        let dx = 0;
        let dy = 0;
        switch (action.direction) {
            case 'top':
                dy = -viewVelocity;
                break;
            case 'left':
                dx = -viewVelocity;
                break;
            case 'bottom':
                dy = viewVelocity;
                break;
            case 'right':
                dx = viewVelocity;
                break;
        }

        return {dx, dy}
    }

    // _updateUnitInterface(inside, obj) {
    //     const unitHP = obj.getChildByName('bot_interface').getChildByName('unitHP');
    //     unitHP.text = 10;
    // }
}