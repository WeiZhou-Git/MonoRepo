// 因为cookie无法使用，所以这里准备用localstorage
import { localStore } from './storage';
import md5 from 'js-md5';
// import cookie from 'react-cookies';

const TokenKey = 'user_token';

export function getToken(token) {
	return localStore.get(token);
}

export function getUserToken() {
	// return cookie.load(TokenKey);
	return localStore.get(TokenKey);
}

export function setToken(token) {
	// return cookie.save(TokenKey, token);
	localStore.set(TokenKey, token);
}

export function removeToken() {
	// return cookie.remove(TokenKey);
	localStore.remove(TokenKey);
}
