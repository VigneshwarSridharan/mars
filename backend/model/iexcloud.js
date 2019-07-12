let http = require('axios');
let parallel = require('async/parallel');
let redis = require("redis");

let client = redis.createClient();

const parseRes = res => res.data;

const API_ROOT = 'https://cloud.iexapis.com/stable';

const prod = true;

const request = {
    get: (url, options = {}) => http.get(`${API_ROOT}${url}`, {
        params: {
            token: prod ? 'pk_c33e4f9b0c60465cb28c3345a2b060ad' : 'Tpk_c95c18c2c06b49caad06ac9f8f1fa4c2',
            ...options
        }
    }).then(parseRes)
}

const getQuote = (symbol, callback) => {

    let getResponse = () => request.get(`/stock/${symbol}/quote`).then(res => {
        let { symbol = "", open = "", high = "", low = "", latestPrice = "", latestVolume = "", lastTradeTime = "", previousClose = "", change = "", changePercent = "" } = res;
        let result = {
            symbol: symbol,
            open: open ? open.toString() : open,
            high: high ? high.toString() : high,
            low: low ? low.toString() : low,
            price: latestPrice ? latestPrice.toString() : latestPrice,
            volume: latestVolume ? latestVolume.toString() : latestVolume,
            latestTradingDay: lastTradeTime,
            previousClose: previousClose ? previousClose.toString() : previousClose,
            change: change ? change.toString() : change,
            changePercent: (changePercent * 100).toString() + '%',
            source: 'api'
        };

        callback(null, result);
        client.set(`quote-symbol-${symbol}`, JSON.stringify(result), 'EX', 10);
    }).catch(err => callback(err))

    client.get(`quote-symbol-${symbol}`, (err, value) => {
        if (err) return console.log(err);

        if (value) {
            value = JSON.parse(value);
            callback(err, { ...value, source: 'redis' })
        }
        else {
            getResponse();
        }
    })

}


module.exports = {
    getQuote
}