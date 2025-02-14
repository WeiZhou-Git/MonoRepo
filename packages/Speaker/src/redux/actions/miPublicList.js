import { SET_HISTROY_LIST, SET_COLLECT_LIST } from '../reducers/miPublicList.js';

// 获取全部流派类型
export const setHistroyList = data => ({
	type: SET_HISTROY_LIST,
	data: data
});

export const setCollectList = data => ({
	type: SET_COLLECT_LIST,
	data: data
})

