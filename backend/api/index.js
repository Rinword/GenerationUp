const express = require('express');
const router = express.Router();
// const { auth } = require('firebase-admin');

// const userApi = require('./user');
const userApi = require('./users');
// const appStateApi = require('./appState');

// const authService = auth();

function createRoutes(route) {
    const { GET = [], POST = [], PUT = [], DELETE = [] } = route;

    GET.forEach(function(route) {
        const [url, ...callbacks] = route;
        console.log('--', url, callbacks);
        router.get(url, ...[callbacks]);
    });

    POST.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.post(url, ...[callbacks]);
    });
}

function applyRoutes(app, socket) {
    // createRoutes(armoryApi, router);
    createRoutes(userApi, router);

    console.log('APPLY', userApi);

    router.get('/api/*', (req, res, next) => {
        res.json({ success: true, message: 'This api url is not declared' });
    });

    app.use(router);
}

module.exports = { applyRoutes };
