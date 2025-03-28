"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRequest = exports.StoreRequest = void 0;
const request_1 = require("./request");
/**
 * request 公共方法
 */
class StoreRequest {
    constructor() {
        this.state = {
            requestState: null
        };
        this.CloudApi = () => {
            return (0, request_1.server_axios)({
                apiUrl: process.env.REACT_APP_ENV === 'dev' ? '/CLOUD' : process.env.REACT_APP_CLOUD,
                commonParams: Object.assign(Object.assign({}, this.state.requestState), { timestamp: new Date().getTime() })
            });
        };
    } // 阻止外部实例化
    static getInstance() {
        if (!StoreRequest.instance) {
            StoreRequest.instance = new StoreRequest();
        }
        return StoreRequest.instance;
    }
    setState(params) {
        this.state['requestState'] = params;
    }
}
exports.StoreRequest = StoreRequest;
exports.storeRequest = StoreRequest.getInstance();
