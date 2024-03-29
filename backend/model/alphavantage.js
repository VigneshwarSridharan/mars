let http = require('axios')
let parallel = require('async/parallel')
let { camelCase } = require('change-case')
let redis = require("redis");

let client = redis.createClient();

const parseRes = res => res.data;

const API_ROOT = 'https://www.alphavantage.co';

const getHeaders = () => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return config;
}


let clockNumber = 0;
const getApiKey = () => {
    const apikeys = [
        '9FAKJ7UHB41SPYAI',
        'Z0P7HYJJCPMXUE9O',
        'B9BEVRFH8YHPZNDS',
        'G3OPRNM2J4VZQBCJ',
        'SXA54WR15U32UYEI',
        'HOHVZXHTVUDS7KNO',
        'QURS5PMEAPWDVH8T',
        'DBKIMI3TMFK3IIPW',
        'CBKHWSSNCZBHV393',
    ];
    clockNumber = clockNumber + 1;
    let key = apikeys[clockNumber % apikeys.length]
    console.log(key);
    return key
}

const request = {
    get: (data) => http.get(`${API_ROOT}/query`, {
        params: {
            apikey: getApiKey(),
            ...data
        }
    }).then(parseRes),
    post: (url, data) => http.post(url, data, getHeaders()).then(parseRes),
    put: (url, data) => http.put(url, data, getHeaders()).then(parseRes),
    delete: (url) => http.delete(url, getHeaders()).then(parseRes),
}

const parseKey = key => camelCase(key.replace(/[^a-zA-Z ]/g, ''))

const search = (keywords, callback) => {
    let options = {
        function: 'SYMBOL_SEARCH',
        keywords
    }
    let getResponse = () => request.get(options).then(res => {
        if ('Note' in res) callback(res);
        let result = res.bestMatches.map(item => {
            return {
                symbol: item["1. symbol"],
                name: item["2. name"],
                type: item["3. type"],
                region: item["4. region"],
                marketOpen: item["5. marketOpen"],
                marketClose: item["6. marketClose"],
                timezone: item["7. timezone"],
                currency: item["8. currency"],
                matchScore: item["9. matchScore"],
            }
        })
        callback(null, result);
        client.set(`search-symbol-${keywords}`, JSON.stringify(result));
    }).catch(err => {
        callback(err)
    })

    client.get(`search-symbol-${keywords}`, (err, value) => {
        if (err) return console.log(err);

        if (value) {
            value = JSON.parse(value);
            callback(err, value)
        }
        else {
            getResponse();
        }
    })
};

const symbolBasicInfo = (symbol, callback) => {
    let getResponse = () => parallel([
        callback => {
            let options = {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '1min',
            }
            request.get(options).then(res => {
                if ('Note' in res) callback(res);
                let timeSeries = {};
                Object.keys(res['Time Series (1min)'] || {}).map(dateTime => {
                    let item = res['Time Series (1min)'][dateTime];
                    let retObj = {}
                    Object.keys(item || {}).map(key => retObj[parseKey(key)] = item[key])
                    timeSeries[dateTime] = retObj;
                })
                let result = {
                    metaData: {
                        information: res["Meta Data"]["1. Information"],
                        symbol: res["Meta Data"]["2. Symbol"],
                        lastRefreshed: res["Meta Data"]["3. Last Refreshed"],
                        interval: res["Meta Data"]["4. Interval"],
                        outputSize: res["Meta Data"]["5. Output Size"],
                        timeZone: res["Meta Data"]["6. Time Zone"],
                    },
                    timeSeries
                }
                callback(null, result);
            }).catch(err => callback(err))
        },
        callback => {
            search(symbol, (err, result) => {
                callback(err, result.find(f => f.symbol == symbol))
            })
        },
        callback => getQuote(symbol, callback)
    ], (err, parallelRes) => {
        if (err) return callback(err);
        let result = {};
        let [res1, res2 = {}, res3 = {}] = parallelRes;
        res1['metaData'] = {
            ...res1['metaData'],
            ...res2,
        }
        result = {
            ...res1,
            lastQuote: res3
        }
        callback(err, result)
        client.set(`symbolBasicInfo-${symbol}`, JSON.stringify(result));
    })

    client.get(`symbolBasicInfo-${symbol}`, (err, value) => {
        if (err) console.log(err);
        if (value) {
            value = JSON.parse(value);
            callback(err, { ...value, source: 'redis' })
        }
        else {
            getResponse();
        }
    })
}

const getQuote = (symbol, callback) => {
    let options = {
        function: 'GLOBAL_QUOTE',
        symbol
    }
    let getResponse = () => request.get(options).then(res => {
        if ('Note' in res) callback(res);
        let result = {};
        Object.keys(res['Global Quote'] || {}).map(key =>
            result[parseKey(key)] = res['Global Quote'][key]
        )
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

const Trading = {
    search,
    symbolBasicInfo,
    getQuote
}

module.exports = Trading;