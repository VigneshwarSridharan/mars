var express = require('express');
var router = express.Router();
let bindRes = require('../utils/bindRes');
var bugCatcher = require('../model/bugCatcher')
var fs = require('fs');
var http = require('axios');
var uuid = require('uuid');

router.post('/', function (req, res, next) {
    http.get(req.body.source).then(httprRes => {
        let fileName = uuid.v4().replace(/-/g, '') + '.txt';
        let path = "storage/" + fileName
        fs.writeFile(path, httprRes.data, (err, result) => {
            req.body.file = path;
            bugCatcher.inset(req.body, (err, result) => {
                if (err) return;
                bindRes(err, "Success!", res)
                bugCatcher.get(result.insertId,(err,result) => {
                    if(err) {
                        return
                    }
                    let [item] = result;
                    item.file = httprRes.data;
                    req.app.bugCatcherSoket.emit('add-bug',item)
                })
            })
        })
    })
})

router.get('/', function (req, res, next) {
    bugCatcher.all((err, result) => {
        bindRes(err, result, res);
    })
})

router.get('/:id', function (req, res, next) {
    let { id } = req.params;
    bugCatcher.get(id, (err, result) => {
        if(err) {
            bindRes(err,result,res);
            return
        }
        let [item] = result;
        fs.readFile(item.file,'utf8',(err,result) => {
            item.file = result;
            bindRes(err,item,res);
        })

        // console.log(item)
    })
})

module.exports = router;