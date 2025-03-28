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
exports.Player = void 0;
const check_1 = require("../../models/player/check");
const songResource_1 = require("../loader/songResource");
const utils_1 = require("../../utils/utils");
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
class Player {
    constructor(params) {
        this.params = params;
        this.container = document.getElementById(params.container);
        this.audioDom = document.createElement('audio');
        this.audioDom.addEventListener('ended', this.__ended.bind(this));
        this.PlayerState = {
            level: "",
            currSongId: "",
            songList: [],
            orderSongList: [],
            playMode: check_1.PlayModes['SEQUENCE'],
        };
    }
    /**
     * 播放器初始化
     */
    init() {
        this.audioDom.autoplay = true;
        this.audioDom.style.display = 'none';
        this.container.appendChild(this.audioDom);
    }
    __ended() {
        console.log('_end');
        this.nextSong();
    }
    /**
     * 私有方法
     * 更新playerState 状态
     * @param newState 新state更新
     */
    setState(newState) {
        this.PlayerState = Object.assign(Object.assign({}, this.PlayerState), newState);
    }
    /**
     * 歌曲列表 顺序调整
     * @param songList 歌曲列表
     * @param playMode 顺序模式
     * @returns 调整后的列表
     */
    songListOrder(songList, playMode) {
        try {
            const { currSongId } = this.PlayerState;
            let copyList = JSON.parse(JSON.stringify(songList));
            if (!currSongId)
                return copyList;
            switch (playMode) {
                case check_1.PlayModes['SHUFFLE']: // 随机
                    console.info("## 随机播放 ##");
                    return (0, utils_1.shuffleArray)(copyList);
                case check_1.PlayModes['REPEAT']:
                    console.info("## 循环播放 ##");
                    return copyList.filter((ele) => ele.id === currSongId);
                case check_1.PlayModes['SEQUENCE']:
                default:
                    console.info("## 顺序播放 ##");
                    return copyList;
            }
        }
        catch (error) {
        }
    }
    /**
    * 播放 歌曲列表
    * @param param
    */
    playSongList(_a) {
        return __awaiter(this, arguments, void 0, function* ({ songList, playMode = this.PlayerState.playMode }) {
            try {
                if (songList && songList.length) {
                    let orderSongList = this.songListOrder(songList, playMode);
                    const firstSongId = orderSongList[0]['id'];
                    this.setState({ songList, orderSongList, currSongId: firstSongId });
                    this.playSongItem(firstSongId);
                }
            }
            catch (error) {
                console.error('Error in playSongList:', error);
            }
        });
    }
    /**
     * 播放单曲
     * @param songId 单曲ID
     */
    playSongItem(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songDetail = yield songResource_1.songResource.getSongDetail(songId);
                // const songQuality = await songResource.changeMusicQuality(songId)
                const { playUrl, vipFlag, name, level } = songDetail;
                if (vipFlag) {
                    this.pause();
                    // 这里暂时没有VIP 先跳过
                    this.nextSong();
                    console.log('*** 当前歌曲需要VIP ***');
                }
                else {
                    this.audioDom.src = playUrl;
                    this.play();
                    this.setState({ level: level });
                    console.log(`*** 正在播放 ${name}  ***`);
                }
            }
            catch (error) {
            }
        });
    }
    /**
     * 切换歌曲
     * @param direction 1 表示下一首, -1 表示上一首
     * @returns 切换后的歌曲 SongItem
     */
    changeSong(direction) {
        try {
            const { songList, orderSongList = [], currSongId } = this.PlayerState;
            if (!songList || songList.length === 0 || !orderSongList || orderSongList.length === 0)
                return;
            if (!currSongId)
                return;
            let newIndex = orderSongList.findIndex(song => song.id === currSongId);
            newIndex = (newIndex + direction + orderSongList.length) % orderSongList.length;
            const newSongId = orderSongList[newIndex]['id'];
            this.setState({ currSongId: newSongId });
            this.playSongItem(newSongId);
            console.log(newIndex);
            return orderSongList[newIndex];
        }
        catch (error) {
            console.error('Error in changeSong:', error);
        }
    }
    /**
    * 歌曲列表 搜索
    * @param action
    * @param logMessage
    */
    handlePlay(action, logMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield action();
                this.playSongList({
                    songList: result,
                    playMode: check_1.PlayModes['SEQUENCE'] // 播放列表默认（顺序播放）
                });
                console.log(result);
            }
            catch (error) {
                console.error(`Error in ${logMessage}:`, error);
            }
        });
    }
    playSong(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playSong(params), 'playSong');
        });
    }
    playSinger(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playSinger(params), 'playSinger');
        });
    }
    playSingerSong(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playSingerSong(params), 'playSingerSong');
        });
    }
    playSingerTypeSong(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playSingerTypeSong(params), 'playSingerTypeSong');
        });
    }
    playType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playType(params), 'playType');
        });
    }
    playRanking(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playRanking(params), 'playRanking');
        });
    }
    playLanguage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handlePlay(() => songResource_1.songResource.playLanguage(params), 'playLanguage');
        });
    }
    /**
     * 切换 歌曲音质
     * @param params 要切换音质参数
     * @returns
     */
    changeQuality(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currSongId, level } = this.PlayerState;
                if (!currSongId)
                    return;
                if (params.level === level) {
                    console.log(`## 当前已是${level}音质 ##`);
                    return;
                }
                const currentTime = this.audioDom.currentTime;
                const songUrl = yield songResource_1.songResource.getSongPlayUrl({ songId: this.PlayerState.currSongId, level: params.level });
                if (songUrl) {
                    this.audioDom.src = songUrl;
                    this.setState({ level: params.level });
                    this.audioDom.currentTime = currentTime;
                    this.play();
                }
            }
            catch (error) {
            }
        });
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
    playMode(params) {
        try {
            const songList = this.PlayerState.songList;
            const { mode } = params;
            if (!songList || songList.length === 0)
                return;
            if (mode === this.PlayerState.playMode)
                return;
            this.setState({
                playMode: mode,
                orderSongList: this.songListOrder(songList, mode)
            });
        }
        catch (error) {
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
exports.Player = Player;
