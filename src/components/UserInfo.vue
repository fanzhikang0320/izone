<template>
  <div class="userInfo-wrapper">
      <div class="userInfo-area" v-if="isLogin">
            <el-image :src="userInfo.headImg" :preview-src-list="userInfo.headImgList" :title="userInfo.account" class="head-img"></el-image>
            <p class="nickname" :title="userInfo.nickname">{{userInfo.nickname}}</p>
            <div class="probobly-info">
                <div class="user-age">
                    <i class="el-icon-male male-icon" v-if="userInfo.sex == 1"></i>
                    <i class="el-icon-female female-icon" v-else-if="userInfo.sex == 0"></i>
                    21岁
                </div>
                <i class="el-icon-minus minus-icon"></i>
                <div>
                    <i class="el-icon-location-outline"></i>
                    中国·{{userInfo.city}}
                </div>
            </div>
            <div class="hurdle">
                <div><i class="el-icon-user-solid"></i>个人中心</div>
                <div><i class="el-icon-star-on"></i>我的关注</div>
                <div><i class="el-icon-chat-line-square"></i>留言板</div>
                <div><i class="el-icon-delete"></i>退出账号</div>
            </div>
        </div>
        <div class="login-area" v-else>
            <img src="@/assets/img/headImg.png" class="head-img">
            <p class="nickname">Hi！你好</p>
            <el-button round class="button" @click="gotoRegister">马上注册</el-button>
            <el-button round class="button" @click="gotoLogin">立即登录</el-button>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            isLogin: true, //判断是否登录
            userInfo: {
                account: '12345678901',
                nickname: '迪丽热Bug',
                headImg: require('@/assets/img/headImg.png'),
                headImgList: [require('@/assets/img/headImg.png')],
                sex: 0,
                age: 21,
                city: '周口'
            }
        }
    },
    methods: {
        //跳转至注册页面
        gotoRegister () {
            window.open('/register','_self');
        },
        //跳转至登录页面
        gotoLogin () {
            window.open('/login','_self');
        }
    }

}
</script>

<style scoped>
.login-area,.userInfo-area{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 280px;
    background-color: #fff;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 15px;
}
.head-img {
    width: 60px;
    height: 60px;
    border: 1px solid #000;
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
}
</style>