export const SET_HISTROY_LIST = 'SET_HISTROY_LIST';
export const SET_COLLECT_LIST = 'SET_COLLECT_LIST';

// 全部流派数据
export const miPublicList = (state = { histroyList: [], collectList: [] }, action) => {
	switch (action.type) {
		case SET_HISTROY_LIST:
			state.histroyList = action.data
			return state;
		case SET_COLLECT_LIST:
			state.collectList = action.data
			return state;
		default:
			return state;
	}
};