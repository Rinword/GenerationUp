const PF = require('pathfinding');

class Game {
    constructor(props) {
        this.app = props.app;

        this.isGameOver = false;
        this.isGamePause = false;

        // langDict.setLang(GAME_LANGUAGE);

        this.frameCap = 0; //отсчет тактов игры, помогает настроить частоту синхронизации данных с фронтом
        this.mapSize = {x: 40, y: 25}; //размер карты (не экрана)
        this.startColorNum = 0; //количество цветов ботов после инициализации (для масштабирования прогресс-баров)
        this.currentSelectObj = null; //текущий выбранный бот, инфа по которому будет динамически пробрасываться на фронт

        this.data = {
            map: this.generateMap({borders: true}),
        }

        this.get = this.get.bind(this);
    }

    get(prop) {
        return this.data[prop] || null;
    }

    generateMap(options) {
        let width = this.mapSize.x;
        let height = this.mapSize.y;

        const grid = [];
        const ways = new PF.Grid(width, height);

        for(let i = 0; i < width; i++) {
            grid.push([]);
            for(let j = 0; j < height; j++) {
                const cell = {
                    type: 'terrain',
                    inside: null,
                    loot: null,
                    sources: null,
                };

                grid[i].push(cell)
            }
        }

        // if(options.borders) {
        //     this.setWalls(ways, grid);
        // }

        return {ways, grid};
    }

    setWalls(ways, grid){
        let width = this.mapSize.x;
        let height = this.mapSize.y;

        for(let i = 0; i < width; i++) {
            //top
            ways[i][0].walkable = false;
            grid[i][0].type = 'border';
            //bottom
            ways[i][height - 1].walkable = false;
            grid[i][height - 1].type = 'border';
        }

        for(let j = 0; j < height; j++) {
            //left
            ways[0][j].walkable = false;
            grid[0][j].type = 'border';
            //right
            ways[width - 1][j].walkable = false;
            grid[width - 1][j].type = 'border';
        }

        ways[5].forEach( (cell, i)  => {
            if(i != 3) {
                cell.walkable = false;
                grid[5][i].type = 'wall';
            }
        });
    }
}

module.exports = Game;