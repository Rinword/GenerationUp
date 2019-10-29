const UserService = require('../services/UserService');

const userService = new UserService();

async function getAllUsers(req, res, next) {
    const users = await userService.getAllUsers();

    console.log('DDDD', users);

    res.json({ success: true, data: users });
}

async function setUserData(req, res, next) {
    const data = req.body;
    const user = await userService.setUserData(req.body);

    res.json({ success: true, data: user });
}

module.exports = {
    GET: [
        ['/api/v1/users', getAllUsers],
    ],
    POST: [
        ['/api/v1/user/create', setUserData]
    ],
};
