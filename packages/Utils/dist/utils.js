"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCode = exports.inParams = exports.isChina = exports.toVideoTime = exports.durationTimes = void 0;
exports.objKeySort = objKeySort;
exports.sleep = sleep;
exports.timeToDate = timeToDate;
exports.keepDecimal = keepDecimal;
exports.createSession = createSession;
exports.determineTextIsOverflow = determineTextIsOverflow;
exports.customRound = customRound;
exports.parseParams = parseParams;
exports.getRandom = getRandom;
const $ = require("jquery");
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
/**
 * @desc sleep函数
 * @param {Number} 书面毫秒数
 * 用法：async await / sleep(500).then(() => {})
 */
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
//根据时间戳算出时间
const durationTimes = (times) => {
    //算出天数
    let days = Math.floor(times / (24 * 3600 * 1000));
    // 算出小时数
    var leave1 = times % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    return ((days ? days + '天' : '') +
        (hours ? hours + '小时' : '') +
        (minutes ? minutes + '分钟' : '') +
        (seconds ? seconds + '秒' : ''));
};
exports.durationTimes = durationTimes;
// 时间戳 转日期
function timeToDate(time) {
    let Time_obj = new Date(time * 1000);
    return `${Time_obj.getFullYear()} / ${Time_obj.getMonth() + 1} / ${Time_obj.getDate()}`;
}
// 传数字转换成分秒显示
const toVideoTime = (time) => {
    let hour = Math.floor(time / 60 / 60);
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor((time / 60) % 60);
    if (hour) {
        return ((hour < 10 ? '0' + hour : hour) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds));
    }
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
};
exports.toVideoTime = toVideoTime;
// 字符串中是否包含中文
const isChina = (str) => {
    let index = escape(str).indexOf('%u');
    if (index < 0) {
        return false;
    }
    else {
        return true;
    }
};
exports.isChina = isChina;
// 保留2位小数（若第二位小数为0，则保留一位小数）
function keepDecimal(num) {
    var result = parseFloat(num.toString()).toFixed(2);
    if (isNaN(Number(result))) {
        return false;
    }
    const lastNum = Number(result.split('.')[1].substr(1, 1));
    if (lastNum === 0) {
        return (Number(result)).toFixed(1);
    }
    return result;
}
// 生成sesion随机数 （每次开机盒端产⽣的随机数，建议⻓度6位base64或 者base58编码）
function createSession() {
    const chars = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ];
    const sesion = chars[randomNum(0, 61)] +
        chars[randomNum(0, 61)] +
        chars[randomNum(0, 61)] +
        chars[randomNum(0, 61)] +
        chars[randomNum(0, 61)] +
        chars[randomNum(0, 61)];
    return sesion;
}
const inParams = (params, toParams = {}) => {
    for (let i in toParams) {
        if (!params[i])
            params[i] = toParams[i];
    }
    return params;
};
exports.inParams = inParams;
const delCode = (code, x) => {
    var res = code.split(x).join('');
    return res;
};
exports.delCode = delCode;
// 生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt((Math.random() * minNum + 1).toString(), 10);
        case 2:
            if (maxNum !== undefined) {
                return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
            }
            return 0;
        default:
            return 0;
    }
}
/**
 * 获取字节长度，全角字符两个单位长度，半角字符1个单位长度
 */
function getByteLen(val) {
    var len = 0;
    if (!val) {
        return len;
    }
    for (var i = 0; i < val.length; i++) {
        if (!val[i]) {
            continue;
        }
        if (val[i].match(/[^\x00-\xff]/gi) != null) {
            len += 2; // 全角
        }
        else {
            len += 1; // 半角
        }
    }
    return len;
}
function determineTextIsOverflow(cursor, index = 0) {
    if (cursor && cursor.curr) {
        let element = $(cursor.refs.current).find('.line-clamp');
        if (element.length) {
            return element[index].scrollWidth > element[index].offsetWidth;
        }
        return false;
    }
    return false;
}
// 数值真正的四舍五入（兼容负数）
function customRound(num, decimalPlaces) {
    var abs = 1;
    if (num < 0) {
        abs = -1;
    }
    num = Math.abs(num);
    let factor = Math.pow(10, decimalPlaces);
    return (Math.round(num * factor) / factor) * abs;
}
// 字符 参数 转对象参数
function parseParams(paramsString) {
    return paramsString.split("&").reduce((paramsObject, param) => {
        const [key, value] = param.split("=");
        paramsObject[key] = decodeURI(value);
        return paramsObject;
    }, {});
}
/**
 * @desc 获取随机数
 * @param {Number} 上一级的随机数，生成组合随机数
 */
function getRandom(pageRandom) {
    return (pageRandom ? pageRandom + '_' : '') + Number.parseInt((Math.random() * 10000000000).toString());
}
