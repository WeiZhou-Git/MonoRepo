"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server_axios = void 0;
const axios_1 = require("axios");
const utils_1 = require("@samsung-speaker/utils");
const getApiSign_1 = require("./getApiSign");
const server_axios = ({ apiUrl, commonParams }) => {
    let headers = {
        'Content-Type': 'application/json;charset=UTF-8',
    };
    const service = axios_1.default.create({
        baseURL: apiUrl,
        timeout: 20000,
        headers,
    });
    service.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    });
    service.interceptors.response.use((response) => {
        if (response.status === 200) {
            return response.data;
        }
    }, (error) => {
        return Promise.reject(error);
    });
    function apiAxios(method, url, params = {}, isLoading = { type: 'empty', end: true }) {
        params = Object.assign(Object.assign({}, commonParams), { bizContent: JSON.stringify(params) // 业务参数
         });
        // 签名部分
        let privateKey = params.privateKey;
        if (privateKey) {
            delete params.privateKey;
            let signStr = (0, utils_1.objKeySort)(params, 'str');
            params.sign = (0, getApiSign_1.rsa256Sign)(signStr, privateKey);
        }
        // -------
        let addUrl = '';
        if (method === 'POST' && url.indexOf('http') < 0) {
            switch (isLoading.from) {
                case 'fromData':
                    let formData = new FormData();
                    if (params.secret)
                        delete params.secret;
                    for (let key in params) {
                        formData.append(key, params[key]);
                    }
                    params = formData;
                    break;
                default:
                    let tempArr = [];
                    for (let key in params) {
                        tempArr.push(key + '=' + params[key]);
                    }
                    addUrl = tempArr.join('&');
                    addUrl = addUrl.length ? '?' + addUrl : '';
                    break;
            }
        }
        return new Promise((resolve, reject) => {
            service({
                method: method,
                url: url + addUrl,
                data: method === 'POST' || method === 'PUT' ? params : null,
                params: method === 'GET' || method === 'DELETE' ? params : null,
            })
                .then((res) => {
                if (res.code === 200) {
                    resolve(res.data);
                }
                else {
                    throw new Error(res.code);
                }
            })
                .catch((error) => {
                window.console.log('接口网络错误', error, error.response);
                if (error.response) {
                    console.error(error.response.status);
                    reject(error.response.status);
                }
                else {
                    window.console.log('Error', error.message);
                    reject(error);
                }
            });
        });
    }
    return {
        get: function (url, params, isLoading) {
            return apiAxios('GET', url, params, isLoading);
        },
        post: function (url, params, isLoading) {
            return apiAxios('POST', url, params, isLoading);
        },
        put: function (url, params, isLoading) {
            return apiAxios('PUT', url, params, isLoading);
        },
        delete: function (url, params, isLoading) {
            return apiAxios('DELETE', url, params, isLoading);
        }
    };
};
exports.server_axios = server_axios;
