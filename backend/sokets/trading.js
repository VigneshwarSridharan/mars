let { getInfo } = require('../utils/jwt');
let User = require('../model/user');
let Trading = require('../model/alphavantage');
let Iexcloud = require('../model/iexcloud');

module.exports = io => {

    let users = {};

    io.use((socket, next) => {
        let { token = '' } = socket.handshake.query

        if (token) {
            getInfo(token, (err, info) => {
                if (err) return next(new Error('authentication error'));

                socket.user_id = info.user_id;
                return next();
            })
        }

        return next(new Error('authentication error'));
    });

    io.on('connection', (socket) => {

        let { token = '' } = socket.handshake.query

        if (token) {
            getInfo(token, (err, info) => {
                if (err) return
                users[socket.id] = info.user_id;
            })
        }

        socket.on('quote-symbol', data => {
            if (!socket.user_id) return;

            let { symbol = '' } = data;
            let handelTime;

            let [xyz, stockExchange = "NASDAQ"] = symbol.split('.');

            handelTime = setInterval(() => {
                if (stockExchange.toLowerCase() == 'nse') {
                    Trading.getQuote(symbol, (err, result) => {
                        if (err) {
                            clearInterval(handelTime);
                            return console.log(err);
                        }
                        socket.emit('quote-symbol', result)
                    })
                }
                else {
                    Iexcloud.getQuote(symbol, (err, result) => {
                        if (err) {
                            clearInterval(handelTime);
                            return console.log(err);
                        }
                        socket.emit('quote-symbol', result);
                    })
                }
            }, 5000);

            socket.on('disconnect', reason => {
                clearInterval(handelTime)
            })

        })

        socket.on('disconnect', reason => {
            delete users[socket.id];
            console.log(`User disconnect (${socket.user_id})`)
        })

    });
}