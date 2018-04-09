const users = require('./routes/food');
const statistic = require('./routes/statistic');
const path = require('path');

const bu = '/api/';

module.exports = function (app, db) {

    statistic(bu + 'statistic', app, db);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'));
    });
};