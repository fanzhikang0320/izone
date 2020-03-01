<template>
    <div class="weather-wrapper">
        <div><i class="el-icon-location-information location-icon"></i>{{city}}：</div>
        <img :src="weather.src" :alt="weather.cond_txt" :title="weather.cond_txt" class="weatherIcon">
        <div>{{weather.tmp}}℃</div>
        <div>风力：{{weather.wind_sc}}级</div>

    </div>
</template>

<script>
var utils = require('../utils/index.js');
var session = require('../utils/sessionStorage.js');
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
        async getWeather(that) {
            //获取ip地址
            try {
                var ip = await utils.getClientIp(that);
                //获取当前用户地址
                var location = await utils.getLocation(that,ip); 
                var city = location.city;
                var weather = await utils.getLocationWeather(that,city);
                weather.src = require(`@/assets/weatherIcon/${weather.cond_code}.png`);
                this.weather = weather;
                this.city = city;
                session.setSessionStorage('region',location.region);
                session.setSessionStorage('city',location.city);
            } catch(err) {
                //获取位置失败，采用默认位置
                session.setSessionStorage('region','中国');
                session.setSessionStorage('city','未知');
            }
        }
    },
    created () {
       this.getWeather(this); //获取天气
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