// import axiosIns from './axiosIns'
import { cloud_api } from './manyRequest.js';


// 统计订单
export const getToplist = data => cloud_api.post(`/openapi/music/basic/oauth2/login/anonymous`, data, { type: 'empty', end: true });

// 搜索歌曲
export const searchSong = data => cloud_api.post(`/openapi/music/basic/search/song/get/v3`, data, { type: 'empty', end: true });



