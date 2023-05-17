const db = require('../db/db.js');
const config = require('../config.js');

class dbController {
    async createUser(username, password) {
        try {
            const thisClass = new dbController();
            password = config.crypto.SHA256(password).toString();
            await db.query('INSERT INTO person (username, password) values ($1, $2) RETURNING *', [ username, password ]);
            console.log(thisClass.getOneUser(username));
            return thisClass.getOneUser(username);
        } catch (e) {
            return e;
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query('SELECT * FROM person');
            return res.status(400).json((await users).rows);
        } catch (e) {
            return e;
        }
    }

    async getOneUser(username) {
        try {
            const user = await db.query('SELECT * FROM person WHERE username=$1', [username]);
            return (await user).rows[0];
        } catch (e) {
            return e;
        }
    }

    async updateUser(req, res) {
        try {
            let { id, username, password } = req.body;
            password = config.crypto.SHA256(password).toString();
            const user = await db.query('UPDATE person set username=$1, password=$2 WHERE id=$3 RETURNING *', [username, password, id]);
            return (await user).rows[0];
        } catch (e) {
            return e;
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await db.query('DELETE FROM person WHERE id=$1', [req.body.id]);
            return (await user).rows[0];
        } catch (e) {
            return e;
        }
    }
}

module.exports = new dbController();