const armory = require('../modules/armory');

/* GET users listing. */
module.exports = function(url, app, socket) {
    app.post(`${url}/create/item`, (req, res) => {
        res.send({ data: armory.createItem(req) });
    });

    app.get(`${url}/*`, (req, res) => {
        res.send({data: {bbb: 2}});
    });
}