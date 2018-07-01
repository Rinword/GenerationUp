import { randomInteger } from 'ui/helpers';
import get from 'lodash/get';

export default class UnitView {
    constructor(unitsLayer, unitData, {cellSize = 40, frameCup = 0, rangeObjectsLayer}) {
        this.unitsLayer = unitsLayer;
        this.cellSize = cellSize;
        this.frameCap = frameCup;
        this.rangeObjectsLayer = rangeObjectsLayer;

        this.historyLine = {};
        this.activities = {
            moving: null,
            attack: null,
            buff: null,
            deBuff: null,
            interface_take_damage: null,
        };
        this.state = {
            hp: 100,
            ep: 100,
            mp: 150,
            isSelected: false,
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
        this._updateUnitInterface = this._updateUnitInterface.bind(this);

        this.renderView(unitData);
    }

    renderView(unitData) {
        this.canvasObj = new createjs.Container();
        this.canvasObj.addEventListener("tick", this.tick);
        this.canvasObj.name = unitData.name;

        this.canvasObj.x = unitData.baseGeometry.curX * this.cellSize;
        this.canvasObj.y = unitData.baseGeometry.curY * this.cellSize;

        this.canvasObj.addChild(this.renderBody(unitData.color));
        this.canvasObj.addChild(this.renderUnitInterface(unitData, this.cellSize));

        this.unitsLayer.addChild(this.canvasObj);
    }

    renderUnitInterface ({name = 'Default', data = {}, hp = randomInteger(0, 100), movingData, baseGeometry, color, charData }, cellSize) {
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

        const viewRadius = new createjs.Shape();
        viewRadius.name = 'viewRadius';
        const radius = charData.stats.current.viewRadius || 2;
        viewRadius.graphics.beginStroke("#1d2860").setStrokeDash([5, 2], 0)
            .drawRect(-radius * cellSize + 1, -radius * cellSize + 1,  (2 * radius  + 1) * cellSize - 1,  (2 * radius  + 1) * cellSize - 1);


        const takeDamageContainer = new createjs.Container();
        takeDamageContainer.name = 'takeDamageContainer';

        //перенесено в castAnimate
        // const castState = new createjs.Container();
        // castState.name = 'castState';

        obj.addChild(text);
        obj.addChild(classNameLabel);
        obj.setChildIndex(classNameLabel, 0);
        obj.addChild(hpLabel);
        obj.addChild(viewRadius);
        obj.addChild(takeDamageContainer);
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
                case 'takeDamage':
                    this.addTakeDamage(action, this.frameCap);
                    break;
                default:
            }
        }

        this._updateUnitPosition();
        this._updateUnitInterface();
        // this._updateUnitState();
    }

    addMoving(action) {
        const { dx, dy } = this.calculateDelta(action);

        this.activities.moving = { dx, dy, destroyAfter: this.frameCap + action.duration };
    }

    addTakeDamage(action, frame) {
        const { realDamage, isCrit, iconName } = action.damage;
        console.log('GET', realDamage, isCrit, action);
        //анимация получаемого урона
        // const obj = this.canvasObj.getChildByName('bot_interface').getChildByName('takeDamageContainer');
        // let damageLabel = new createjs.Text('', "22px Arial", 'black');
        // damageLabel.name = 'unitDamage_' + frame;
        // damageLabel.x = 30;
        // damageLabel.y = 0;
        // damageLabel.textBaseline = "alphabetic";
        // damageLabel.textAlign = 'left';
        // damageLabel.text = ' -' + realDamage.toFixed(0) + (isCrit ? ' Крит!' : '');
        // obj.addChild(damageLabel);
        //
        // //иконка примененного скилла
        // let bitmap = new createjs.Bitmap('http://localhost:8080/images/' + iconName + '.jpg');
        // bitmap.alpha = 0.8;
        // damageLabel.x = 20;
        // damageLabel.y = 17;
        // let targetWidth = 20;
        // let targetHeight = 20;
        // bitmap.scaleX = targetWidth / bitmap.image.width;
        // bitmap.scaleY = targetHeight / bitmap.image.height;
        // obj.addChild(bitmap);

        // function damageUpper() {
        //     this.y -= 2;
        // }
        //
        // damageLabel.addEventListener("tick", damageUpper.bind(damageLabel));
        // bitmap.addEventListener("tick", damageUpper.bind(bitmap));
        //
        // setTimeout( function () {
        //     damageLabel.removeEventListener("tick", damageUpper);
        //     bitmap.removeEventListener("tick", damageUpper);
        //     obj.removeChild(damageLabel);
        //     obj.removeChild(bitmap);
        // }, 600)
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

    _updateUnitInterface() {
        const currStats = this.state.serverState.charData.stats.current;
        const unitHP = this.canvasObj.getChildByName('bot_interface').getChildByName('unitHP');
        unitHP.text = currStats.hp.toFixed(0);

        const viewRadius = this.canvasObj.getChildByName('bot_interface').getChildByName('viewRadius');
        viewRadius.visible = this.state.isSelected;
    }

    updateData(serverUnitData, frontFrame, backendFrame, selectedUnitName) {
        this.state.serverState = serverUnitData;
        this.state.isSelected = selectedUnitName === serverUnitData.name;
        const md = serverUnitData.movingData;
        const ed = serverUnitData.eventsData;

        if(md.direction && !this.historyLine[md.frame]) {
            this.historyLine[md.frame] = {
                type: 'moving',
                speed: md.speed,
                direction: md.direction,
                duration: +((60 / md.speed).toFixed(0)),
            }
        }

        if(!this.historyLine[backendFrame] && ed[backendFrame]) {
            this.historyLine[backendFrame] = ed[backendFrame];
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

    rangeAttacks(action) {
        let obj = this.rangeObjectsLayer;
        // this.canvasView.mainStage.setChildIndex( obj, this.canvasView.mainStage.getNumChildren()-1);

        let skillName = `${this.state.unitData.name} ${action.action.name}`;
        let speed = action.action.flySpeed || 0;
        // if(!obj.getChildByName(skillName) && speed) {
        //     let shape = new createjs.Shape();
        //     shape.name = skillName;
        //     let startPoint = {x: me.baseGeometry.curCell.x * cellSize + cellSize / 2, y: me.baseGeometry.curCell.y * cellSize + cellSize / 2};
        //     let endPoint = {x: action.target.baseGeometry.curCell.x * cellSize + cellSize / 2, y: action.target.baseGeometry.curCell.y * cellSize + cellSize / 2};
        //
        //     let fillObj = shape.graphics.beginFill('red').command;
        //     shape.graphics.drawCircle(startPoint.x, startPoint.y, 5);
        //     let xSpeed = speed * Math.cos( Math.atan2( (endPoint.y - startPoint.y), (endPoint.x - startPoint.x) ) ) / 60;
        //     let ySpeed = speed * Math.sin( Math.atan2( (endPoint.y - startPoint.y), (endPoint.x - startPoint.x) ) ) / 60;
        //
        //     let flyTime = Math.sqrt( Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2) ) / speed * 1000;
        //
        //     function damageUpper(event) {
        //         this.x += xSpeed;
        //         this.y += ySpeed;
        //     }
        //     obj.addChild(shape);
        //     shape.addEventListener("tick", damageUpper.bind(shape));
        //
        //     setTimeout( function () {
        //         shape.removeEventListener("tick", damageUpper);
        //         // console.log(shape.name, 'ended');
        //         obj.removeChild(shape);
        //     }, flyTime)
        // }
    }
}
