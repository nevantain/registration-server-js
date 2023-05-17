const config = require('../config.js')

class validation {
    validData(username, password) {
        if (!username || !password) {
            return false;
        }

        if (username.split('').length < 5 || password.split('').length < 5) {
            return false;
        }

        return true;
    }

    syncPasswords(newPass, oldPass) {
        if (config.crypto.SHA256(newPass) != oldPass) {
            return false;
        }
        return true;
    }
}

module.exports = new validation();