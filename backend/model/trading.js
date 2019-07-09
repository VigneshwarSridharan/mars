let http = require('axios')
let parallel = require('async/parallel')
let { camelCase } = require('change-case')

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

const request = {
    get: (data) => http.get(`${API_ROOT}/query`, {
        params: {
            apikey: 'Z0P7HYJJCPMXUE9O',
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
    request.get(options).then(res => {
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
        callback(null, result)
    }).catch(err => {
        callback(err)
    })
};

const symbolBasicInfo = (symbol, callback) => {
    parallel([
        callback => {
            let options = {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '1min',
            }
            request.get(options).then(res => {
                let timeSeries = {};
                Object.keys(res['Time Series (1min)']).map(dateTime => {
                    let item = res['Time Series (1min)'][dateTime];
                    let retObj = {}
                    Object.keys(item).map(key => retObj[parseKey(key)] = item[key])
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
    })
}

const getQuote = (symbol, callback) => {
    let options = {
        function: 'GLOBAL_QUOTE',
        symbol
    }
    request.get(options).then(res => {
        let result = {};
        Object.keys(res['Global Quote']).map(key =>
            result[parseKey(key)] = res['Global Quote'][key]
        )
        callback(null, result)
    }).catch(err => callback(err))
}

const Trading = {
    search,
    symbolBasicInfo,
    getQuote
}

module.exports = Trading;