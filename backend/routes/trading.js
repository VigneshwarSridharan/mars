let express = require('express');
let router = express.Router();
let { verifyJWTToken } = require('../utils/jwt');
let bindRes = require('../utils/bindRes');
let Trading = require('../model/trading');

router.use(verifyJWTToken);

router.post('/search', (req, res) => {
    let { query = "" } = req.body;

    if (!query) return bindRes(true, "Keyword requires");

    Trading.search(query, (err, result) => {
        if (err) return bindRes(err, null, res);

        bindRes(err, result, res);
    })
})



module.exports = router;