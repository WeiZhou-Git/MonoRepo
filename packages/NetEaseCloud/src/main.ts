import { store } from './store/store'
import { InitState } from "./models/state/state";
import { PlayerParams } from './models/player/player';
import { anonymousLogin } from './api/api';
import { Player } from './core/player/player';
/**
 *  网易 && 三星音响SDK 封装
 */
export class NetEaseCloud {
    private static instance:  NetEaseCloud;
    private player : Player | null = null
    

    private constructor () {

    }

    
    /**
     * 防止重复创建
     * @returns SDK 实例
     */
    static getInstance(): NetEaseCloud {
        if (!NetEaseCloud.instance) {
            NetEaseCloud.instance = new NetEaseCloud(); // 只会创建一次
        }
        return NetEaseCloud.instance;
    }

    /**
     * 初始化
     * @param params 业务参数
     */
    async init (params: InitState) {
        store.setState('initState', params)
        // console.log(params)
        // 匿名登录
        let res = await anonymousLogin({
            clientId: params.appId
        })

        const { accessToken, refreshToken } = res;
        store.setState('loginState', {
            accessToken,
            refreshToken
        })
        return store.getState();
    }


    createPlayer(params: PlayerParams) {
        if(!this.player) {
            this.player = new Player(params);
        }
        this.player?.init();

        return this.player;
    }
} 


export const NetEaseCloudSDK = NetEaseCloud.getInstance();

