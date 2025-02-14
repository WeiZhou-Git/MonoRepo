"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutStrByte = exports.setMemoryCursor = exports.delCode = exports.inParams = exports.isChina = exports.toVideoTime = exports.durationTimes = exports.duration = exports.formatTimeByDate = void 0;
exports.objKeySort = objKeySort;
exports.deepCopy = deepCopy;
exports.sleep = sleep;
exports.scrollLeft = scrollLeft;
exports.scrollTop = scrollTop;
exports.timeToDate = timeToDate;
exports.textScrollTop = textScrollTop;
exports.textMarquee = textMarquee;
exports.keepDecimal = keepDecimal;
exports.createSession = createSession;
exports.determineTextIsOverflow = determineTextIsOverflow;
exports.customRound = customRound;
exports.parseParams = parseParams;
exports.getRandom = getRandom;
const jquery_1 = require("jquery");
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
 * @desc 深拷贝
 * @param {Object}
 */
function deepCopy(o) {
    var n = null;
    if (o instanceof Array) {
        n = [];
        for (let i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    }
    else if (o instanceof Function) {
        n = new Function('return ' + o.toString())();
        return n;
    }
    else if (o instanceof Object) {
        n = {};
        for (let i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    }
    else {
        return o;
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
/*
 * public methods by jame.d
 * 根据（时间/时间戳格）式化时间
 * 例子：formatTimeByDate(1580641846,"yyyy-MM-dd hh:mm:ss")
 * 例子：formatTimeByDate(new Date(),"yyyy-MM-dd hh:mm:ss")
 */
const formatTimeByDate = (time, fmt) => {
    console.log('he------->', time);
    if (typeof time == 'number') {
        //如果传入的是时间戳，就将时间戳转成时间
        time = new Date(time);
    }
    else if (typeof time == 'string') {
        time = new Date(time);
    }
    // console.log('---', time);
    var o = {
        'M+': time.getMonth() + 1, //月份
        'd+': time.getDate(), //日
        'h+': time.getHours(), //小时
        'm+': time.getMinutes(), //分
        's+': time.getSeconds(), //秒
        'q+': Math.floor((time.getMonth() + 3) / 3), //季度
        S: time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
};
exports.formatTimeByDate = formatTimeByDate;
// 根据开始时间和结束时间算出时间差值   01:06:34
const duration = (start, end, type = 'day') => {
    console.log('duration -> start, end', start, end);
    let startTime = Date.parse(new Date(start.replace(/-/g, '/'))) / 1000;
    let endTime = Date.parse(new Date(end.replace(/-/g, '/'))) / 1000;
    let times = endTime - startTime;
    // console.log('111', endTime , startTime, endTime - startTime)
    if (times < 0) {
        return '';
    }
    console.log('times', times);
    let seconds = times % 60;
    let minutes = Math.floor(times / 60) % 60;
    let hours = Math.floor(times / 60 / 60) % 24;
    let days = Math.floor(times / 60 / 60 / 24) % 365;
    let years = Math.floor(times / 60 / 60 / 24 / 365);
    console.log('day', days);
    if (type === 'day') {
        return (years > 0 ? years + '年' : '') + (days > 0 ? days + '天' : '');
    }
    else {
        days = Math.floor(times / 60 / 60 / 24);
        return ((days > 0 ? days + '天 ' : '') +
            (hours < 10 ? '0' + hours : hours) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds));
    }
};
exports.duration = duration;
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
// 横向滚动动画
function scrollLeft(elementTag, animateTime = 100, cutLength = 0, el = 'curr') {
    // 有焦点才继续
    if ((0, jquery_1.default)(`${elementTag}:last .${el}`).length === 1) {
        // 停止上一次的动画
        (0, jquery_1.default)(`${elementTag}:last`).stop(true);
        // 当前焦点元素
        const childEl = (0, jquery_1.default)(`${elementTag}:last .${el}:last`);
        if (!childEl.length)
            return;
        // 当前焦点元素距离父元素左端的距离
        let left = (0, jquery_1.default)(`${elementTag}:last`).scrollLeft() + childEl.offset().left;
        if (left >= 960) {
            childEl.parents(`${elementTag}:last`).animate({
                scrollLeft: left - cutLength
            }, animateTime);
        }
        else {
            childEl.parents(`${elementTag}:last`).animate({
                scrollLeft: 0
            }, animateTime / 1.8);
        }
    }
}
// 纵向滚动动画
function scrollTop(elementTag, animateTime = 100, cutLength = 0, gapTop = 560) {
    // 有焦点才继续
    if ((0, jquery_1.default)(`${elementTag}:last .curr`).length !== 0) {
        // 停止上一次的动画
        (0, jquery_1.default)(`${elementTag}:last`).stop(true);
        // 当前焦点元素
        const childEl = (0, jquery_1.default)(`${elementTag}:last .curr:last`);
        // 退出按钮不用执行
        if (childEl.hasClass('exit-button-box'))
            return;
        // 当前焦点元素距离父元素顶端的距离
        let top = (0, jquery_1.default)(`${elementTag}:last`).scrollTop() + childEl.offset().top;
        if (top >= gapTop) {
            childEl.parents(`${elementTag}:last`).animate({
                scrollTop: top - cutLength
            }, animateTime);
        }
        else {
            childEl.parents(`${elementTag}:last`).animate({
                scrollTop: 0
            }, animateTime);
        }
    }
}
// 时间戳 转日期
function timeToDate(time) {
    let Time_obj = new Date(time * 1000);
    return `${Time_obj.getFullYear()} / ${Time_obj.getMonth() + 1} / ${Time_obj.getDate()}`;
}
// 文字上下滑动
function textScrollTop(elementTag, top, animateTime = 100) {
    (0, jquery_1.default)(`${elementTag}`).stop(true);
    (0, jquery_1.default)(`${elementTag}`).animate({
        scrollTop: (0, jquery_1.default)(`${elementTag}`).scrollTop() + top
    }, animateTime);
}
// 文字跑马灯 传入页面最外层.class
var marqueeTimer = null;
function textMarquee(elementBox) {
    // 跑马灯效果
    let marqueeDom = (0, jquery_1.default)(elementBox + ' .curr .marquee:last');
    (0, jquery_1.default)(elementBox + ' .marquee').scrollLeft(0);
    (0, jquery_1.default)(elementBox + ' .marquee').css('text-overflow', '');
    if (!marqueeDom.length)
        return;
    if (marqueeTimer)
        clearInterval(marqueeTimer);
    marqueeDom.css('text-overflow', 'initial');
    var left = marqueeDom.scrollLeft();
    marqueeTimer = setInterval(function () {
        if (left > marqueeDom[0].scrollWidth - marqueeDom[0].offsetWidth + 50) {
            left = 0;
        }
        marqueeDom.scrollLeft(left++);
        if ((0, jquery_1.default)(elementBox + ' .curr .marquee:last').length === 0) {
            if (marqueeTimer)
                clearInterval(marqueeTimer);
        }
    }, 20);
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
const setMemoryCursor = (cursorList, reference, paramName) => {
    // 先遍历一次看看有没有选中的焦点
    let current = null;
    if (reference && paramName) {
        current = cursorList.find(item => item[paramName] === reference);
    }
    else {
        current = cursorList.find(item => item.cursor.curr);
    }
    const tempObj = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    if (current) {
        // 有选中的焦点
        for (let i = 0; i < cursorList.length; i++) {
            const item = cursorList[i];
            if (item.cursor.memory.up ||
                item.cursor.memory.down ||
                item.cursor.memory.left ||
                item.cursor.memory.right) {
                // 记录一下之前的记忆焦点方向
                tempObj.up = item.cursor.memory.up;
                tempObj.down = item.cursor.memory.down;
                tempObj.left = item.cursor.memory.left;
                tempObj.right = item.cursor.memory.right;
                // 将之前的记忆焦点改为false
                item.cursor.memory.up = false;
                item.cursor.memory.down = false;
                item.cursor.memory.left = false;
                item.cursor.memory.right = false;
                break;
            }
        }
        // 设置新的记忆焦点
        current.cursor.memory.up = tempObj.up;
        current.cursor.memory.down = tempObj.down;
        current.cursor.memory.left = tempObj.left;
        current.cursor.memory.right = tempObj.right;
        return current;
    }
    return null;
};
exports.setMemoryCursor = setMemoryCursor;
/**
 * 截取制定字节长度的字符串
 * 注: 半角长度为1，全角长度为2
 * str: 字符串
 * len: 截取长度-字节数
 * return: 截取后的字符串及是否截取的标记；code=0 : 字符串未截断；code = 1 : 字符串截断
 */
const cutStrByte = (str, len, isEllipsis) => {
    // 校验参数
    if (!str || !len) {
        return '';
    }
    var code = '1', // 默认返回code值，已截断
    strLen = str.length, // 原字符串长度
    cutStr; // 截取的字符串
    // 如果字符串长度小于截取长度的一半，则返回全部字符串
    if (strLen < len / 2) {
        cutStr = str;
        code = '0';
    }
    else {
        // 遍历字符串
        var strByteCount = 0;
        for (var i = 0; i < strLen; i++) {
            // 中文字符字节加2，否则加1
            strByteCount += getByteLen(str.charAt(i));
            // i从0开始，截断时大于len，只截断到第i个；用于区分全角和半角
            if (strByteCount > len) {
                cutStr = str.substring(0, i);
                break;
            }
            else if (strByteCount == len) {
                cutStr = str.substring(0, i + 1);
                break;
            }
        }
    }
    // cutStr 为空，没有截断字符串
    if (!cutStr) {
        cutStr = str;
        code = '0';
    }
    if (isEllipsis) {
        cutStr = cutStr + '...';
    }
    return cutStr;
};
exports.cutStrByte = cutStrByte;
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
        let element = (0, jquery_1.default)(cursor.refs.current).find('.line-clamp');
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
