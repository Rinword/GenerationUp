const gearCreator = require('../modules/objects/libs/GearCreator');
const helpers = require('./helpers');
const itemStorage = {};

class Armory {
    constructor() {
        this.data = itemStorage;
    }

    createItem(options) {
        const name = options.name || 'Наплеч последнего полководца';
        const level = options.level || helpers.randomInteger(1, 10);
        const req = options.req || null;
        const stats = options.stats || null;

        if(options.num) {
            const res = [...Array(options.num)].fill(gearCreator.createItem(name, level, req, stats));
            console.log("RES", res);

            return res;

        }

        return gearCreator.createItem(name, level, req, stats);
    }
}

module.exports = new Armory()
