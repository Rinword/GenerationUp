const BaseObject = require('../baseObject');

const classResolver = require('../../dataToDB/classResolver');
const helpers =  require('../../helpers');

class BaseUnit extends BaseObject {
    constructor(x, y) {
        super();

        this.baseGeometry = {
            type: 'unit',
            curX: x,
            curY: y,
        };

        this.data = {
            ...this.generateUnitClass(),
        }

        // this.baseGeometry.bounds = {
        //     x: 0 - this.baseGeometry.baseSize,
        //     y: 0 - this.baseGeometry.baseSize,
        //     height: 2 * this.baseGeometry.baseSize,
        //     width: 2 * this.baseGeometry.baseSize
        // };
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
}

module.exports = BaseUnit;