var http = require('axios')

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


module.exports = {
    search: (keywords, callback) => {
        let req = {
            function: 'SYMBOL_SEARCH',
            keywords
        }
        request.get(req).then(res => {
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
    }
}