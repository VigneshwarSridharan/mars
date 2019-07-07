let express = require('express');
let router = express.Router();
let { verifyJWTToken } = require('../utils/jwt');

router.use(verifyJWTToken);

router.post('/', (req, res) => {
    let { user_id } = req;
    res.json({
        name: 'asdasd',
        user_id
    })
})



module.exports = router;