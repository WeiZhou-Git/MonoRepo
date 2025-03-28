import { server_axios } from './request'
import { store } from '../store/store';


export const CloudApi = () => {
	const storeState = store.getState();
	const initState = storeState['initState'];
	const accessToken = storeState['loginState']['accessToken']

	return server_axios({
		apiUrl: process.env.REACT_APP_ENV === 'dev' ? '/CLOUD' : process.env.REACT_APP_CLOUD,
		commonParams: {
			...initState,
			accessToken,
			timestamp: new Date().getTime()
		}
	})
}




