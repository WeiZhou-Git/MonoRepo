// import axiosIns from './axiosIns'
import { CloudApi } from './storeRequest';
import { RequestOptions } from '../models/serve/api';

// 匿名登录
export const anonymousLogin = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/oauth2/login/anonymous`, data, { type: 'empty', end: true } as RequestOptions);

// 歌曲搜索
export const searchSong = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/search/song/get/v3`, data, { type: 'empty', end: true } as RequestOptions);

// 语音搜索
export const voiceSearchSong = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/voice/assistant/multi/search`, data, { type: 'empty', end: true } as RequestOptions);


// 获取歌曲详情
export const getSongDetail = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/song/detail/get/v2`, data, { type: 'empty', end: true } as RequestOptions);

// 获取歌曲播放URL
export const getSongPlayUrl = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/song/playurl/get/v2`, data, { type: 'empty', end: true } as RequestOptions);

// 获取专辑列表
export const getAlbumList = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/album/song/list/get/v2`, data, { type: 'empty', end: true } as RequestOptions);

// 获取歌曲音效 
export const getMusicQurlity = (data: any): Promise<any> => CloudApi().post(`/openapi/music/basic/song/music/quality/sound/get`, data, { type: 'empty', end: true } as RequestOptions);







