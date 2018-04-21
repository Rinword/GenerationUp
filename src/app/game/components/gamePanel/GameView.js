import spriteResolver from './spriteResolver';
import set from 'lodash/set';
const CELL_SIZE = 40;
const BOT_ENUM = 20;
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
            mapSize: {x: config.map.ways.width, y: config.map.ways.height}
        }

        //создание по размеру карты и размеру клетки общего объекта карты, в котором будут храниться положения объектов и ссылки на них
        this.renderMap();

        //создание гридовой карты, пока что все поля доступны
        //визуальная отрисовка сетки для контроля
        if(RENDER_CELL_GRID_MAP) this.renderCellBorders();
        // this.mapWayGrid = this.generatePathFindingGrid(this.mapSize.x, this.mapSize.y , this.mapGridCellSize); //массив с клетками для поиска путей
        //нужно обновлять его при смене позиции каждым объектом, считаемым препятсвием, а также перепрокладывать марштуты, шедшие через эти точки

        // this.wayRender = new createjs.Container();
        // this.wayRender.name = 'Way';
        // this.mainStage.addChild(this.wayRender);
    }

    renderMap() {
       const map_canvas = new createjs.Container();
       const map = this.data.map.grid;
       // console.log(map);
       map.forEach(row => {
           row.forEach(cell => {
               const cell_canvas = this.renderCell(this.mapGridCellSize, cell);
               map_canvas.addChild(cell_canvas);
           })
       });

       this.mainStage.addChild(map_canvas);
       this.mainStage.setChildIndex(map_canvas, 0);
    }

    renderCell(cellBasis, cell) {
        const cell_canvas = new createjs.Container();
        cell_canvas.set({x: cell.position.x * cellBasis, y: cell.position.y * cellBasis})

        const rect = new createjs.Shape();
        rect.graphics.beginFill(spriteResolver.getBgColor(cell.texture))
            .drawRect(1, 1, cellBasis, cellBasis);
        cell_canvas.addChild(rect);
        // const sprite = spriteResolver.getBitMap(cell.texture);
        // const texture = new createjs.Bitmap(sprite.source);
        // cell_canvas.addChild(texture);

        return cell_canvas;
    }

    renderCellBorders() {
        const cellBasis = this.mapGridCellSize;
        let mapCells = new createjs.Container();

        let xLines = this.data.mapSize.x;
        let yLines = this.data.mapSize.y;

        for(let i = 1; i < xLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(0, i * cellBasis, yLines * this.mapGridCellSize, 1);
            mapCells.addChild(rect);
        }

        for(let i = 1; i < yLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(i * cellBasis, 0, 1, xLines * this.mapGridCellSize);
            mapCells.addChild(rect);
        }

        this.mainStage.addChild(mapCells);
        // this.mainStage.setChildIndex( mapCells, 0);
    }

    refresh() {
        //по хорошему здесь получать все данные из объекта игры, и вносить изменения перед update
        this.mainStage.update();
    }

    setGame(game) {
        this.game = game;
    }
}
