"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCode = void 0;
exports.shuffleArray = shuffleArray;
exports.objKeySort = objKeySort;
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
/**
 * @desc 将对象按照key的大小升序排序
 * @param {Array} 要排序的数组
 */
function objKeySort(arys, type) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    //console.log('newkey='+newkey);
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    var newStr = ``, sortStrArr = []; // 用于输出字符串
    for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];
        //向新创建的对象中按照排好的顺序依次增加键值对
    }
    if (type == 'str') {
    }
    switch (type) {
        case 'arr':
            return newkey;
        case 'str':
            newkey.forEach((ele, i) => {
                sortStrArr.push(`${ele}=${arys[ele]}`);
            });
            return sortStrArr.join('&');
        default:
        case 'obj':
            return newObj; //返回排好序的新对象
    }
}
const delCode = (code, x) => {
    var res = code.split(x).join('');
    return res;
};
exports.delCode = delCode;
