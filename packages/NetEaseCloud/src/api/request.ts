import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { objKeySort } from '@samsung-speaker/utils';
import { rsa256Sign } from './getApiSign';

interface CommonParams {
	apiUrl: any;
	commonParams: Record<string, any>;
}

interface RequestOptions {
	type: string;
	end: boolean;
	from?: string;
}

export const server_axios = ({ apiUrl, commonParams }: CommonParams) => {
	let headers = {
		'Content-Type': 'application/json;charset=UTF-8',
	};

	const service: AxiosInstance = axios.create({
		baseURL: apiUrl,
		timeout: 20000,
		headers,
	});

	service.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			return config;
		},
		(error: any) => {
			console.log(error);
			return Promise.reject(error);
		}
	);

	service.interceptors.response.use(
		(response: AxiosResponse) => {
			if (response.status === 200) {
				return response.data;
			}
		},
		(error: any) => {
			return Promise.reject(error);
		}
	);

	function apiAxios(method: string, url: string, params: Record<string, any> = {}, isLoading: RequestOptions = { type: 'empty', end: true }) {
		params = { 
			...commonParams,
			bizContent: JSON.stringify(params) // 业务参数
		 };


		// 签名部分
		let privateKey = params.privateKey; 
		if(privateKey) {
			delete params.privateKey;
			let signStr = objKeySort(params, 'str');
			params.sign = rsa256Sign(signStr, privateKey);
		}
		// -------

		let addUrl = '';
		if (method === 'POST' && url.indexOf('http') < 0) {
			switch (isLoading.from) {
				case 'fromData':
					let formData = new FormData();
					if (params.secret) delete params.secret;
					for (let key in params) {
						formData.append(key, params[key]);
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

		return new Promise((resolve, reject) => {
			service({
				method: method as any,
				url: url + addUrl,
				data: method === 'POST' || method === 'PUT' ? params : null,
				params: method === 'GET' || method === 'DELETE' ? params : null,
			})
				.then((res: any) => {
					if(res.code === 200) {
						resolve(res.data);
					} else {
						throw new Error(res.code)
					}
				})
				.catch((error: any) => {
					window.console.log('接口网络错误', error, error.response);
					if (error.response) {
						console.error(error.response.status);
						reject(error.response.status);
					} else {
						window.console.log('Error', error.message);
						reject(error);
					}
				});
		});
	}

	return {
		get: function (url: string, params: Record<string, any>, isLoading: RequestOptions) {
			return apiAxios('GET', url, params, isLoading);
		},
		post: function (url: string, params: Record<string, any>, isLoading: RequestOptions) {
			return apiAxios('POST', url, params, isLoading);
		},
		put: function (url: string, params: Record<string, any>, isLoading: RequestOptions) {
			return apiAxios('PUT', url, params, isLoading);
		},
		delete: function (url: string, params: Record<string, any>, isLoading: RequestOptions) {
			return apiAxios('DELETE', url, params, isLoading);
		}
	};
}
