import http from 'axios';
import { API_ROOT } from '../constants';

const parseRes = res => res.data;

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
    get: (url) => http.get(`${API_ROOT}${url}`, getHeaders()).then(parseRes),
    post: (url, data) => http.post(`${API_ROOT}${url}`, data, getHeaders()).then(parseRes),
    put: (url, data) => http.put(`${API_ROOT}${url}`, data, getHeaders()).then(parseRes),
    delete: (url) => http.delete(`${API_ROOT}${url}`, getHeaders()).then(parseRes),
}

const User = {
    login: (username, password) => request.post(`/users/login`, { username, password }),
    getUsers: () => request.get(`/users`)
}

const Railway = {
    all: () => request.post(`/railway`),
}

const Trading = {
    getSymbols: query => request.post(`/trading/search`,{query}),
    getSymbolBasicInfo: symbol => request.post(`/trading/symbolBasicInfo`,{symbol})
}

export {
    User,
    Railway,
    Trading
}