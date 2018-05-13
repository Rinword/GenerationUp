import { randomInteger } from 'ui/helpers';
import get from 'lodash/get';

export default class Renders {
    constructor(gameView, {cellSize = 40, settings}) {
        this.stage = gameView.mainStage;
        this.unitsLayer = this.stage.getChildByName('Units_bots');
        this.cellSize = cellSize;
        this.settings = settings;

        this.updateSettings = newSettings => {
            this.settings = {...this.settings, ...newSettings}
        }

        this.renderItem = this.renderItem.bind(this);
        this.renderUnitInterface = this.renderUnitInterface.bind(this);
        this.calculateDelta = this.calculateDelta.bind(this);
        this.updateGameView = this.updateGameView.bind(this);
        this._updateItem = this._updateItem.bind(this);
    }

    renderItem(inside, frameCup) {
        const rObj = this.unitsLayer && this.unitsLayer.getChildByName(inside.name);
        if(rObj) {
            this._updateItem(inside, rObj, frameCup);
            return rObj;
        }

        const obj = new createjs.Container();
        obj.name = inside.name;

        obj.x = inside.baseGeometry.curX * this.cellSize;
        obj.y = inside.baseGeometry.curY * this.cellSize;

        switch(inside.type) {
            case 'unit':
                obj.addChild(this.renderUnit(inside.color))
                obj.addChild(this.renderUnitInterface(inside))
                break;

            default:
                console.warn('No renderer for', inside.type, 'check it!')
        }

        return obj;
    }

    renderUnitInterface ({name = 'Default', data = {}, hp = randomInteger(0, 100), movingData, baseGeometry, color}) {
        const obj = new createjs.Container();
        obj.name = 'bot_interface';
        //надпись
        const text = new createjs.Text(name, "16px Arial", "#180401");
        text.name = 'objLabel';
        text.x = obj.x + this.cellSize / 2;
        text.y = obj.y - 20;
        text.textBaseline = "alphabetic";
        text.textAlign = 'center';

        const classNameLabel = new createjs.Text(data.className, "12px Arial", "#180401");
        classNameLabel.name = 'objClass';
        classNameLabel.x = obj.x + this.cellSize / 2;
        classNameLabel.y = obj.y - 5;
        classNameLabel.textBaseline = "alphabetic";
        classNameLabel.textAlign = 'center';

        const hpLabel = new createjs.Text(hp.toFixed(0), "18px Arial", "#fff");
        hpLabel.name = 'unitHP';
        hpLabel.x = obj.x + this.cellSize / 2;
        hpLabel.y = obj.y + this.cellSize / 2 + 6;
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

    renderUnit(color) {
        const shape = new createjs.Shape();
        shape.name = 'body';
        let fillObj = shape.graphics.beginFill(color).command;
        const radius = this.cellSize / 2;
        shape.graphics.drawCircle(radius, radius, radius);

        return shape;
    }

    updateGameView(gameView) {
        this.stage = gameView.mainStage;
    }

    _updateItem(inside, frameCup) {
        const calculateDelta = this.calculateDelta;
        const cellSize = this.cellSize;
        let {dx, dy} = calculateDelta(inside);

        let viewFrame = frameCup;

        const obj = this.stage.getChildByName('Units_bots').getChildByName(inside.name);

        const ticksPerCell = +((60 / inside.movingData.speed).toFixed(0));

        function animateMoving() {
            this.currTime++;
            viewFrame++;

            if(this.currTime < ticksPerCell) {
                this.x += dx;
                this.y += dy;
            } else {
                this.removeAllEventListeners();
            }

            if(this.currTime % ticksPerCell === 0) {
                this.x = inside.baseGeometry.curX * cellSize;
                this.y = inside.baseGeometry.curY * cellSize;
            }

        }

        obj.removeAllEventListeners();

        if(inside.movingData.currTimeLength % ticksPerCell === 0) {
            obj.x = inside.baseGeometry.curX * this.cellSize;
            obj.y = inside.baseGeometry.curY * this.cellSize;
        }

        obj.currTime = inside.movingData.currTimeLength;

        obj.addEventListener("tick", animateMoving.bind(obj));

        switch(inside.type) {
            case 'unit':
                this._updateUnit(inside.color, obj)
                this._updateUnitInterface(inside, obj)
                break;

            default:
                console.warn('No update for', inside.type, 'check it!')
        }
    }

    calculateDelta(inside) {
        const viewVelocity = inside.movingData.speed * this.cellSize / 60;
        let dx = 0;
        let dy = 0;
        switch (inside.movingData.direction) {
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

    _updateUnit(color, obj) {
        // console.log(obj.getChildByName('body'))
    }

    _updateUnitInterface(inside, obj) {
        const unitHP = obj.getChildByName('bot_interface').getChildByName('unitHP');
        unitHP.text = 10;
    }
}