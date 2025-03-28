"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.Store = void 0;
/**
 * SDK 公共状态
 */
class Store {
    constructor() {
        this.state = {
            initState: {},
            loginState: {
                accessToken: '',
                refreshToken: ''
            }
        };
    } // 阻止外部实例化
    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }
    /**
     * 修改 State
     * @param key 键
     * @param value 值
     */
    setState(key, value) {
        this.state[key] = value;
    }
    /**
     *
     * @returns 当前状态
     */
    getState() {
        return this.state;
    }
}
exports.Store = Store;
exports.store = Store.getInstance();
