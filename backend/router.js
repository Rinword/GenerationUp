const game = require('./routes/game');
const path = require('path');

const bu = '/api/';

module.exports = function (app, socket) {

    game(bu + 'game', app, socket);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'));
    });
};