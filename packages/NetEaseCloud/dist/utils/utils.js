"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = shuffleArray;
/**
 * 构建随机数组顺序
 * @param arr 传入数组
 * @returns 随机数组
 */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
