import axios from 'axios';
// import { Toast } from 'vant';
// import store from '@/store'
import md5 from 'js-md5';
import { getToken } from '../utils/token';
import { objKeySort } from '@samsung-speaker/utils';
import { rsa256Sign } from '../utils/getApiSign'

export const server_axios = ({ apiUrl, commonParams }) => {
	// create an axios instance
	let headers = {
		'Content-Type': 'application/json;charset=UTF-8',
	}
	const service = axios.create({
		baseURL: apiUrl,
		// baseURL: 'https://test.jinghangapps.com/jingxiaoai',
		// baseURL: '',
		// withCredentials: true, // send cookies when cross-domain requests
		timeout: 20000, // request timeout
		// responseType: 'blob'
		// headers: {
		// 	'Content-Type': 'multipart/form-data'

		// }
		headers
	});

	// request拦截器，每次发起请求都会调用这个方法
	service.interceptors.request.use(
		config => {
			// if (getUserToken()) {
			// 	config.headers.Authorization = getUserToken();
			// }

			return config;
		},
		error => {
			console.log(error); // for debug
			return Promise.reject(error);
		}
	);

	// response 拦截器
	service.interceptors.response.use(
		response => {
			if (response.status === 200) {
				return response.data;
				// if (response.data && response.data.code === 200) {
				// 	return response.data;
				// } else if (response.data && response.data.code === 403) {
				// removeToken();
				// Toast('登录信息未通过验证，请重新登录');
				// if (window.location.href.indexOf('register') > 0) return; //如果当前页是login则不再跳转
				// //跳转到登录页面，并且带着上个页面的信息，支持会跳回去
				// let redirect =
				// 	window.location.pathname + window.location.search + window.location.hash;
				// redirect = redirect.replace(process.env.BASE_URL, '/');
				// window.location.href = process.env.BASE_URL + `register?redirect=${redirect}`;
				// return response.data;
				// } else {
				// Toast('请求错误：' + response.data.code + '----' + response.data.msg);
				// return Promise.resolve(response.data);
				// return Promise.reject({})
				// }
			}
		},
		error => {
			// Toast('请求错误：' + error)
			// console.log('err:' + error); // for debug
			return Promise.reject(error);
		}
	);

	// export default service;
	function apiAxios(method, url, params = {}, isLoading = { type: 'empty', end: true }) {
		params = { ...commonParams, ...params };

		let signStr = objKeySort(params, 'str');
		params.sign = rsa256Sign(signStr);



		// 参数 处理
		let addUrl = '';
		if (method === 'POST' && url.indexOf('http') < 0) {
			// if (method === 'POST') {
			// 如果是post形式传参，也需要在url后加上签名数据
			switch (isLoading.from) {
				case 'fromData':
					let formData = new FormData();
					if (params.secret) delete params.secret;
					for (let key in params) {
						formData.append(key, params[key])
					}
					params = formData;
					break;
				default:
					let tempArr = [];
					for (let key in params) {
						tempArr.push(key + '=' + params[key]);
					}
					addUrl = tempArr.join('&');
					addUrl = addUrl.length ? '?' + addUrl : '';
					break;
			}
		}




		// 开始执行查询操作
		return new Promise((resolve, reject) => {

			service({
				method: method,
				url: url + addUrl,
				data: method === 'POST' || method === 'PUT' ? params : null, // post形式传传参
				params: method === 'GET' || method === 'DELETE' ? params : null, // get形式传参
				// headers: { ...headers, sign }
			})
				.then(function (res) {
					// console.log('返回结果了', url);

					// if (res.status === 200 || url.indexOf('http') >= 0) {
					resolve(res);
					// } else {
					// 接口错误，不是网络原因
					// Toast.error(res.message, 1500);
					// errorStatus(res.status);
					// reject(res);
					// }
				})
				.catch(function (error) {
					window.console.log('接口网络错误', error, error.response);
					//判断是否断网，如果断网就去断网页面，不做其他处理了
					if (error.response) {
						// 请求已发出，但服务器响应的状态码不在 2xx 范围内,弹出错误信息
						console.error(error.response.status);
						reject(error.response.status);
					} else {
						//超时的情况下，走这个
						window.console.log('Error', error.message);
						reject(error);
					}
				});
		});
	}

	return {
		get: function (url, params, isLoading, response) {
			return apiAxios('GET', url, params, isLoading, response);
		},
		post: function (url, params, isLoading, response) {
			return apiAxios('POST', url, params, isLoading, response);
		},
		put: function (url, params, isLoading, response) {
			return apiAxios('PUT', url, params, isLoading, response);
		},
		delete: function (url, params, isLoading, response) {
			return apiAxios('DELETE', url, params, isLoading, response);
		}
	}
}
