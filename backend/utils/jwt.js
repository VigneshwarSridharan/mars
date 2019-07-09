let jwt = require('jsonwebtoken');
let bindRes = require('./bindRes');

let SHA = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'

let createJWToken = (data = "") => {
    let iat = new Date().getTime();
    let hours = 1;
    let exp = iat + (1000 * 60 * 60) * hours;
    return jwt.sign({ ...data, iat, exp }, SHA);
}


let verifyJWTToken = (req, res, next) => {
    let { 'x-token': token = "" } = req.headers || {};
    token = token || req.body.token;
    if (token) {
        jwt.verify(token, SHA, (err, decode) => {

            if (err) return bindRes(err, 'Unexpected token', res);

            if ('exp' in decode && decode.exp - new Date().getTime() > 0) {
                let { user_id } = decode;
                console.log(decode)
                req.user_id = user_id;
                next()
            }
            else {
                bindRes(true, 'Token expired', res);
            }
        });
    }
    else {
        bindRes(true, 'Token missing', res);
    }
}

module.exports = {
    createJWToken,
    verifyJWTToken
}