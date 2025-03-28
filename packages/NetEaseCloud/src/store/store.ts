import { InitState } from '../models/state/state'

/**
 * SDK 公共状态
 */
export class Store {
    private static instance: Store;
    private state: any = {
        initState: {
            
        },
        loginState: {
            accessToken : '',
            refreshToken: ''
        }
    };

    private constructor() {} // 阻止外部实例化

    public static getInstance(): Store {
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
    setState<T extends keyof InitState>(key: T, value: Partial<InitState[T]>) {
        this.state[key] = value;
    }
    /**
     * 
     * @returns 当前状态
     */
    getState(): any {
        return this.state
    }
}


export const store = Store.getInstance();