import http from 'axios';

const parseRes = res => res.data;

const API_ROOT = 'http://localhost:8100';

const getHeaders = () => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let token = localStorage.token;
    if(token) {
        config["headers"]["x-token"] = token;
    }
    return config;
}

const request = {
    get: (url) => http.get(url, getHeaders()).then(parseRes),
    post: (url, data) => http.post(url, data, getHeaders()).then(parseRes),
    put: (url, data) => http.put(url, data, getHeaders()).then(parseRes),
    delete: (url) => http.delete(url, getHeaders()).then(parseRes),
}

const User = {
    login: (username, password) => request.post(`${API_ROOT}/users/login`, { username, password })
}

const Railway = {
    all: () => request.post(`${API_ROOT}/railway`),
}

const Trading = {
    getSymbols: query => request.post(`${API_ROOT}/trading/search`,{query}),
    getSymbolBasicInfo: symbol => request.post(`${API_ROOT}/trading/symbolBasicInfo`,{symbol})
}

export {
    User,
    Railway,
    Trading
}