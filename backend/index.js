const express = require('express');
const debug = require('debug')('geneticdiamond:server');
const http = require('http');
const logger = require('morgan');
const port = 3001;
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const router = require('./router');

console.log('-----------N-O-D-E--J-S-----------');

const app = express();
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../', 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.set('port', port);

// MongoClient.connect('mongodb://localhost:27017/root', (err, database) => {
//     if (err) return console.log(err);
//     console.log('DB server has started on :27017');
//
//     router(app, database);
//
//     app.listen(port, () => {
//         console.log('server has started on :' + port);
//     });
//
//     app.on('error', onError);
//     app.on('listening', onListening);
//
//     /**
//      * Event listener for HTTP server "listening" event.
//      */
//
//     function onListening() {
//         const addr = server.address();
//         const bind = typeof addr === 'string'
//             ? 'pipe ' + addr
//             : 'port ' + addr.port;
//         debug('Listening on ' + bind);
//     }
//
//     // database.close();
// })


router(app);

app.listen(port, () => {
    console.log('server has started on :' + port);
});

app.on('error', onError);
app.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;

    if (~port) {
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
