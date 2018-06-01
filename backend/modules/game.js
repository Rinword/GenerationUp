const PF = require('pathfinding');
const helpers = require('./helpers');

const BotUnit = require('./objects/units/BotUnit');

const BOT_ENUM = 1;
const SYNC_EVERY_FRAME = 15;
const FPS = 60;

class Game {
    constructor(props) {
        this.app = props.app;
        this.socket = props.socket;
        this.registerSockets()

        this.isGameOver = false;
        this.isGamePause = false;

        this.frameCap = 0; //отсчет тактов игры, помогает настроить частоту синхронизации данных с фронтом
        this.mapSize = {x: 23, y: 15}; //размер карты (не экрана)

        this.data = {
            map: this.generateMap({borders: true}),
        }

        this.data.units = this.generateBots(BOT_ENUM);

        this.getData = this.getData.bind(this);
        this.generateMap = this.generateMap.bind(this);
        this.generateBots = this.generateBots.bind(this);
        this.main = this.main.bind(this);
        this.update = this.update.bind(this);
        this.updateUnits = this.updateUnits.bind(this);
        this.registerSockets = this.registerSockets.bind(this);

        this.main();
    }

    getData() {
        return this.data || null;
    }

    main() {
        this.frameCap++;
        this.update(); //обновление логики
        if(this.frameCap % SYNC_EVERY_FRAME === 0) {
            // console.log('--updateFront, frame', this.frameCap);
            this.socket.emit('update_units', {cap: this.frameCap, units: this.data.units, map: this.data.map})
            this.socket.emit('update_selected_unit', {data: this.data.units[0]})
        }

        if(!(this.isGameOver || this.isGamePause)) {
            setTimeout(this.main, 1000 / FPS);
        }
    }

    update() {
        if(this.frameCap === 300 && !this.isGamePause) {
            this.isGamePause = true;
        }

        this.updateUnits();
    }

    updateUnits() {
        this.data.units.forEach(unit => {
            unit.update(this.frameCap);
        })
    }

    registerSockets() {
        this.socket.on('game_control', data => {
            switch (data.action) {
                case 'pause':
                    if(this.isGamePause) {
                        this.isGamePause = false;
                        this.frameCap++;
                        this.main();
                    } else {
                        this.isGamePause = true;
                    }
                    break;
                case 'start_again':
                    this.frameCap = 0;
                    this.data.units = this.generateBots(BOT_ENUM);
                    this.isGameOver = false;
                    this.main();
            }
        })

        this.socket.on('game_click-on-stage', data => {
            switch (data.action) {
                case 'moveTo':
                    this.data.units.forEach(unit => {
                        unit.moveTo(data.params.x, data.params.y)
                    })
            }
        })
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
        while(bots.length < num) {
            const name = 'bot' + bots.length;
            const x = helpers.randomInteger(1, map.ways.height - 1);
            const y = helpers.randomInteger(1, map.ways.width - 1);

            if(map.ways.nodes[x][y].walkable) {
                const bot = new BotUnit(name, x, y, map.ways);
                bots.push(bot);
                map.grid[x][y].inside = bot;
                map.ways.nodes[x][y].walkable = false;
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

        // ways.nodes[5].forEach( (cell, i)  => {
        //     if(i != 3) {
        //         ways.nodes[i][5].walkable = false;
        //         grid[i][5].texture = 'wall1';
        //         // grid[i][5].icon = 'wall';
        //     }
        // });
    }
}

module.exports = Game;