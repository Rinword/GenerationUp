const gearCreator = require('../modules/objects/libs/GearCreator');
const helpers = require('./helpers');
const itemStorage = {};

class Armory {
    constructor() {
        this.data = itemStorage;
    }

    createItem(req) {
        const name = req.body.name || 'Наплеч последнего полководца';
        const level = req.body.level || helpers.randomInteger(1, 10);
        const stats = req.body.stats || null;

        console.log('OPT', req.body);

        // if(req.body.num) {
        //     return  Array(req.body.num).fill(gearCreator.createItem(name, level, req, stats));
        // }

        return [gearCreator.createItem(name, level, req, stats)];
    }
}

module.exports = new Armory();
