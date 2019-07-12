let express = require('express');
let router = express.Router();
let { verifyJWTToken } = require('../utils/jwt');
let bindRes = require('../utils/bindRes');
let Alphavantage = require('../model/alphavantage');

router.use(verifyJWTToken);

router.post('/search', (req, res) => {
    let { query = "" } = req.body;

    if (!query) return bindRes(true, "Keyword requires", res);

    Alphavantage.search(query, (err, result) => {
        if (err) return bindRes(true, err, res);

        bindRes(err, result, res);
    })
})

router.post('/symbolBasicInfo', (req, res) => {
    let { symbol = "" } = req.body;

    if (!symbol) return bindRes(true, "Symbol requires", res);

    Alphavantage.symbolBasicInfo(symbol, (err, result) => {
        if (err) return bindRes(true, err, res);

        bindRes(err, result, res);
    })
})

router.post('/watchlist', (req,res) => {
    
})


module.exports = router;