// import CryptoJS from "crypto-js";
import { KJUR, hextob64u } from 'jsrsasign';
import { delCode } from '@samsung-speaker/utils';

const tempMac = window.webapis ? window.webapis.network.getMac() : 'fc:92:54:08:65:06';
export let mac = tempMac || 'fc:92:54:08:65:06';
export let deviceid = delCode(mac, ":");

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
-----END PRIVATE KEY-----`

/**
 * 生成 RSA SHA-256 签名
 */
export const rsa256Sign = function (content, charset = 'utf8') {
	try {
		const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
		sig.init(privateKey);
		sig.updateString(content);
		const signature = sig.sign();
		console.log("生成的签名:", hextob64u(signature));
		return hextob64u(signature)
	} catch (err) {
		throw new Error(`RSA content = ${content}; charset = ${charset}`, err);
	}
}

