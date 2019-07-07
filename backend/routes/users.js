let express = require('express');
let router = express.Router();
let sql = require('../utils/db');
let User = require('../model/user');
let { createJWToken } = require('../utils/jwt');
let bindRes = require('../utils/bindRes');

/* GET users listing. */
router.get('/', function (req, res, next) {
    sql.query('SELECT * FROM users', (err, result) => {
        if (err) throw err

        bindRes(err, result, res);
        res.json(result);

    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    User.login(username, password, (err, result) => {
        let { user_id } = result;
        let token = createJWToken({ user_id });
        bindRes(err, { ...result, token }, res);
    })
})

module.exports = router;
