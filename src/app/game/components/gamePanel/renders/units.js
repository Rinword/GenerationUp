export default class Renders {
    renderUnitInterface (name = 'Default', className = 'noClass', hp = 100, cellSize = 30) {
        let me = this;
        let obj = new createjs.Container();
        let shape = new createjs.Shape();
        shape.name = 'body';
        let fillObj = shape.graphics.beginFill(this.color).command;
        shape.graphics.drawCircle(obj.x, obj.y, me.baseGeometry.baseSize);

        //надпись
        let text = new createjs.Text(name, "16px Arial", "#180401");
        text.name = 'objLabel';
        text.x = obj.x;
        text.y = obj.y - 25;
        text.textBaseline = "alphabetic";
        text.textAlign = 'center';

        let className = new createjs.Text(className, "12px Arial", "#180401");
        className.name = 'objClass';
        className.x = obj.x;
        className.y = obj.y + 25;
        className.textBaseline = "alphabetic";
        className.textAlign = 'center';

        let hpLabel = new createjs.Text(hp.toFixed(0), "18px Arial", "#fff");
        hpLabel.name = 'unitHP';
        hpLabel.x = obj.x - 1;
        hpLabel.y = obj.y + 6;
        hpLabel.textBaseline = "alphabetic";
        hpLabel.textAlign = 'center';

        //перенесено в castAnimate
        let castState = new createjs.Container();
        castState.name = 'castState';

        this.canvasObj = obj;
        obj.addChild(shape);
        obj.fillObj = fillObj;
        obj.addChild(text);
        obj.addChild(className);
        obj.addChild(hpLabel);
        obj.addChild(castState);
        // obj.addChild(damageLabel);

        return obj;
    }
}