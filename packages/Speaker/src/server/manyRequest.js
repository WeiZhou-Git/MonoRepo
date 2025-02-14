import { server_axios } from './request.js'
import { deviceid } from '../utils/getApiSign'

// export const shop_axios = () => {
// 	// console.log(server_axios)
// }

const deviceInfo = {
	deviceType: 'andrwear',
	os: 'andrwear',
	appVer: '0.1',
	channel: 'hm',
	model: 'kys',
	deviceId: deviceid,
	brand: 'hm',
	osVer: '8.1.0',
	clientIp: 'a301020000000000ca86822e6931d65d',

  };

const deviceInfoString = JSON.stringify(deviceInfo);
console.log("Device Info String:", deviceInfoString);

export const cloud_api = server_axios({
	apiUrl: process.env.REACT_APP_ENV === 'dev' ? '/CLOUD' : process.env.REACT_APP_CLOUD,
	commonParams: {
		appId: 'a301020000000000ca86822e6931d65d',
		appSecret: 'de7cda13059df04f8495b52229beefad',
		signType: 'RSA_SHA256',
		device: deviceInfoString,
		timestamp: new Date().getTime(),
		// accessToken: "y8f3b107ed962c79ade975991c3cde622c77459eb28d2b14af"
	}
})



