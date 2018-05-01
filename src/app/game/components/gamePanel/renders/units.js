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

    renderItem(inside) {
        const rObj = this.unitsLayer && this.unitsLayer.getChildByName(inside.name);
        if(rObj) {
            this._updateItem(inside, rObj);
            return rObj;
        }

        console.log('RENDER');

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

        if(this.settings.mapSettings.displayCurrentWays) {
            const { curX, curY } = baseGeometry;
            let wayRender = new createjs.Container();
            movingData.wayArr.forEach(cell => {
                let rect = new createjs.Shape();
                rect.graphics.beginFill(color).drawRect(
                    ((cell[1] - curX) * this.cellSize + this.cellSize / 2 - this.cellSize / 12),
                    ((cell[0] - curY)  * this.cellSize + this.cellSize / 2 - this.cellSize / 12),
                    this.cellSize / 6,
                    this.cellSize / 6);
                wayRender.addChild(rect);
            });
            obj.addChild(wayRender);
        }


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

    _updateItem(inside, obj) {
        const {dx, dy} = this.calculateDelta(inside);

        if(!obj) {
            obj = this.stage.getChildByName('Units_bots').getChildByName(inside.name);
        }

        // obj.removeEventListener("tick", animateMoving);
        function animateMoving() {
            this.x += dx;
            this.y += dy;
        }
        obj.removeAllEventListeners();

        const deltaX = obj.x - inside.baseGeometry.curX * this.cellSize;
        const deltaY = obj.y - inside.baseGeometry.curY * this.cellSize;
        // console.log(`(${deltaX}, ${deltaY})`);

        // if(deltaX >= this.cellSize || deltaY >= this.cellSize) {
            obj.x = inside.baseGeometry.curX * this.cellSize;
            obj.y = inside.baseGeometry.curY * this.cellSize;
        // }


        // obj.addEventListener("tick", animateMoving.bind(obj));

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
                dx = -viewVelocity;
                break;
            case 'left':
                dy = -viewVelocity;
                break;
            case 'bottom':
                dx = viewVelocity;
                break;
            case 'right':
                dy = viewVelocity;
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