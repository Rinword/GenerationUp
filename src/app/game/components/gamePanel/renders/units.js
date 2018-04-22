import { randomInteger } from 'ui/helpers'

export default class Renders {
    constructor({cellSize = 40}) {
        this.cellSize = cellSize;
    }

    renderItem(inside) {
        const obj = new createjs.Container();
        switch(inside.type) {
            case 'unit':
                obj.addChild(this.renderUnit(inside.baseGeometry.curX, inside.baseGeometry.curY, inside.color))
                obj.addChild(this.renderUnitInterface(inside.name, inside.data.className, randomInteger(1, 100)))
                break;

            default:
                console.warn('No renderer for', inside.type, 'check it!')
        }

        return obj;
    }

    renderUnitInterface (name = 'Default', className = 'noClass', hp = 100) {
        const obj = new createjs.Container();
        //надпись
        const text = new createjs.Text(name, "16px Arial", "#180401");
        text.name = 'objLabel';
        text.x = obj.x + this.cellSize / 2;
        text.y = obj.y - 20;
        text.textBaseline = "alphabetic";
        text.textAlign = 'center';

        const classNameLabel = new createjs.Text(className, "12px Arial", "#180401");
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

    renderUnit(x, y, color) {
        const shape = new createjs.Shape();
        shape.name = 'body';
        let fillObj = shape.graphics.beginFill(color).command;
        const radius = this.cellSize / 2;
        shape.graphics.drawCircle(radius, radius, radius);

        return shape;
    }
}