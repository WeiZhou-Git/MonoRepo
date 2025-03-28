"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetEaseCloudSDK = exports.NetEaseCloud = void 0;
const store_1 = require("./store/store");
const api_1 = require("./api/api");
const player_1 = require("./core/player/player");
/**
 *  网易 && 三星音响SDK 封装
 */
class NetEaseCloud {
    constructor() {
        this.player = null;
    }
    /**
     * 防止重复创建
     * @returns SDK 实例
     */
    static getInstance() {
        if (!NetEaseCloud.instance) {
            NetEaseCloud.instance = new NetEaseCloud(); // 只会创建一次
        }
        return NetEaseCloud.instance;
    }
    /**
     * 初始化
     * @param params 业务参数
     */
    init(params) {
        return __awaiter(this, void 0, void 0, function* () {
            store_1.store.setState('initState', params);
            // console.log(params)
            // 匿名登录
            let res = yield (0, api_1.anonymousLogin)({
                clientId: params.appId
            });
            const { accessToken, refreshToken } = res;
            store_1.store.setState('loginState', {
                accessToken,
                refreshToken
            });
            return store_1.store.getState();
        });
    }
    createPlayer(params) {
        var _a;
        if (!this.player) {
            this.player = new player_1.Player(params);
        }
        (_a = this.player) === null || _a === void 0 ? void 0 : _a.init();
        return this.player;
    }
}
exports.NetEaseCloud = NetEaseCloud;
exports.NetEaseCloudSDK = NetEaseCloud.getInstance();
