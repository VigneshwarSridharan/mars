let express = require('express');
let router = express.Router();
let sql = require('../utils/db');
let User = require('../model/user');
let { createJWToken, verifyJWTToken } = require('../utils/jwt');
let bindRes = require('../utils/bindRes');

let redis = require("redis");

let client = redis.createClient();

/* GET users listing. */
router.get('/', verifyJWTToken, function (req, res, next) {

    User.allUsers((err, result = []) => {
        if (err) throw err

        result = result.filter(f => f.user_id != req.user_id)
        bindRes(err, result, res);

    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    User.login(username, password, (err, result) => {

        if (err) return setTimeout(() => {
            bindRes(err, null, res)
        }, 5000);;

        let { user_id = "" } = result;
        let token = createJWToken({ user_id });
        delete result.password;
        delete result.user_id;
        delete result.status;
        bindRes(err, { ...result, token }, res);
    })
})

router.get('/test',(req,res) => {
    client.keys('search*',(err,keys) => {
        res.json(keys);
    })
})

module.exports = router;
