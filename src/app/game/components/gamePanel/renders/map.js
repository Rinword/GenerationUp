import spriteResolver from '../spriteResolver';

export default class Renders {
    constructor(gameView, {cellSize = 40, mapSize = {x: 0, y: 0}, settings}) {
        this.stage = gameView.stage;
        this.cellSize = cellSize;
        this.mapSize = mapSize;
        this.settings = settings;

        this.updateSettings = newSettings => {
            this.settings = {...this.settings, ...newSettings}
        }

    }

    renderItem(item) {
        const cell_canvas = new createjs.Container();
        cell_canvas.set({x: item.position.x * this.cellSize, y: item.position.y * this.cellSize})

        const rect = new createjs.Shape();
        rect.graphics.beginFill(spriteResolver.getBgColor(item.texture))
            .drawRect(1, 1, this.cellSize, this.cellSize);
        cell_canvas.addChild(rect);

        if(this.settings.mapSettings.displayGridCoords) {
            const text = new createjs.Text(`${item.position.x},${item.position.y}`, "10px Arial", "#180401");
            text.name = 'coords';
            text.x = 2;
            text.y = this.cellSize - 2;
            text.textBaseline = "alphabetic";

            cell_canvas.addChild(text);
        }

        // const sprite = spriteResolver.getBitMap(cell.texture);
        // const texture = new createjs.Bitmap(sprite.source);
        // cell_canvas.addChild(texture);

        return cell_canvas;
    }

    renderCellBorders() {
        let mapCells = new createjs.Container();

        let xLines = this.mapSize.x;
        let yLines = this.mapSize.y;

        for(let i = 1; i < xLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(i * this.cellSize, 0, 1, yLines * this.cellSize);
            mapCells.addChild(rect);
        }

        for(let i = 1; i < yLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(0, i * this.cellSize, xLines * this.cellSize, 1);
            mapCells.addChild(rect);
        }

        return mapCells;
    }
}