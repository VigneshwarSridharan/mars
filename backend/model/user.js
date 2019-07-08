var sql = require('../utils/db');
var md5 = require('md5');

module.exports = {

    login: (username, password, callback) => {
        sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
            if (err) callback(err)

            let [user = {}] = result;
            if(Object.keys(user).length == 0) {
                callback('Username doesn\'t match.')
                return;
            }
            if (user.password == md5(password)) {
                callback(err,user);
            }
            else {
                callback('Password doesn\'t match.');
            }
        })
    }
}