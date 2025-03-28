"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudApi = void 0;
const request_1 = require("./request");
const store_1 = require("../store/store");
const CloudApi = () => {
    const storeState = store_1.store.getState();
    const initState = storeState['initState'];
    const accessToken = storeState['loginState']['accessToken'];
    return (0, request_1.server_axios)({
        apiUrl: process.env.REACT_APP_ENV === 'dev' ? '/CLOUD' : process.env.REACT_APP_CLOUD,
        commonParams: Object.assign(Object.assign({}, initState), { accessToken, timestamp: new Date().getTime() })
    });
};
exports.CloudApi = CloudApi;
