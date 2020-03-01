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
                <router-link to="/login" tag="div" @click="logOut"><i class="el-icon-delete"></i>退出账号</router-link>
            </div>
        </div>
  </div>
</template>

<script>
var cookieUtil = require('../utils/cookie.js');
export default {
    data () {
        return {
            userInfo: {},
            locationAccount: cookieUtil.getCookie('account') //获取本地登录cookie账号
        }
    },
    methods: {
        //获取用户信息
        async getUserInfo() {
            var res = await this.axios.get('/api/getUserInfo',{params: {account: this.locationAccount}});
            if (res.data.type == 'success') {
                this.userInfo = res.data.userInfoData[0];
                // this.userInfo.headImgList = ['/api/getImgData?path=' + this.userInfo.imgpath];
                this.$store.commit('changeLocationUserInfo',this.userInfo);
                window.console.log(this.userInfo);
            }
            
        },
        getAge(time) {
            var date = new Date(time);
            var birthdayYear = date.getFullYear();
            var nowYear = new Date().getFullYear();
            return nowYear - birthdayYear;

        },
        //退出登录，清除cookie
        logOut() {
            cookieUtil.deleteCookie('account')
        }
    },
    created() {
        this.getUserInfo();
    }

}
</script>

<style scoped>
.userInfo-wrapper {
    float: right;
    background-color: rgb(250,248,255);
    border: 1px solid #d2c8e6;
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
    color: #409eff;
}
</style>