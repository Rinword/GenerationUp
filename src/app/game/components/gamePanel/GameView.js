import UnitView from './views/UnitView';
import MapRenderer from './renders/map';

import { deepExtend } from 'ui/helpers';

const CELL_SIZE = 40;
const FPS = 60;

// createjs.Ticker.setFPS(FPS);

export default class Game {
    constructor(context, config, socket){
        this.mainStage = new createjs.Stage(context);
        this.mainStage.children.length = 0;
        this.socket = socket;
        this.frameCap = 0;
        this.serverFrameCap = 0;
        // input.init(); //регистрация событий клавиатуры
        this.isGameOver = false;
        this.isGamePause = false;
        this.mapGridCellSize = CELL_SIZE;

        this.settings = {
            mapSettings: {
                displayGridCells: true,
                displayGridCoords: false,
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
            // unit: new UnitRenderer(this, {cellSize: CELL_SIZE, settings: this.settings}),
        }

        this.views = {
            units: [],
        }

        //рендер карты. Объекты в ссылках (например юниты) не рендерятся.
        this.renderMap();

        //рендер динамических структур. Здесь это боты
        this.renderUnits(0, false);

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
        this.updateViews = this.updateViews.bind(this);

        setInterval(() => {
            if(this.serverFrameCap > this.frameCap) {
                this.frameCap++;
                this.refresh();
                this.updateViews();
            }
        }, 1000/FPS)
    }

    regSockets() {
        this.socket.on('update_units', data => {
            this.data.units = data.units;
            this.data.map = data.map;
            this.serverFrameCap = data.cap;
            this.selectedUnitName = data.selectedUnit;

            const isNewGame = this.data.uuid !== data.uuid;
            this.data.uuid = data.uuid;

            this.renderUnits(this.frameCap, isNewGame);

            this.renders.map.renderWays(Object.values(this.data.units));
            this.renders.map.renderNoWalkableCells(this.data.map.ways);
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

       this.renderCellBorders();
       this.renderCellCoords();
       this.renderCurrentWays();
       this.renderNoWalkableCells();
    }

    renderCellBorders() {
        const borders = this.renders.map.renderCellBorders();
        borders.name = 'Map_cells';
        borders.visible = this.settings.mapSettings.displayGridCells;
        this.mainStage.addChild(borders);
    }

    renderCurrentWays() {
        const unitWays = new createjs.Container();
        unitWays.name = 'Units_ways';
        unitWays.visible = this.settings.mapSettings.displayCurrentWays;
        this.mainStage.addChild(unitWays);
    }

    renderNoWalkableCells() {
        const unitWays = new createjs.Container();
        unitWays.name = 'Map_no-walkable';
        unitWays.visible = this.settings.mapSettings.displayNoWalkable;
        this.mainStage.addChild(unitWays);
    }

    renderCellCoords() {
        const coords = this.renders.map.renderCellsCoords();
        coords.name = 'Map_coords';
        coords.visible = this.settings.mapSettings.displayGridCoords;
        this.mainStage.addChild(coords);
    }


    renderUnits(frame, needRerender) {
        // if(needRerender) {
        //     this.mainStage.getChildByName('Units_bots').removeAllChildren();
        //     this.mainStage.removeChild(this.mainStage.getChildByName('Units_bots'));
        // }

        const units = Object.values(this.data.units);
        let units_bots_canvas = this.mainStage.getChildByName('Units_bots');

        if(!units_bots_canvas) {
            units_bots_canvas = new createjs.Container();
            units_bots_canvas.name = 'Units_bots';
            this.mainStage.addChild(units_bots_canvas);

            units.forEach(unitData => {
                this.views.units.push(
                    new UnitView(units_bots_canvas, unitData, { cellSize: this.mapGridCellSize, settings: this.settings, frameCup: this.frameCap})
                );
            })
        }

        units.forEach((unitData, i) => this.views.units[i].updateData(unitData, this.frameCap, this.serverFrameCap, this.selectedUnitName));

    }

    getGridCellByCoords(x, y) {
        return {x: +((Math.floor(x / CELL_SIZE)).toFixed(0)), y:+(Math.floor(y / CELL_SIZE).toFixed(0))};
    }

    applySettings(settings) {
        this.settings = deepExtend(this.settings, settings);

        for(let i in this.renders) {
            this.renders[i].updateSettings(this.settings);
        }

        const cells = this.mainStage.getChildByName('Map_cells');
        const ways = this.mainStage.getChildByName('Units_ways');
        const coords = this.mainStage.getChildByName('Map_coords');
        const noWalkable = this.mainStage.getChildByName('Map_no-walkable');
        cells.visible = this.settings.mapSettings.displayGridCells;
        ways.visible = this.settings.mapSettings.displayCurrentWays;
        noWalkable.visible = this.settings.mapSettings.displayNoWalkable;
        coords.visible = this.settings.mapSettings.displayGridCoords;

        this.refresh();
    }

    refresh() {
        this.mainStage.update();
    }

    updateViews() {
        for(let i in this.views) {
            this.views[i].forEach(view => view.updateView());
        }
    }
}
