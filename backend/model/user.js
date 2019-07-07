var sql = require('../db');
var md5 = require('md5');

module.exports = {
    login: (username, password, callback) => {
        sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
            if (err) callback(err)

            let [user = {}] = result;
            if (user.password == md5(password)) {
                delete user.password;
                callback(err,user);
            }
            else {
                callback('password dos\'t match');
            }
        })
    }
}