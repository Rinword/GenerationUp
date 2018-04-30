import UnitRenderer from './renders/units';
import MapRenderer from './renders/map';

import { deepExtend } from 'ui/helpers';

const CELL_SIZE = 40;
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

        this.settings = {
            mapSettings: {
                displayGridCells: true,
                displayGridCoords: true,
                displayCurrentWays: true,
                displayNoWalkable: false,
            },
        }

        this.data = {
            ...config.data,
            mapSize: {x: config.data.map.ways.height, y: config.data.map.ways.width}
        }

        this.renders = {
            map: new MapRenderer(this, {cellSize: CELL_SIZE, mapSize: this.data.mapSize, settings: this.settings}),
            unit: new UnitRenderer(this, {cellSize: CELL_SIZE, settings: this.settings}),
        }

        //рендер карты. Объекты в ссылках (например юниты) не рендерятся.
        this.renderMap();

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

        this.applySettings = this.applySettings.bind(this);
        this.renderMap = this.renderMap.bind(this);
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

       if(this.settings.mapSettings.displayGridCells) this.renderCellBorders();
    }

    renderCellBorders() {
        const borders = this.renders.map.renderCellBorders();
        borders.name = 'MapCellsBorders';
        this.mainStage.addChild(borders);
        // this.mainStage.setChildIndex(borders, 0);
        this.mainStage.setChildIndex(borders, this.mainStage.getNumChildren()-1);
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

    applySettings(settings) {
        this.settings = deepExtend(this.settings, settings);

        for(let i in this.renders) {
            this.renders[i].updateSettings(this.settings);
        }

        this.renderMap();

        this.refresh();
    }

    refresh() {
        this.mainStage.update();
    }
}
