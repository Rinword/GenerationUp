import spriteResolver from '../spriteResolver';

export default class Renders {
    constructor({cellSize = 40, mapSize = {x: 0, y: 0}}) {
        this.cellSize = cellSize;
        this.mapSize = mapSize;
    }

    renderItem(item) {
        const cell_canvas = new createjs.Container();
        cell_canvas.set({x: item.position.x * this.cellSize, y: item.position.y * this.cellSize})

        const rect = new createjs.Shape();
        rect.graphics.beginFill(spriteResolver.getBgColor(item.texture))
            .drawRect(1, 1, this.cellSize, this.cellSize);
        cell_canvas.addChild(rect);

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