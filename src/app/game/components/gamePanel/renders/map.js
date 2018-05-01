import spriteResolver from '../spriteResolver';

export default class Renders {
    constructor(gameView, {cellSize = 40, mapSize = {x: 0, y: 0}, settings}) {
        this.stage = gameView.mainStage;
        this.cellSize = cellSize;
        this.mapSize = mapSize;
        this.settings = settings;

        this.updateSettings = newSettings => {
            this.settings = {...this.settings, ...newSettings}
        }

        this.renderWays = this.renderWays.bind(this);

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

    renderCellsCoords() {
        let coords = new createjs.Container();

        let xLines = this.mapSize.x;
        let yLines = this.mapSize.y;

        for(let i = 0; i < xLines; i++) {
            for(let j = 0; j < yLines; j++) {
                const text = new createjs.Text(`${i},${j}`, "10px Arial", "#180401");
                text.x = this.cellSize * i + 2;
                text.y = this.cellSize * j - 2;
                text.textBaseline = "alphabetic";

                coords.addChild(text);
            }
        }

        return coords;
    }

    renderWays(units) {
        const ways = this.stage.getChildByName('Units_ways');
        ways.removeAllChildren();
        units.forEach( unit => {
            const wayArr = unit.movingData.wayArr;
            const color = unit.color || 'black';
            if(wayArr.length) {
                wayArr.forEach(cell => {
                    let rect = new createjs.Shape();
                    rect.graphics.beginFill(color).drawRect(
                        ((cell[1]) * this.cellSize + this.cellSize / 2 - this.cellSize / 12),
                        ((cell[0])  * this.cellSize + this.cellSize / 2 - this.cellSize / 12),
                        this.cellSize / 6,
                        this.cellSize / 6);
                    ways.addChild(rect);
                });
            }
        });
    }
}