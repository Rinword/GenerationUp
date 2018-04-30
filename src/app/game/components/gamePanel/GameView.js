import UnitRenderer from './renders/units';
import MapRenderer from './renders/map';

const CELL_SIZE = 40;
const RENDER_CELL_GRID_MAP = true; //отображать клетки карты
const HIGHLIGHT_NO_WALKABLE_CELLS = false; //подсветка текущих занятых клеток
const VIEWS_REFRESH_STEP = 30; //частота обновления информации во вьюхах (1 раз в 30 тиков или раз в 0,5сек)

createjs.Ticker.setFPS(60);

export default class Game {
    constructor(context, config, socket){
        // console.log(config);
        this.mainStage = new createjs.Stage(context);
        this.mainStage.children.length = 0;
        this.socket = socket;
        // input.init(); //регистрация событий клавиатуры
        this.isGameOver = false;
        this.isGamePause = false;
        this.mapGridCellSize = CELL_SIZE;

        this.data = {
            ...config.data,
            mapSize: {x: config.data.map.ways.height, y: config.data.map.ways.width}
        }

        this.renders = {
            map: new MapRenderer({cellSize: CELL_SIZE, mapSize: this.data.mapSize}),
            unit: new UnitRenderer({cellSize: CELL_SIZE}),
        }

        //рендер карты. Объекты в ссылках (например юниты) не рендерятся.
        this.renderMap();

        //визуальная отрисовка сетки для контроля
        if(RENDER_CELL_GRID_MAP) this.renderCellBorders();

        //рендер динамических структур. Здесь это боты
        this.renderUnits();

        this.regSockets();

        this.mainStage.on('stagemousedown',  evt => {
            const {x, y} = this.getGridCellByCoords(evt.rawX, evt.rawY);
            this.socket.emit('game_click-on-stage', { action: 'moveTo', params: {x, y} })
        });

        // this.mapWayGrid = this.generatePathFindingGrid(this.mapSize.x, this.mapSize.y , this.mapGridCellSize); //массив с клетками для поиска путей
        //нужно обновлять его при смене позиции каждым объектом, считаемым препятсвием, а также перепрокладывать марштуты, шедшие через эти точки

        // this.wayRender = new createjs.Container();
        // this.wayRender.name = 'Way';
        // this.mainStage.addChild(this.wayRender);
    }

    regSockets() {
        this.socket.on('update_units', data => {
            this.data.units = data.units;
            this.mainStage.removeChild(this.mainStage.getChildByName('Units_bots')); //TODO need update, not remove
            this.renderUnits();
            this.refresh();
        })
    }

    renderMap() {
       const map_canvas = new createjs.Container();
       map_canvas.name = 'Map';
       const map = this.data.map.grid;

       map.forEach(row => {
           row.forEach(cell => {
               const cell_canvas = this.renders.map.renderItem(cell);
               map_canvas.addChild(cell_canvas);
           })
       });

       this.mainStage.addChild(map_canvas);
    }

    renderCellBorders() {
        const borders = this.renders.map.renderCellBorders();
        borders.name = 'MapCellsBorders';
        this.mainStage.addChild(borders);
    }

    renderUnits() {
        const units_bots_canvas = new createjs.Container();
        units_bots_canvas.name = 'Units_bots';
        const units = this.data.units;
        units.forEach(unit => {
            units_bots_canvas.addChild(this.renders.unit.renderItem(unit));
        })

        this.mainStage.addChild(units_bots_canvas);
    }

    getGridCellByCoords(x, y) {
        return {x: +((Math.floor(x / CELL_SIZE)).toFixed(0)), y:+(Math.floor(y / CELL_SIZE).toFixed(0))};
    }

    refresh() {
        this.mainStage.update();
    }
}
