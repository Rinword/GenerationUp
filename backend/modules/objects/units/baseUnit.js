const BaseObject = require('../baseObject');
const PF = require('pathfinding');

const classResolver = require('../../dataToDB/classResolver');
const helpers =  require('../../helpers');

const finder = new PF.AStarFinder();

class BaseUnit extends BaseObject {
    constructor(x, y, grid) {
        super();

        this.wayGrid = grid;

        this.baseGeometry = {
            type: 'unit',
            curX: x,
            curY: y,
        };

        this.movingData = {
            direction: null,
            currTimeLength: 0,
            lastTimeMoveStamp: 0,
            lastTimeMoveWay: 0,
            wayArr: [],
            wayCounter: 0,
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false,
            speed: 2, //2 клетки в 100 тиков
        };

        this.data = {
            ...this.generateUnitClass(),
        }

        this.isWalkable = this.isWalkable.bind(this);
        this.getFreeCell = this.getFreeCell.bind(this);
    }

    generateUnitClass(code1, code2) {
        let classCode = '';
        if( typeof code1 !== 'undefined' && typeof code2 !== 'undefined') {
            classCode = code1.toString() + code2.toString()
        } else {
            while(1) {
                classCode = helpers.randomInteger(0, 6).toString() + helpers.randomInteger(0, 6).toString();
                if(classCode[0] != classCode[1]) break;
            }
        }
        let className = classResolver.getClassNameById(classCode);

        return { className, classCode }
    }

    update() {
        if(!this.movingData.isBusyNow) {
            let cellX = this.baseGeometry.curX;
            let cellY = this.baseGeometry.curY;
            const { x, y } = this.getFreeCell(cellX, cellY);
            this.moveTo(x, y);
            this.movingData.isBusyNow = true;
            this.movingData.currTimeLength = 0;

            return;
        }

        this.move();
    }

    isWalkable(x, y) {
        // try {
        if(!this.wayGrid.nodes[x] || !this.wayGrid.nodes[x][y] ) {
            return false;
        }

        return this.wayGrid.nodes[x][y].walkable;
    }

    getFreeCell(curX, curY, range = 3) {
        while(1) {
            let dx = helpers.randomInteger(1, range);
            let dy = helpers.randomInteger(1, range);
            if(helpers.randomInteger(0,1) === 0) dx = -dx;
            if(helpers.randomInteger(0,1) === 0) dy = -dy;

            if(this.isWalkable(curX + dx, curY + dy)) {
                return {x: curX + dx, y: curY + dy};
            }
        }
    }

    move() {
        if(this.movingData.isBusyNow) {
            this.movingData.currTimeLength++;
            // this.movingData.curX += this.baseGeometry.curX;
            // this.movingData.curY += this.baseGeometry.curY;
            // this.wayTracker();

        }
        // } else {
        //     this.movingData.currTimeLength++;
        //     // this.updateWayGrid() //проверка занятости клетки. Как только бот достигает границы следующей клетки - меняем walkable
        //
        //     this.movingData.curX = this.baseGeometry.curX;
        //     this.movingData.curY = this.baseGeometry.curY;
        // }
    }

    //задает юниту конечную точку, которую нужно достигнуть
    moveTo(x,y, initByCoords, approachMode) {
        this.movingData.wayArr.length = 0;
        this.movingData.isBusyNow = true;
        //определить к какому квадрату грида относится эта точка
        if(initByCoords) {
            // this.movingData.finalTargetPoint = this.getGridCellByCoords(x,y);
        } else {
            this.movingData.finalTargetPoint = {x, y};
        }

        //определить в каком квадрате грида находится сейчас объект
        let startPoint = { x: this.baseGeometry.curX, y: this.baseGeometry.curY };
        //построить путь либой
        let grid = this.wayGrid.clone();
        let wayArr = [];

        if(approachMode) {
            // grid.nodes[y][x].walkable = true; //принудительно в клоне карты меняем на walkable, иначе не строит маршрут
            // wayArr = finder.findPath(startPoint.x, startPoint.y, this.movingData.finalTargetPoint.x, this.movingData.finalTargetPoint.y, grid);
            // wayArr.pop(); //убираем последнюю точку маршрута, потому что там целевой бот
        } else {
            try {
                wayArr = finder.findPath(startPoint.y, startPoint.x, this.movingData.finalTargetPoint.y, this.movingData.finalTargetPoint.x, grid);
            } catch(err) {
                console.warn(err);
                console.log('....', startPoint, this.movingData.finalTargetPoint, grid);
            }
        }
        this.movingData.wayArr = wayArr;
        this.movingData.wayCounter = 0;
    }

    wayTracker() {
        //по текущей целевой точке определить направление для перемещения юнита, обработать коллизии
        this.movingData.direction = this.getDirectionBy2Cells(this.baseGeometry, this.movingData.currTargetPoint);
        console.log('direction', this.movingData.direction);

        //в момент совпадения currCell и currTargetPoint вернется 0 направления, тогда назначаем следующую точку
        if(!this.movingData.direction) {
            this.movingData.lastTimeMoveWay = 0;
            this.movingData.wayCounter++;
            let index = this.movingData.wayCounter;

            //когда следующего элемента массива пути нет - конец маршрута
            if(!this.movingData.wayArr[index]) {
                this.clearMovingData();
                console.log('Прибыл в место назначения', this.name);

                return true;
            }

            //обработка коллизии, когда на следующей клетке уже что-то есть
            this.movingData.currTargetPoint = {x: this.movingData.wayArr[index][0],y: me.movingData.wayArr[index][1]};
            if(!this.game.mapWayGrid.nodes[this.movingData.currTargetPoint.y][this.movingData.currTargetPoint.x].walkable) {
                this.clearMovingData();
                // console.log('Маршрут прерван, следующая клетка теперь занята');
            } else {
                this.resetMapPosition(this.movingData.currTargetPoint); //обновляет нахождение бота в MapGrid, MapWayGrid и me.baseGeometry.curCell
                this.movingData.direction = this.getDirectionBy2Cells(currCell, this.movingData.currTargetPoint);
            }
        }
    }

    getDirectionBy2Cells(start, finish) {
        let direction = null;
        if(!start || !finish) return direction;
        let deltaX = finish.x - start.x;
        let deltaY = finish.y - start.y;
        if(Math.abs(deltaX)) {
            deltaX > 0 ? direction = 'left' : direction = 'right';
        }

        if(Math.abs(deltaY)) {
            deltaY > 0 ? direction = 'top' : direction = 'bottom';
        }

        if( !Math.abs(deltaX) && !Math.abs(deltaY) ) {
            direction = null;
        }

        return direction;
    }

    clearMovingData() {
        this.movingData = {
            direction: 0,
            currTimeLength: 0,
            lastTimeMoveStamp: 0,
            lastTimeMoveWay: 0,
            wayArr: [],
            wayCounter: 0,
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false
        }
    }
}

module.exports = BaseUnit;