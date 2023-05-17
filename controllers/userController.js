const config = require('../config.js');
const jwt = require('jsonwebtoken');
const dbController = require('./dbController.js');
const validController = require('./validController.js');

const generateAccessToken  = (id) => {
    return jwt.sign(id, config.secret);
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
            await dbController.createUser(username, password);
            return res.status(200).json('user created');
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
            const token = generateAccessToken(candidate.id);
            return res.status(200).json({token});
        } catch (e) {
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