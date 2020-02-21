
/**
 * 写入cookie
 * @param {*} key 自定义cookie属性名
 * @param {*} value cookie属性值
 * @param {*} date 要存入多长时间，单位：天
 */
function setCookie(key,value,date) {
    var days = date;
    let exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

/**
 * 读取cookie
 * @param {*} key 要读取的cookie属性名
 */
function getCookie(key) {
    var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2])
    }
    return null;
}
/**
 * 删除cookie
 * @param {*} key 要删除的cookie属性名
 */
function deleteCookie(key) {
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(key); 
    if(cval!=null) {
        document.cookie= key + "="+cval+";expires="+exp.toGMTString(); 
    }
}

module.exports = {
    setCookie: setCookie,
    getCookie: getCookie,
    deleteCookie: deleteCookie
}