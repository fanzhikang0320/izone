<template>
    <div class="weather-wrapper">
        <div><i class="el-icon-location-information location-icon"></i>{{city}}：</div>
        <img :src="weather.src" :alt="weather.cond_txt" :title="weather.cond_txt" class="weatherIcon">
        <div>{{weather.tmp}}℃</div>
        <div>风力：{{weather.wind_sc}}级</div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            city: '未知',
            weather: {
                src: require('@/assets/weatherIcon/999.png'),
                cond_txt: '--',
                tmp: '--',
                wind_sc: '--'
            }
        }
    },
    methods: {
        // 获取客户端IP
        getClientIp () {
            this.axios.get('/getClientIP')
                .then((res) => {
                    // window.console.log(res.data);
                    var str = res.data.match(/\{[\S\s]+\}/)[0];
                    var clientIP = JSON.parse(str).cip;
                    this.getLocation(clientIP);
                })
                .catch((error) => {
                    window.console.log('ip',error);
                })
        },
        // 获取地理位置
        getLocation (clientIP) {
            var ip = clientIP;
            this.axios({
                url: '/getLocation',
                method: 'get',
                params: {
                    ip: ip
                }
            })
            .then((res) => {
                // window.console.log(res.data.data.city);
                var city = res.data.data.city;
                this.city = city;
                this.getLocationWeather(city);
            })
            
        },
        // //获取当前位置天气情况
        getLocationWeather (location) {
            var key = '53d55432520047dbb54f21c0ece5fe89';
            this.axios({
                url: '/getWeather',
                params: {
                    location: location,
                    key: key
                }
            })
                .then((res) => {
                    var result = res.data.HeWeather6[0].now;
                    result.src =require(`@/assets/weatherIcon/${result.cond_code}.png`);
                    this.weather = result;
                    window.console.log(result);
                })
                .catch((error) => {
                    window.console.log(error);
                })
        }


        
    },
    created () {
        this.getClientIp();
    }
}
</script>

<style scoped>
.weather-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    font-size: 14px;
    justify-content: space-around;
}
.location-icon {
    font-size: 18px;
    margin-right: 4px;
    color: #409eff;
}
.weatherIcon {
    width: 30px;
    height: 30px;
}
</style>