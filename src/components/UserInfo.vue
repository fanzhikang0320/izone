<template>
  <div class="userInfo-wrapper">
      <div class="userInfo-area">
            <img :src="'/api/getImgData?path=' + userInfo.imgpath" :title="userInfo.account" class="head-img">
            <p class="nickname" :title="userInfo.nickname">{{userInfo.nickname}}</p>
            <div class="probobly-info">
                <div class="user-age">
                    <i class="el-icon-male male-icon" v-if="userInfo.sex == '1'"></i>
                    <i class="el-icon-female female-icon" v-else-if="userInfo.sex == '0'"></i>
                    {{getAge(userInfo.birthday)}}岁
                </div>
                <i class="el-icon-minus minus-icon"></i>
                <div>
                    <i class="el-icon-location-outline"></i>
                    {{userInfo.region}}·{{userInfo.city}}
                </div>
            </div>
            <div class="hurdle">
                <router-link :to="{name: 'myfocus'}" tag="div"><i class="el-icon-star-off"></i>我的关注</router-link>
                <div @click="logOut"><i class="el-icon-delete"></i>退出账号</div>
            </div>
        </div>
  </div>
</template>

<script>
var sessionStorageUtils = require('../utils/sessionStorage.js');


export default {
    data () {
        return {
            userInfo: {},
            locationAccount: '' //获取本地缓存session中的账号
        }
    },
    methods: {
        //获取用户信息
        async getUserInfo() {
            var res = await this.axios.get('/api/getUserInfo',{params: {account: this.locationAccount}});
            if (res.data.type == 'success') {
                this.userInfo = res.data.userInfoData[0];
                this.$store.commit('changeLocationUserInfo',this.userInfo);
            }
            
        },
        getAge(time) {
            var nowDate = new Date();
            var oldDate = new Date(time);
            var nowMonth = nowDate.getMonth() + 1;
            var oldMonth = oldDate.getMonth() + 1;
            var month = nowMonth - oldMonth;
            var newDay = nowDate.getDay() + 1;
            var oldDay = oldDate.getDay() + 1;
            var day = newDay - oldDay;
            var year = nowDate.getFullYear() - oldDate.getFullYear() - 1;
            var age = 0;
            //不满一年的按月份和天数算够不够
            if (year <= 0) {
               age = 0
            } else if (year > 0) {
                age = year;
            }
            //当月份已经过了出生的月份年龄+1
            if (month > 0) {
               age = age + 1;
            } else if (month == 0) {
                //还在当月判断天数是不是够了
                if (day >= 0) {
                    // 年龄+1
                   age = age + 1;
                }
            }
            return age
        },
        //退出登录，清除sessionStorage
        logOut() {
            sessionStorageUtils.deleteSessionStorage('account');
            this.$router.push('/login')
        }
    },
    created() {
        this.locationAccount = sessionStorageUtils.getSessionStorage('account');
        this.getUserInfo();
        
    }

}
</script>

<style scoped>
.userInfo-wrapper {
    float: right;
    background-color: #fef3dfc7;
    border: 1px solid #fdcfa1;
    border-radius: 4px;
}
.userInfo-area{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 260px;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 15px;
}
.head-img {
    width: 80px;
    height: 80px;
    border: 1px solid #D1D4DB;
    border-radius: 8px;
}
.nickname {
    padding: 0;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin: 15px 0;
    font-size: 18px;
    font-weight: bold;
}
.button {
    margin: 8px 0;
}
.probobly-info {
    width: 180px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px 0;
    color: #827e8c;
}
.probobly-info .minus-icon {
    transform: rotateZ(90deg);
    font-weight: bold;
    font-size: 16px;
}
.probobly-info .male-icon {
    color: #409eff;
}
.probobly-info .female-icon {
    color: #f728c3;
}
.hurdle {
    width: 250px;
    color: #f99e70;
}
.hurdle div {
    font-size: 15px;
    font-weight: bold;
    float: left;
    width: 100px;
    margin: 8px 10px;
    text-align: center;
    cursor: pointer;
}
.hurdle div:hover {
    color: #f36f29;
}
</style>