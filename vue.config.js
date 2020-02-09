module.exports = {
    devServer: {
        proxy: {
            '/getLocation': {
                target: 'http://ip.taobao.com/service/getIpInfo.php',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/getLocation': ''
                }
            },
            '/getClientIP': {
                target: 'http://pv.sohu.com/cityjson?id=utf-8',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/getClientIP': ''
                }
            },
            '/getWeather': {
                target: 'https://free-api.heweather.net/s6/weather/now',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/getWeather': ''
                }
            }
        }
    }
}