const express = require('express');
const router = express.Router();
const url = require('url');
const Game = require('../modules/game')

/* GET users listing. */
module.exports = function(url, app) {
    const game = new Game({app});

    app.get(`${url}/default`, (req, res) => {

        res.send({ map: game.get('map'), name: 'default' });
    });

    app.get(`${url}/*`, (req, res) => {
        res.send({data: {bbb: 2}});
    });
}