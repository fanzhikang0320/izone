<template>
  <div class="ranking-wrapper">
      <div class="title-box">
        <h3 class="title">人气排行榜</h3>
        <p class="line"></p>
      </div>
      <div class="ranking-row" v-for="(item,index) in hotInfo" :key="index" @click="handleInfo(item.account)">
        <div class="ranking-row-left">
            <img :src="item.headImg" class="headImg">
            <div :class="{'num': true,'firstHot': index == 0 ,'secondHot': index == 1, 'thirdHot': index == 2}">{{index + 1}}</div>
        </div>
        <p class="nickname">{{item.nickname}}</p>
        <div class="ranking-row-right">
            <img src="@/assets/img/fire.png" alt="热度" title="热度" class="hotImg">
            <p class="hotValue">{{item.hotValue > 99999 ? '99999+' : item.hotValue}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            hotInfo: [
                {
                    account: '123456777888',
                    nickname: '迪丽热Bug',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: 100000
                },
                {
                    account: '2343555666',
                    nickname: '前端小学生',
                    headiImg: require('@/assets/img/headImg.png'),
                    hotValue: 99999
                },
                {
                    account: '122435345345',
                    nickname: '杀手不太冷',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: 88888
                },
                {
                    account: '23343566',
                    nickname: 'hahahahajaj',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: '23124'
                },
                {
                    account: '123456777888',
                    nickname: '迪丽热Bug',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: 100000
                },
                {
                    account: '2343555666',
                    nickname: '前端小学生',
                    headiImg: require('@/assets/img/headImg.png'),
                    hotValue: 99999
                },
                {
                    account: '122435345345',
                    nickname: '杀手不太冷',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: 88888
                },
                {
                    account: '23343566',
                    nickname: 'hahahahajaj',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: '23124'
                },
                {
                    account: '122435345345',
                    nickname: '杀手不太冷',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: 88888
                },
                {
                    account: '23343566',
                    nickname: 'hahahahajaj',
                    headImg: require('@/assets/img/headImg.png'),
                    hotValue: '23124'
                }
            ]

        }
    },
    methods: {
        //当用户点击某个排行榜当中的人物时，跳转至他的个人信息页
        handleInfo (account) {
            window.console.log(account);
            window.console.log('点我进入我的个人主页');
        }
    }
    
}
</script>

<style scoped>
.ranking-wrapper  {
    margin: 20px auto;
    width: 280px;
    background-color:#fff;
    height: 600px; 
    overflow: hidden;
}
.ranking-wrapper .title-box {
    position: relative;
    height: 60px;
    text-align: center;
}
.ranking-wrapper .title-box .title{
    position: absolute;
    width: 100px;
    padding: 0 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    margin: 0;
    z-index: 1;
}
.ranking-wrapper .title-box .line {
    margin: 0;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: gray;
    top: 50%;
    transform: translateY(-50%);
}
.ranking-wrapper .ranking-row {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 9px;
    overflow: hidden;
    border-bottom: 1px solid rgb(204, 200, 200);
    cursor: pointer;
}
.ranking-wrapper .ranking-row .ranking-row-left {
    position: relative;
    width: 35px;
    height: 35px;
    border: 1px solid rgb(197, 177, 177);
    border-radius: 6px;
}
.ranking-wrapper .ranking-row .ranking-row-left .num {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 13px;
    color: #fff;
    font-weight: bold;
    line-height: 15px;
    text-align: center;
    width: 15px;
    height: 15px;
    background-color: rgb(142,185,245);
}
.ranking-wrapper .ranking-row .ranking-row-left .num.firstHot  {
    background-color: rgb(245,69,69);
}
.ranking-wrapper .ranking-row .ranking-row-left .num.secondHot {
    background-color: rgb(255,133,71);
}
.ranking-wrapper .ranking-row .ranking-row-left .num.thirdHot {
    background-color: rgb(255,172,56);
}

.ranking-row .ranking-row-left .headImg {
    width: 100%;
    height: 100%;
}
.ranking-row .nickname {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    margin-left: 15px;
    font-size: 14px;
}
.ranking-row .ranking-row-right {
    width: 100px;
}
.ranking-row .ranking-row-right .hotImg{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-left: 3px;
}
.ranking-row .ranking-row-right .hotValue {
    font-size: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-weight: bold;
    color: #e22323;
}
</style>