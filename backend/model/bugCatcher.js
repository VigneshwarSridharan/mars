var sql = require('../utils/db');
var md5 = require('md5');

module.exports = {
    // 
    inset: (data, callback) => {
        let { message, source, lineno, colno, error, file } = data;
        let str = `INSERT INTO bug_catcher ( message, source, lineno, colno, error, file ) VALUES ( "${message}", "${source}", ${lineno}, ${colno}, "${error}", "${file}")`
        console.log(str);
        sql.query(str,callback)
    },

    all: (callback) => {
        sql.query(`SELECT * FROM bug_catcher`,callback)
    },

    get: (id,callback) => {
        sql.query(`SELECT * FROM bug_catcher WHERE id=${id}`,callback)
    }
}