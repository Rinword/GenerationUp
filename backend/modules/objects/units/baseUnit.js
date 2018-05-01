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
            lastMoveTime: 0,
            wayArr: [],
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false,
            speed: 2, // 4 клетки в секунду
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
        //random moving
        let shouldMove = false;
        if(this.movingData.lastMoveTime % 10 === 0) {
            shouldMove = helpers.randomInteger(0, this.movingData.lastMoveTime >= 70);
        }

        if(!this.movingData.isBusyNow && shouldMove) {
            let cellX = this.baseGeometry.curX;
            let cellY = this.baseGeometry.curY;
            const { x, y } = this.getFreeCell(cellX, cellY);
            this.moveTo(x, y);

            return;
        } else {
            this.movingData.lastMoveTime++;
        }

        this.move();
    }

    isWalkable(x, y) {
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
            this.wayTracker();
            this.movingData.currTimeLength++;
        } else {
            this.movingData.currTimeLength = 0;
        }
    }

    //задает юниту конечную точку, которую нужно достигнуть
    moveTo(x,y, initByCoords, approachMode) {
        this.clearMovingData();
        this.movingData.isBusyNow = true;

        this.movingData.finalTargetPoint = {x, y};

        //определить в каком квадрате грида находится сейчас объект
        let startPoint = { x: this.baseGeometry.curX, y: this.baseGeometry.curY };

        // console.log('START', startPoint.x, startPoint.y, '->', x, y);

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
        const md = this.movingData;
        const bg = this.baseGeometry;
        const currTargetCell = md.wayArr[0];

        if(!md.wayArr.length) {
            console.log('FRAME', md.currTimeLength);
            console.warn('Конечная точка недостижима', this.name);
            this.clearMovingData();
            return;
        }

        if(md.currTimeLength === +((60 / md.speed / 2).toFixed(0))) {
            // console.log('FRAME', md.currTimeLength)
            console.log('-- смена занятой клетки',  bg.curX, bg.curY, '->', currTargetCell[1], currTargetCell[0])
            //сменить текущую занятую клетку на новую
            if(!this.isWalkable(currTargetCell[1], currTargetCell[0])) {
                console.log('Следующая клетка занята, маршрут прерван', this.name);
                this.clearMovingData();
                return;
            }
            bg.curX = currTargetCell[1];
            bg.curY = currTargetCell[0];
        }

        if(md.currTimeLength === +((60 / md.speed).toFixed(0)) || md.currTimeLength === 0) {
            //если это был последний - закончить маршрут и очистить moving data
            // console.log('FRAME', md.currTimeLength)
            md.wayArr.shift();

            if(!md.wayArr.length) {
                // console.log('МАРШРУТ ОКОНЧЕН', this.name, currTargetCell[1], currTargetCell[0]);
                md.currTimeLength = 0;
                this.clearMovingData();
                return;
            }

            // console.log('||Точка достигнута', currTargetCell[1], currTargetCell[0]);

            const newTargetCell = md.wayArr[0];
            const direction = this.getDirectionBy2Cells({x: bg.curX, y: bg.curY }, {x: newTargetCell[1], y: newTargetCell[0]});
            console.log(direction);
            md.direction = direction;
            md.currTimeLength = 0;
        }

        //по текущей целевой точке определить направление для перемещения юнита, обработать коллизии
        //     //обработка коллизии, когда на следующей клетке уже что-то есть
        //     this.movingData.currTargetPoint = {x: this.movingData.wayArr[index][0],y: me.movingData.wayArr[index][1]};
        //     if(!this.game.mapWayGrid.nodes[this.movingData.currTargetPoint.y][this.movingData.currTargetPoint.x].walkable) {
        //         this.clearMovingData();
        //         // console.log('Маршрут прерван, следующая клетка теперь занята');
        //     } else {
        //         this.resetMapPosition(this.movingData.currTargetPoint); //обновляет нахождение бота в MapGrid, MapWayGrid и me.baseGeometry.curCell
        //         this.movingData.direction = this.getDirectionBy2Cells(currCell, this.movingData.currTargetPoint);
        //     }
        // }
    }

    getDirectionBy2Cells(start, finish) {
        let direction = null;
        if(!start || !finish) return direction;
        let deltaX = finish.x - start.x;
        let deltaY = finish.y - start.y;
        if(Math.abs(deltaX)) {
            deltaX > 0 ? direction = 'right' : direction = 'left';
        }

        if(Math.abs(deltaY)) {
            deltaY > 0 ? direction = 'bottom' : direction = 'top';
        }

        if( !Math.abs(deltaX) && !Math.abs(deltaY) ) {
            direction = null;
        }

        return direction;
    }

    clearMovingData() {
        this.movingData = {
            ...this.movingData,
            direction: null,
            currTimeLength: 0,
            lastMoveTime: 0,
            wayArr: [],
            finalTargetPoint: null,
            currTargetPoint: null,
            isBusyNow: false
        }
    }
}

module.exports = BaseUnit;