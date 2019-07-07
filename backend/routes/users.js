var express = require('express');
var router = express.Router();
var sql = require('../db');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var bindRes = (error = false, data, res, token = '') => {
    let status = '';
    if (error) {
        status = 'error';
        data = data || error;
        res.json({ status, data, token });
    }
    else {
        status = 'success';
        res.json({ status, data, token });
    }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    sql.query('SELECT * FROM users', (err, result) => {
        if (err) throw err

        res.json(result);

    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    User.login(username, password, (err, result) => {
        let exp = Number(moment('X'))
        var token = jwt.sign({ name: 'dfdfd', iat: (new Date().getTime()) }, '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', { expiresIn: '1h' });
        var decoded = jwt.verify(token, '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');
        console.log(decoded)
        bindRes(err, result, res, token);
    })
})

module.exports = router;
