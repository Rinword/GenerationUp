const express = require('express');
const router = express.Router();
// const url = require('url');
const Game = require('../modules/game')

module.exports = function(url, app, socket) {
    const game = new Game({app, socket});
    console.log('Create game')

    app.get(`${url}/default`, (req, res) => {

        res.send({ data: game.getData(), name: 'default' });
    });

    app.get(`${url}/*`, (req, res) => {
        res.send({data: {bbb: 2}});
    });
}