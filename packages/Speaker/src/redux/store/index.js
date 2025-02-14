import { createStore, combineReducers } from 'redux';
import { selectSong } from '../reducers';
import { userInfo } from '../reducers/user';
import { miPublicList } from '../reducers/miPublicList'

const store = createStore(combineReducers({ selectSong, userInfo, miPublicList }));

export default store;
