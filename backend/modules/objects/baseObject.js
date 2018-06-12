const uuidv4 = require('uuid/v4');

module.exports = class baseObject {
    constructor() {
        this.uuid = uuidv4();
        this.type = 'object'; //charItem, mapItem, unit
        this.name = 'DefaultName';
        this.movable = false;
        this.destructable = false;
    }
}