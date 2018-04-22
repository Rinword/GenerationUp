import UnitRenderer from './renders/units';
import MapRenderer from './renders/map';

const CELL_SIZE = 40;
const RENDER_CELL_GRID_MAP = true; //отображать клетки карты
const HIGHLIGHT_NO_WALKABLE_CELLS = false; //подсветка текущих занятых клеток
const VIEWS_REFRESH_STEP = 30; //частота обновления информации во вьюхах (1 раз в 30 тиков или раз в 0,5сек)

export default class Game {
    constructor(context, config, updateData){
        // console.log(config);
        this.mainStage = new createjs.Stage(context);
        this.mainStage.children.length = 0;
        // input.init(); //регистрация событий клавиатуры
        this.isGameOver = false;
        this.isGamePause = false;
        this.mapGridCellSize = CELL_SIZE;

        this.data = {
            map: config.map,
            mapSize: {x: config.map.ways.height, y: config.map.ways.width}
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

        // this.mapWayGrid = this.generatePathFindingGrid(this.mapSize.x, this.mapSize.y , this.mapGridCellSize); //массив с клетками для поиска путей
        //нужно обновлять его при смене позиции каждым объектом, считаемым препятсвием, а также перепрокладывать марштуты, шедшие через эти точки

        // this.wayRender = new createjs.Container();
        // this.wayRender.name = 'Way';
        // this.mainStage.addChild(this.wayRender);
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
        // const units = this.renders.units.renderItem();
        // units.name = 'Units_bots';
        // this.mainStage.addChild(units);
        // this.mainStage.setChildIndex(units, 0);
    }

    refresh() {
        //по хорошему здесь получать все данные из объекта игры, и вносить изменения перед update
        this.mainStage.update();
    }

    setGame(game) {
        this.game = game;
    }
}
