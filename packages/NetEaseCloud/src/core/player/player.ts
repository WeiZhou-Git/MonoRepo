import { 
    PlayerParams, 
    PlaySongParams, 
    PlaySingerParams, 
    PlaySingerSongParams, 
    PlaySingerTypeSongParams, 
    PlayTypeParams, 
    PlayRankingParams, 
    PlayLanguageParams,
    PlaySongListParams,
    SongList,
    PlayerState,
    ChangeQualityParams
} from "../../models/player/player";
import {
    PlayModes,
    PlayMode
} from '../../models/player/check';
import { songResource } from "../loader/songResource";
import { shuffleArray } from '../../utils/utils'

/**
 * 未完成的要求
 * 1. 播放器继续播放下一首
 * 2. 音质切换后 继续播放
 * 3. 如果是当前 音质，再次点击return掉
 * 4. 继续播放功能
 * 5. 需要根据 playFlag 来判断 歌曲是否能播放 和 toast提示词 https://q4j8fdxpoe.feishu.cn/docx/HjVYdDzz7o7ESUxgRy8cqufyn6d
 * 6. 错误码总结
 */

/**
 * 播放器类
 */
export class Player {
    private audioDom: HTMLAudioElement;
    private container: HTMLElement;
    private PlayerState: PlayerState;

    constructor(private params: PlayerParams) {
        this.container = document.getElementById(params.container) as HTMLElement;
        this.audioDom = document.createElement('audio');

		this.audioDom.addEventListener('ended', this.__ended.bind(this));



        this.PlayerState = {
            level: "",
            currSongId: "",
            songList: [],
            orderSongList: [],
            playMode: PlayModes['SEQUENCE'],
        }
    }

    /**
     * 播放器初始化
     */
    init() { 
        this.audioDom.autoplay = true;
        this.audioDom.style.display = 'none';
        this.container.appendChild(this.audioDom);
    }

    __ended () {
        console.log('_end')
        this.nextSong();
    }

    /**
     * 私有方法
     * 更新playerState 状态
     * @param newState 新state更新
     */
    private setState(newState: Partial<typeof this.PlayerState>) {
        this.PlayerState = { ...this.PlayerState, ...newState };
    }

    
    /**
     * 歌曲列表 顺序调整
     * @param songList 歌曲列表
     * @param playMode 顺序模式
     * @returns 调整后的列表
     */
    private songListOrder (songList: SongList[], playMode: PlayMode) {
        try {
            const { currSongId } = this.PlayerState;
            let copyList = JSON.parse(JSON.stringify(songList));
            if(!currSongId) return copyList;
            switch (playMode) {
                case PlayModes['SHUFFLE']: // 随机
                    console.info("## 随机播放 ##")
                    return shuffleArray(copyList);
                case PlayModes['REPEAT']: 
                    console.info("## 循环播放 ##")
                    return copyList.filter((ele: SongList) => ele.id === currSongId);
                case PlayModes['SEQUENCE']:
                default:
                    console.info("## 顺序播放 ##")
                    return copyList;
            }

        } catch (error) {

        }
    }

     /**
     * 播放 歌曲列表
     * @param param
     */
     private async playSongList({ songList, playMode = this.PlayerState.playMode }: PlaySongListParams) {
        try {
            if (songList && songList.length) {
                let orderSongList = this.songListOrder(songList, playMode);
                const firstSongId = orderSongList[0]['id'];
                this.setState({ songList, orderSongList, currSongId:firstSongId })
                this.playSongItem(firstSongId);
            }
        } catch (error) {
            console.error('Error in playSongList:', error);
        }
    }

    /**
     * 播放单曲
     * @param songId 单曲ID
     */
    private async playSongItem(songId: string) {
        try {
            const songDetail = await songResource.getSongDetail(songId);
            // const songQuality = await songResource.changeMusicQuality(songId)
            const { playUrl, vipFlag, name, level } = songDetail;
            if(vipFlag) {
                this.pause()
                
                // 这里暂时没有VIP 先跳过
                this.nextSong();

                console.log('*** 当前歌曲需要VIP ***')
            } else {
                this.audioDom.src = playUrl;
                this.play();
                this.setState({ level: level })
                console.log(`*** 正在播放 ${ name }  ***`)
            }
        } catch (error) {
            
        }
    }

    /**
     * 切换歌曲
     * @param direction 1 表示下一首, -1 表示上一首
     * @returns 切换后的歌曲 SongItem
     */
    private changeSong(direction: number) {
        try {
            const { songList, orderSongList = [], currSongId } = this.PlayerState;
            if (!songList || songList.length === 0 || !orderSongList || orderSongList.length === 0) return;
            if (!currSongId) return;
            let newIndex = orderSongList.findIndex(song => song.id === currSongId);
            newIndex = (newIndex + direction + orderSongList.length) % orderSongList.length;
            const newSongId = orderSongList[newIndex]['id'];
            this.setState({ currSongId: newSongId });
            this.playSongItem(newSongId);
            console.log(newIndex);
            return orderSongList[newIndex];
        } catch (error) {
            console.error('Error in changeSong:', error);
        }
    }

     /**
     * 歌曲列表 搜索
     * @param action 
     * @param logMessage 
     */

     private async handlePlay(action: () => Promise<any>, logMessage: string) {
        try {
            const result = await action();
            this.playSongList({
                songList: result,
                playMode: PlayModes['SEQUENCE'] // 播放列表默认（顺序播放）
            })

            console.log(result);
        } catch (error) {
            console.error(`Error in ${logMessage}:`, error);
        }
    }

    async playSong(params: PlaySongParams) {
        await this.handlePlay(() => songResource.playSong(params), 'playSong');
    }

    async playSinger(params: PlaySingerParams) {
        await this.handlePlay(() => songResource.playSinger(params), 'playSinger');
    }

    async playSingerSong(params: PlaySingerSongParams) {
        await this.handlePlay(() => songResource.playSingerSong(params), 'playSingerSong'); 
    }

    async playSingerTypeSong(params: PlaySingerTypeSongParams) {
        await this.handlePlay(() => songResource.playSingerTypeSong(params), 'playSingerTypeSong');
    }

    async playType(params: PlayTypeParams) {
        await this.handlePlay(() => songResource.playType(params), 'playType');
    }

    async playRanking(params: PlayRankingParams) {
        await this.handlePlay(() => songResource.playRanking(params), 'playRanking');
    }

    async playLanguage(params: PlayLanguageParams) {
        await this.handlePlay(() => songResource.playLanguage(params), 'playLanguage');
    }

    /**
     * 切换 歌曲音质
     * @param params 要切换音质参数
     * @returns 
     */
   async changeQuality (params: ChangeQualityParams) {
        try {
            const { currSongId, level } = this.PlayerState
            if(!currSongId) return;
            if(params.level === level) {
                console.log(`## 当前已是${ level }音质 ##`);
                return;
            }
            const currentTime = this.audioDom.currentTime;
            const songUrl = await songResource.getSongPlayUrl({ songId: this.PlayerState.currSongId, level: params.level })
            if(songUrl) {
                this.audioDom.src = songUrl;
                this.setState({ level: params.level })
                this.audioDom.currentTime = currentTime;
                this.play();
            }
        } catch (error) {
            
        }
   }


    /**
     * 下一首歌
     * @returns 下一首歌 SongItem
     */
    nextSong() {
        return this.changeSong(1);
    }

    /**
     * 上一首歌
     * @returns 上一首歌 SongItem
     */
    prevSong() {
        return this.changeSong(-1);
    }

    /**
     * 播放顺序更改 方法
     * @param params { mode: 播放模式 }
     */
    playMode (params: any) {
        try {
            const songList = this.PlayerState.songList;
            const { mode } = params;
            if(!songList || songList.length === 0 ) return;
            if(mode === this.PlayerState.playMode) return;
            
            this.setState({
                playMode: mode,
                orderSongList: this.songListOrder(songList, mode)
            })

        } catch (error) {
            
        }
    }

    /**
     * 播放
     */
    play() {
        if (this.audioDom.paused) {
            this.audioDom.play();
        }
    }

    /**
     * 暂停
     */
    pause() {
        if (!this.audioDom.paused) {
            this.audioDom.pause();
        }
    }

    /**
     * 销毁播放器
     */
    destroy() {
        this.container.removeChild(this.audioDom);
    }
}