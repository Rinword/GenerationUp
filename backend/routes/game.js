const express = require('express');
const router = express.Router();
const url = require('url');

/* GET users listing. */
module.exports = function(url, app) {

    app.get(`${url}/default`, (req, res) => {
        res.send({ map: [], name: 'default' });
    });

    app.get(`${url}/*`, (req, res) => {
        res.send({data: {bbb: 2}});
    });
}