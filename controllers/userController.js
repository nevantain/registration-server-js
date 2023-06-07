const config = require('../config.js');
const jwt = require('jsonwebtoken');
const dbController = require('./dbController.js');
const validController = require('./validController.js');

const generateAccessToken  = (id, username) => {
    return jwt.sign({ id, username }, config.secret);
}

class userController {
    async sign(req, res) {
        try {
            let { username, password } = req.body;
            // VALIDATION
            if (validController.validData(username, password) === false) {
                return res.status(400).json('not valid data');
            }
            // EXAM DATA
            const candidate = await dbController.getOneUser(username);
            if (candidate) {
                return res.status(400).json({ message: 'user already exits' });
            }
            // CREATE USER
            const dateNow = new Date();
            const date = `${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()}-${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
            await dbController.createUser(username, password, date);
            const userPayload = await dbController.getOneUser(username);
            const token = generateAccessToken(userPayload.id, userPayload.username);
            return res.status(200).json({ token: token, user: await dbController.getOneUser(username)});
        } catch (e) {
            console.log(e);
            return res.status(400).json({ 'user not created': e });
        }
    }

    async login(req, res) {
        try {
            let { username, password } = req.body;
            const candidate = await dbController.getOneUser(username);
            validController.syncPasswords(password, candidate.password);
            if (!candidate) {
                return res.json(400, { message: 'user not found' });
            }
            const token = generateAccessToken(candidate.id, candidate.username);
            return res.status(200).json({token: token, user: await dbController.getOneUser(username)});
        } catch (e) {
            console.log(e);
            return res.status(400).json({ 'user not logined': e });
        }
    }

    async getAll(req, res) {
        try {
            dbController.getUsers(req, res);
        } catch (e) {
            return e;
        }
    }

}

module.exports = new userController();