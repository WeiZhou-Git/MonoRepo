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
exports.songResource = exports.SongResource = void 0;
const check_1 = require("../../models/player/check");
const api_1 = require("../../api/api");
/**
 * 歌曲资源
 *
 */
class SongResource {
    /**
     * 语音搜索
     * @param params 业务参数 mediaType = "0" (mediaType = 0 为模糊搜索)
     * @returns 歌曲列表
     */
    voiceSearchSong(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mediaName, artistName, mediaType = "0" }) {
            return yield (0, api_1.voiceSearchSong)({ mediaName, artistName, mediaType });
        });
    }
    /**
     * 获取专辑列表
     * @param params {albumId: 专辑id}
     * @returns 专辑列表
     */
    getAlbumList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield (0, api_1.getAlbumList)(params);
                return res;
            }
            catch (error) {
            }
        });
    }
    /**
     * 播放[歌名/专辑]
     * @param params 业务参数
     * @returns 歌曲/专辑列表
     */
    playSong(_a) {
        return __awaiter(this, arguments, void 0, function* ({ songName, mediaType = "1" }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: songName,
                    mediaType: mediaType // 默认搜歌曲
                });
                switch (mediaType) {
                    case '2': // 专辑
                        if (!voiceList['albums'])
                            return [];
                        let albumId = voiceList['albums'][0]['id'];
                        let albumList = yield (0, api_1.getAlbumList)({ albumId });
                        return albumList;
                    default:
                    case "1": // 歌曲
                        return voiceList['songs'] || [];
                }
            }
            catch (error) {
                console.log(error, '播放歌曲部分出错');
            }
        });
    }
    /**
     * 播放[歌手名]的歌
     * @param param 歌手名字
     * @returns 歌手歌曲列表
     */
    playSinger(_a) {
        return __awaiter(this, arguments, void 0, function* ({ singer }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: singer,
                    mediaType: '3' // 搜索歌手歌曲
                });
                return voiceList['songs'] || [];
            }
            catch (error) {
                console.log(error, '播放歌手歌曲部分出错');
            }
        });
    }
    /**
     * 播放[歌手名]的 歌/专辑
     * @param param 歌手名字
     * @returns 歌手歌曲列表
     */
    playSingerSong(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mediaName, mediaType = "1", artistName }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName,
                    mediaType,
                    artistName
                });
                switch (mediaType) {
                    case '2': // 专辑
                        if (!voiceList['albums'])
                            return [];
                        let albumId = voiceList['albums'][0]['id'];
                        let albumList = yield (0, api_1.getAlbumList)({ albumId });
                        return albumList;
                    default:
                    case "1": // 歌曲
                        return voiceList['songs'] || [];
                }
            }
            catch (error) {
                console.log(error, '播放歌手[歌曲/专辑]部分出错');
            }
        });
    }
    /**
     * 播放[歌手]的[类型]的歌曲
     * @param param { 歌手， 类型 }
     * @returns 歌手[类型]歌曲列表
     */
    playSingerTypeSong(_a) {
        return __awaiter(this, arguments, void 0, function* ({ artistName, mediaName }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: artistName + mediaName, // 泛词[类型]
                });
                return voiceList['songs'] || [];
            }
            catch (error) {
                console.log(error, '播放歌手[类型]部分出错');
            }
        });
    }
    /**
    * 播放[类型]的歌曲
    * @param param { 类型 }
    * @returns [类型]歌曲列表
    */
    playType(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mediaName }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: mediaName, // 泛词[类型]
                });
                return voiceList['songs'] || [];
            }
            catch (error) {
                console.log(error, '播放歌手[类型]部分出错');
            }
        });
    }
    /**
     * 播放[榜单]歌曲
     * @param params 榜单
     * @returns 歌曲列表
     */
    playRanking(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mediaName }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: mediaName, // 泛词[排行版]
                });
                return voiceList['songs'] || [];
            }
            catch (error) {
                console.log(error, '播放[榜单]部分出错');
            }
        });
    }
    /**
     * 播放[语种]的歌曲
     * @param params 榜单
     * @returns 歌曲列表
     */
    playLanguage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mediaName }) {
            try {
                let voiceList = yield this.voiceSearchSong({
                    mediaName: mediaName, // 泛词[语种]
                });
                return voiceList['songs'] || [];
            }
            catch (error) {
                console.log(error, '播放[语种]部分出错');
            }
        });
    }
    /**
    * 播放[我的歌单|我的收藏]的歌曲
    * （需用户ID）
    * @param params 榜单
    * @returns 歌曲列表
    */
    playMySongList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error, '播放[我的歌单|我的收藏]部分出错');
            }
        });
    }
    /**
     * 获取歌曲详情
     * @param songId 歌曲ID
     * @returns 歌曲详情
     */
    getSongDetail(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, api_1.getSongDetail)({
                    songId,
                    withUrl: true, // 下发url
                    qualityFlag: true, // 下发音质
                    // level: 'standard'
                    // extFlags: JSON.stringify({"hqScene":"standard"})
                    // bitrate: 0
                });
            }
            catch (error) {
                console.log(error, '获取歌曲详情');
            }
        });
    }
    /**
     * 获取歌曲音质
     * @param songId 歌曲ID
     * @returns 歌曲音质
     */
    changeMusicQuality(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, api_1.getMusicQurlity)({
                    songId
                });
            }
            catch (error) {
            }
        });
    }
    /**
     * 获取不同音质 歌曲url
     */
    getSongPlayUrl(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { songId, level } = params;
                let getUrlParams = { songId };
                switch (level) {
                    case check_1.MusicLevel["STANDARD"]: // 标准
                        getUrlParams['bitrate'] = 128;
                        break;
                    case check_1.MusicLevel["HIGHER"]: //较高
                        getUrlParams['bitrate'] = 192;
                        break;
                    case check_1.MusicLevel["EXHIGH"]: // 极高
                        getUrlParams['bitrate'] = 320;
                        break;
                    case check_1.MusicLevel['LOSSLESS']: // 无损
                        getUrlParams['bitrate'] = 999;
                        break;
                    case check_1.MusicLevel['HIRES']: //hires
                        getUrlParams['bitrate'] = 1999;
                        break;
                    // case 'jyEffectMusic':
                    //     getUrlParams['level'] = 'jyeffect';
                    //     break;
                    // case 'jyMasterMusic':
                    //     getUrlParams['level'] = 'jymaster';
                    // case 'skMusic':
                    //     getUrlParams['level'] = 'sky';
                    // case 'dolbyMusic':
                    // case 'vividMusic':       
                    default:
                        return;
                }
                let songItem = yield (0, api_1.getSongPlayUrl)(getUrlParams);
                if (level === songItem.level) {
                    console.log('** 切换音质至 ' + level + ' **');
                    return songItem.url;
                }
                else {
                    console.log('## 切' + level + '音质失败 ##');
                    return null;
                }
            }
            catch (error) {
            }
        });
    }
}
exports.SongResource = SongResource;
exports.songResource = new SongResource();
