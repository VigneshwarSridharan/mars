var express = require('express');
var router = express.Router();
let { createJWToken, verifyJWTToken } = require('../utils/jwt');
let bindRes = require('../utils/bindRes');
let redis = require("redis");
let map = require('async/map')

let client = redis.createClient();

/* GET home page. */
router.get('/', function (req, res, next) {
    client.keys(`chat-2-*`, (err, keys) => {
        if (err) return console.log(err);

        map(keys, (key, callback) => {
            client.get(key, (err, value) => {
                if (err) return callback(err);

                callback(err, {
                    [key]: JSON.parse(value)
                })
            })
        }, (err, result) => {
            if (err) return console.log(err);
            bindRes(err, result, res)
        })
    })
});

module.exports = router;
