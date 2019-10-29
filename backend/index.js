const debug = require('debug')('geneticdiamond:server');
const http = require('http');
// const cookieParser = require('cookie-parser');
// const socketIO = require('socket.io');
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require('./adminFirebaseKey.json')
// const { applyRoutes } = require('./api');

const port = process.env.PORT || '3002';

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://generationup-a7d04.firebaseio.com',
});

console.log('-----------N-O-D-E--J-S-----------');

const app = require('./server');
const server = http.createServer(app).listen(port);

// const io = socketIO(server);

// io.on('connection', socket => {
//     console.log('IO: User connected')
//     applyRoutes(app, socket);
//
//     socket.on('disconnect', () => {
//         console.log('IO: user disconnected')
//     })
// })

console.log('server has successfully started on ' + port);

server.on('error', onError);
server.on('listening', onListening);

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
}
