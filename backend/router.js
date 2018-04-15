const game = require('./routes/game');
const path = require('path');

const bu = '/api/';

module.exports = function (app) {

    game(bu + 'game', app);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'));
    });
};