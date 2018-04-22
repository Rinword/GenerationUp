module.exports = class baseObject {
    constructor() {
        this.id = null;
        this.type = 'object'; //charItem, mapItem, unit
        this.name = 'DefaultName';
        this.movable = false;
        this.destructable = false;
    }
}