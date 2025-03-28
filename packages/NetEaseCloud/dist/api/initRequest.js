"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud_api = void 0;
const request_1 = require("./request");
// export const shop_axios = () => {
// 	// console.log(server_axios)
// }
const deviceInfo = {
    deviceType: 'andrwear',
    os: 'tizen',
    appVer: '0.1',
    channel: 'hm',
    model: 'kys',
    brand: 'hm',
    osVer: '8.1.0',
    clientIp: 'a301020000000000ca86822e6931d65d',
};
const deviceInfoString = JSON.stringify(deviceInfo);
console.log("Device Info String:", deviceInfoString);
exports.cloud_api = (0, request_1.server_axios)({
    apiUrl: process.env.REACT_APP_ENV === 'dev' ? '/CLOUD' : process.env.REACT_APP_CLOUD,
    commonParams: {
        appId: 'a301020000000000ca86822e6931d65d',
        signType: 'RSA_SHA256',
        timestamp: new Date().getTime(),
        appSecret: 'de7cda13059df04f8495b52229beefad',
        device: deviceInfoString
    }
});
