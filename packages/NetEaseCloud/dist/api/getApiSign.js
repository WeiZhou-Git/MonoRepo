"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsa256Sign = void 0;
const jsrsasign_1 = require("jsrsasign");
/**
 * 生成 RSA SHA-256 签名
 */
const rsa256Sign = (content, privateKey, charset = 'utf8') => {
    try {
        const sig = new jsrsasign_1.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
        sig.init(privateKey);
        sig.updateString(content);
        const signature = sig.sign();
        // console.log("生成的签名:", hextob64u(signature));
        return (0, jsrsasign_1.hextob64u)(signature);
    }
    catch (err) {
        throw new Error(`RSA content = ${content}; charset = ${charset}`);
    }
};
exports.rsa256Sign = rsa256Sign;
