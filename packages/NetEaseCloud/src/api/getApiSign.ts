import { KJUR, hextob64u } from 'jsrsasign';
/**
 * 生成 RSA SHA-256 签名
 */
export const rsa256Sign = (content: string, privateKey: string, charset: string = 'utf8'): string => {
  try {
    const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
    sig.init(privateKey);
    sig.updateString(content);
    const signature = sig.sign();
    // console.log("生成的签名:", hextob64u(signature));
    return hextob64u(signature);
  } catch (err) {
    throw new Error(`RSA content = ${content}; charset = ${charset}`);
  }
}
