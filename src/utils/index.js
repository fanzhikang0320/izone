
/**
 * 获取客户端电脑ip地址
 * @param {*} that 要传入当前环境this
 */
async function getClientIp (that) {
    var clientIP = ''
    try {
        var pro = await that.axios.get('/getClientIP');
        var str = pro.data.match(/\{[\S\s]+\}/)[0];
        clientIP = JSON.parse(str).cip;
    } catch (err) {
        window.console.log(err);
        clientIP = '未知';
        return clientIP;
    }
    return clientIP;
    
}
/**
 * 获取当前客户端所在位置
 * @param {*} that 当前环境this
 * @param {*} ip 客户端电脑ip
 */
async function getLocation (that,ip) {
    var location = {};
    try {
        var pro = await that.axios({url: '/getLocation',method: 'get',params: {ip: ip}});
        location = pro.data.data
    } catch(err) {
        return location
    }
    return location;
}
/**
 * 获取当前所在城市的天气
 * @param {*} that 当前环境的this
 * @param {*} location 当前客户端所在位置
 */
async function getLocationWeather (that,location) {
    var data = {};
    try {
        var key = '53d55432520047dbb54f21c0ece5fe89';
        var pro = await that.axios({url: '/getWeather',params: {location: location,key: key}});
        data = pro.data.HeWeather6[0].now;
    } catch(err) {
        window.console.log(err);
        return data;
    }
    return data;
}

module.exports = {
   getLocation: getLocation,
   getClientIp: getClientIp,
   getLocationWeather: getLocationWeather
}