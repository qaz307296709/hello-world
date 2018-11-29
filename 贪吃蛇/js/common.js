/**
 * 获取指定格式的日期
 * @param dt 日期的对象
 * @returns {string} 返回的类型
 */
function getDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var secound = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    monute = minute < 10 ? "0" + minute : minute;
    secound = secound < 10 ? "0" + secound : secound;
    return year + "年" + month + "月" + date + "日" + hour + ":" + minute + ":" + secound;
}

/**
 * 根据ID获取元素
 * @param id
 * @returns {HTMLElement | null}
 */
function my$(id) {
    return document.getElementById(id);
}

/**
 *
 * @param element
 * @param text
 */
function setInnerText(element, text) {
    if (typeof element.innerText == "undefined") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getInnerText(element) {

    if (typeof element.innerText == "undefined") {
        return element.textContent;
    } else {
        return element.innerText;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getFirstELement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getLastELement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.type != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 *
 * @param element
 * @param type
 * @param fn
 */
function addEventListener(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

/**
 *
 * @param element
 * @param type
 * @param fnName
 */
//解绑事件的兼容
//为任意的一个元素,解绑对应的事件
function removeEventListener(element, type, fnName) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fnName, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fnName);
    } else {
        element["on" + type] = null;
    }
}


/**
 *
 * @param element
 * @param targetLocation
 */
function yunsu(element, targetLocation) {
    clearInterval(element.timeId);
    // 获取当前位置
    var current = my$("dv").offsetLeft;
    //设置定时器
    my$("dv").timeId = setInterval(function () {
        //设置每次走的距离
        var step = 10;
        step = current < targetLocation ? step : -step;
        current += step;
        if (Math.abs(targetLocation - current) >= Math.abs(step)) {
            my$("dv").style.left = current + "px";
        } else {
            clearInterval(my$("dv").timeId);
            my$("dv").style.left = targetLocation + "px";
        }
    }, 20);
}

//获取任一元素的任一属性的值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}

//变速定时器
function animate(element, json, fn) {
    //清理计时器
    clearInterval(element.timeId);
    //设置定时器
    element.timeId = setInterval(function () {
        var flag = true;
        //遍历json对象中的数据
        for (var attr in json) {
            //判断属性是否为透明属性
            if (attr == "opacity") {
                //获取元素当前透明度
                var current = getStyle(element, attr) * 100;//乘100方便计算
                //目标透明度
                var target = json[attr] * 100;
                //设置每次的变化的数值
                var step = (target - current) / 10;
                //判断step行走方向
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {//判断是不是zindex属性
                element.style[attr] = json[attr];
            } else {
                //获取元素当前位置
                var current = parseInt(getStyle(element, attr));//返回字符串类型需要转数字
                //目标位置
                var target = json[attr];
                //设置每次的步数
                var step = (target - current) / 10;
                //判断step行走方向
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            //判断有没有达到
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}

/**
 *
 * @returns {{left: number, top: number}}
 */
function getScroll(){
    return{
        left: window.pageXOffset ||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top: window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}


