import PF from 'pathfinding';

const CELL_SIZE = 30;
const BOT_ENUM = 20;
const RENDER_CELL_GRID_MAP = true; //отображать клетки карты
const HIGHLIGHT_NO_WALKABLE_CELLS = false; //подсветка текущих занятых клеток
const BACKBONE_VIEWS_REFRESH_TICK = 30; //частота обновления информации во вьюхах (1 раз в 30 тиков или раз в 0,5сек)
const GAME_LANGUAGE = 'ru'; //язык формируемых сервером данных для отображения на фронте

export default class Game {
    constructor(context, config, updateData){
        console.log(config);
        this.mainStage = new createjs.Stage(context);
        // let mapCells = new createjs.Container();
        this.mainStage.children.length = 0;
        // input.init(); //регистрация событий клавиатуры
        // this.lastTime = Date.now(); //регистрирует начальный момент игры, чтобы потом узнать за сколько закончился раунд
        // this.gameTime = Date.now();
        this.isGameOver = false;
        this.isGamePause = false;

        // langDict.setLang(GAME_LANGUAGE);

        this.frameCap = 0; //отсчет тактов игры, помогает настроить частоту синхронизации данных с фронтом
        this.mapSize = {x: 0, y: 0}; //размер карты (не экрана)
        this.startColorNum = 0; //количество цветов ботов после инициализации (для масштабирования прогресс-баров)
        this.currentSelectObj = null; //текущий выбранный бот, инфа по которому будет динамически пробрасываться на фронт
        this.mapSize.x = this.mainStage.canvas.clientWidth;
        this.mapSize.y = this.mainStage.canvas.clientHeight;

        //создание гридовой карты, пока что все поля доступны
        //визуальная отрисовка сетки для контроля
        this.mapGridCellSize = CELL_SIZE;
        if(RENDER_CELL_GRID_MAP) this.renderCellGrid(this.mapGridCellSize);
        // this.mapWayGrid = this.generatePathFindingGrid(this.mapSize.x, this.mapSize.y , this.mapGridCellSize); //массив с клетками для поиска путей
        //нужно обновлять его при смене позиции каждым объектом, считаемым препятсвием, а также перепрокладывать марштуты, шедшие через эти точки
        this.mapWayGrid = this.generatePathFindingGrid(this.mapSize.x, this.mapSize.y, this.mapGridCellSize); //массив с клетками для поиска путей
        //крайние поля сделать недоступными
        this.setWalls();

        //создание по размеру карты и размеру клетки общего объекта карты, в котором будут храниться положения объектов и ссылки на них
        this.mapGrid = this.generateMapGrid(this.mapWayGrid);


        this.wayRender = new createjs.Container();
        this.wayRender.name = 'Way';
        this.mainStage.addChild(this.wayRender);
    }

    renderCellGrid(cellBasis) {
        let mapCells = new createjs.Container();

        let xLines = Math.floor(this.mapSize.y / cellBasis);
        let yLines = Math.floor(this.mapSize.x / cellBasis);

        for( let i = 1; i < xLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(0, i * cellBasis, this.mapSize.x, 1);
            mapCells.addChild(rect);
        }

        for( let i = 1; i < yLines; i++) {
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#cecece").drawRect(i * cellBasis, 0, 1, this.mapSize.y);
            mapCells.addChild(rect);
        }

        this.mainStage.addChild(mapCells);
        this.mainStage.setChildIndex( mapCells, 0);
    }

    generateMapGrid(wayGrid) {
        let width = wayGrid.width;
        let height = wayGrid.height;
        let mapGrid = [];

        for(let i = 0; i < width; i++) {
            mapGrid.push([]);
            for(let j = 0; j < height; j++) {
                mapGrid[i].push(null)
            }
        }

        return mapGrid;
    }

    setWalls(){
        let me = this;
        let wayGrid = this.mapWayGrid.nodes;
        let width = this.mapWayGrid.width;
        let height = this.mapWayGrid.height;
        let wallRender = new createjs.Container();
        wayGrid[0].forEach( (cell, i)  => {
            cell.walkable = false;
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#606060").drawRect(i * me.mapGridCellSize + 1, 1, me.mapGridCellSize - 1, me.mapGridCellSize - 1);
            wallRender.addChild(rect);
        });
        wayGrid[height - 1].forEach( (cell, i)  => {
            cell.walkable = false;
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#606060").drawRect(i * me.mapGridCellSize + 1, height * (me.mapGridCellSize - 1) - 9, me.mapGridCellSize - 1, me.mapGridCellSize - 1);
            wallRender.addChild(rect);
        });
        for(let i = 0; i < height; i++) {
            wayGrid[i][0].walkable = false;
            wayGrid[i][width - 1].walkable = false;
            let rect = new createjs.Shape();
            rect.graphics.beginFill("#606060").drawRect(1, i * (me.mapGridCellSize) + 1, me.mapGridCellSize - 1, me.mapGridCellSize - 1);
            rect.graphics.beginFill("#606060").drawRect( width * (me.mapGridCellSize - 1) + 1, i * (me.mapGridCellSize) + 1, me.mapGridCellSize - 1, me.mapGridCellSize - 1 );
            wallRender.addChild(rect);
        }

        wayGrid[5].forEach( (cell, i)  => {
            if(i != 3) {
                cell.walkable = false;
                let rect = new createjs.Shape();
                rect.graphics.beginFill("#606060").drawRect(i * me.mapGridCellSize + 1, 5 * me.mapGridCellSize + 1, me.mapGridCellSize - 1, me.mapGridCellSize - 1);
                wallRender.addChild(rect);
            }
        });


        this.mainStage.addChild(wallRender);
        this.mainStage.setChildIndex( wallRender, 1);
    }

    generatePathFindingGrid(x, y, cellSize) {
        let xCells = Math.floor(this.mapSize.x / cellSize);
        let yCells = Math.floor(this.mapSize.y / cellSize);
        return new PF.Grid(xCells, yCells);
    }

    refresh() {
        //по хорошему здесь получать все данные из объекта игры, и вносить изменения перед update
        this.mainStage.update();
    }

    setGame(game) {
        this.game = game;
    }
}
