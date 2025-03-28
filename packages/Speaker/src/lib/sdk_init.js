import { deviceid } from '../utils/device'
import { NetEaseCloudSDK } from '@netease-music/player-sdk'


const deviceInfo = {
	deviceType: 'andrwear',
	os: 'tizen',
	appVer: '0.1',
	channel: 'hm',
	model: 'kys',
	deviceId: deviceid,
	brand: 'hm',
	osVer: '8.1.0',
	clientIp: 'a301020000000000ca86822e6931d65d',
};

const privateKey =
	`-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGQXSQGppmKx/a
yUs/lmiseNT+rnbH3LbBtJePSSNCUhxg4vl7fFl3hSZQKrngTFeatgnMKcO6S4BA
lTFfcYt8X8+ztpmkEIy4NZCn1VqGix2jaVVNEX0DGcB+TN6AYMz2WtJcaJr/eGV9
koP+wHCNnjb0lBJ3kbxpooaK42n8TkhcIUABaAPKH9JH0EWNKY0hU/1hmuCZjmfo
ENabyzQpGkC85QCNotvQdpGD4+zfowAliQXy9rQHEJXvu8k0KAII99H1LWGfFdhZ
8QbUcE9D0kJ58yGO6uVc+JFL5kicZt9xDtUj7Iuz0+mHCLe4ES/gGdVouZSHf8IO
DFkx5FIbAgMBAAECggEAS09L9v2UDyFsjVCPvAznoDSaPFCLoGowJi7yr6RJt4S3
cPpnaMgYuDUlE6jXSOPXF1b1K8/loNvTUTUbNzVLlihTHuJLRK5gtgzq8UYziA5K
aOu3UnpFMatTmuaaUsvyr9ZaOG4oCslyTBwe9eOmHbWvDIM+7Jq4pqvtTc8LUKLE
Jbzxgv93A91L1cKi/Hg83EprJJ1BHJd4uunzCg2oVMgeTb6MLUp96NaGfDPMule+
m6xPlXNO1aNsQpeA0eKUR+DRagwYOE7zJRHMbTITBP8+kp+WpDBAh8O48woFNFii
iRD/OnKm5U+i/jJqIOApStzWdMVNMtT3hZtEuDldUQKBgQD3Q51BXYiI0ozJ9XJF
WKB+fCkpRppQs+b6qq4jd9CtVHTqI0bNo8AMDoQEgzSY6kjJPdB6LSHg0bihKmLQ
U/qC80b0KZ5oJxSQXVOH/4pgJcNS9m5Jwc6yLoT4s93E3jzvJjjsQLwiGwtLoe3x
6K8C9AVYa4kSSi3KRkc9Sp8V0wKBgQDNQpVMeWSy7MDTnqyD+7Ko21Nz9RLedlUd
5AcmJc/owMDoGSwTrMljss5fB4KOQJmUelbk6PBz+e9Ypr9JIcpn6XjfFPmo6plg
DJstNsn7bPgEz8RhTM7SYrfpBWp1oWnmu2Zye3Qaaqh36Rm9tDZbaYiaTNXU92cw
UlvQ6c89mQKBgQCUhhLBnrNSrFZRQZPgP7o3/9ChsH0lGMsXqsprF59LXj3UHlh7
UW8cTuPR6hX//Eq4Rt8hZFbDOnZSqKkuRiNl4UevhghWu5LInKZ+PGscEdLf1JKu
zzGfKf5JfZEqneuwIx9yGfhn7CK+zYemFYR6m6VSVVXCnLggllJYaKhibQKBgQCO
jtj8lS9AKbi/AWxV+mEab8HlPmgNg+gX64CfmRFuWTlhueHoBFCW4t/8Fk4xmGJS
QinJsJMYKZV3X9Bo7YQTaY8eeQXwsIc3s2mvHGdqLUOQq/B7l4npitCqka1f52yS
6ML9bgq0MjGxnn7XR6udD43lhMnasL3FTN4iGdFquQKBgDDBQcxp/MWrVGvtJ3Lq
cfAnRv2kvcO1uy9Lpj1p1FdPiDUFd/h8F44HoTI9OVJSjhp0tJTBVwz9+gBSXqJA
axD3QSlZsplxOx8KnmpdjnToQ10Zz2lM/ZYru8r3MbV1ziXUqUDd4FTXYo3U0B2c
Cb7zVbqzCyBlMzoRH2v1Yhfl
-----END PRIVATE KEY-----`;

const deviceInfoString = JSON.stringify(deviceInfo);

const CloudParams = {
	appId: 'a301020000000000ca86822e6931d65d',
	signType: 'RSA_SHA256',
	appSecret: 'de7cda13059df04f8495b52229beefad',
	device: deviceInfoString,
	privateKey
};





(function async (window) {
    let readyCallbacks = [];
	let sdkInitReady = false;
	const handlerWebSdkInitReady = function () {
		sdkInitReady = true;
		readyCallbacks.forEach(cb => cb && cb());
	};
	window.onWebSdkInitReady = function (cb) {
		console.log('[websdk init func]');
		sdkInitReady ? cb && cb() : readyCallbacks.push(cb);
	};

    (async function() {
        let sdkState = await NetEaseCloudSDK.init(CloudParams);
        handlerWebSdkInitReady();

        console.log(sdkState)
    })();
})(window)


