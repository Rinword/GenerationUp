const PF = require('pathfinding');
const BOT_ENUM = 5;

const helpers = require('./helpers');

const BotUnit = require('./objects/units/BotUnit');

class Game {
    constructor(props) {
        this.app = props.app;

        this.isGameOver = false;
        this.isGamePause = false;

        // langDict.setLang(GAME_LANGUAGE);

        this.frameCap = 0; //отсчет тактов игры, помогает настроить частоту синхронизации данных с фронтом
        this.mapSize = {x: 23, y: 15}; //размер карты (не экрана)
        this.startColorNum = 0; //количество цветов ботов после инициализации (для масштабирования прогресс-баров)
        this.currentSelectObj = null; //текущий выбранный бот, инфа по которому будет динамически пробрасываться на фронт

        this.data = {
            map: this.generateMap({borders: true}),
        }

        this.data.units = this.generateBots(BOT_ENUM);

        this.getData = this.getData.bind(this);
        this.generateMap = this.generateMap.bind(this);
        this.generateBots = this.generateBots.bind(this);
    }

    getData() {
        return this.data || null;
    }

    generateMap(options) {
        let width = this.mapSize.x;
        let height = this.mapSize.y;

        const grid = [];
        const ways = new PF.Grid(height, width);

        for(let i = 0; i < width; i++) {
            grid.push([]);
            for(let j = 0; j < height; j++) {
                const cell = {
                    position: {x: i, y: j},
                    texture: 'grass1',
                    bitmaps: [],
                    inside: null,
                    loot: null,
                    sources: null,
                };

                grid[i].push(cell)
            }
        }

        if(options.borders) {
            this.setWalls(ways, grid);
        }

        return {ways, grid};
    }

    generateBots(num) {
        const bots = [];
        const map = this.data.map;
        while(bots.length < num) { //TODO все равно часть ботов некорректно рендерится в углу, причина пока неизвестна
            const name = 'bot' + bots.length;
            const x = helpers.randomInteger(1, map.ways.height - 1);
            const y = helpers.randomInteger(1, map.ways.width - 1);
            if(map.ways.nodes[x][y].walkable) {
                if(!map.grid[x][y].inside) {
                    const bot = new BotUnit(name, x, y);
                    bots.push(bot);
                    map.grid[x][y].inside = bot;
                    map.ways.nodes[x][y].walkable = false;
                }
            }
        }

        return bots;
    }

    setWalls(ways, grid){
        let width = this.mapSize.x;
        let height = this.mapSize.y;

        for(let i = 0; i < width; i++) {
            //top
            ways.nodes[i][0].walkable = false;
            grid[i][0].texture = 'wall1';
            // grid[i][0].icons = 'wall';
            //bottom
            ways.nodes[i][height - 1].walkable = false;
            grid[i][height - 1].texture = 'wall1';
            // grid[i][height - 1].icons = 'wall';
        }

        for(let j = 0; j < height; j++) {
            //left
            ways.nodes[0][j].walkable = false;
            grid[0][j].texture = 'wall1';
            // grid[0][j].icon = 'wall';
            //right
            ways.nodes[width - 1][j].walkable = false;
            grid[width - 1][j].texture = 'wall1';
            // grid[width - 1][j].icon = 'wall';
        }

        ways.nodes[5].forEach( (cell, i)  => {
            if(i != 3) {
                cell.walkable = false;
                grid[i][5].texture = 'wall1';
                // grid[i][5].icon = 'wall';
            }
        });
    }
}

module.exports = Game;