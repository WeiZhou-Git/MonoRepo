"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMusicQurlity = exports.getAlbumList = exports.getSongPlayUrl = exports.getSongDetail = exports.voiceSearchSong = exports.searchSong = exports.anonymousLogin = void 0;
// import axiosIns from './axiosIns'
const storeRequest_1 = require("./storeRequest");
// 匿名登录
const anonymousLogin = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/oauth2/login/anonymous`, data, { type: 'empty', end: true });
exports.anonymousLogin = anonymousLogin;
// 歌曲搜索
const searchSong = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/search/song/get/v3`, data, { type: 'empty', end: true });
exports.searchSong = searchSong;
// 语音搜索
const voiceSearchSong = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/voice/assistant/multi/search`, data, { type: 'empty', end: true });
exports.voiceSearchSong = voiceSearchSong;
// 获取歌曲详情
const getSongDetail = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/song/detail/get/v2`, data, { type: 'empty', end: true });
exports.getSongDetail = getSongDetail;
// 获取歌曲播放URL
const getSongPlayUrl = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/song/playurl/get/v2`, data, { type: 'empty', end: true });
exports.getSongPlayUrl = getSongPlayUrl;
// 获取专辑列表
const getAlbumList = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/album/song/list/get/v2`, data, { type: 'empty', end: true });
exports.getAlbumList = getAlbumList;
// 获取歌曲音效 
const getMusicQurlity = (data) => (0, storeRequest_1.CloudApi)().post(`/openapi/music/basic/song/music/quality/sound/get`, data, { type: 'empty', end: true });
exports.getMusicQurlity = getMusicQurlity;
