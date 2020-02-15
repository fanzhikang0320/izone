<template>
    <div class="other-wrapper">
        <div class="caseInfo-box" @click="onlineView(item.url)" v-for="(item,index) in caseInfo" :key="index">
            <div class="caseInfo-top">
                <el-image style="width:100px;height:100px;borderRadius:8px" :src="item.imgUrl" fit="cover">
                    <!-- 图片未加载占位内容 -->
                    <div slot="placeholder" style="width:100px;height:100px;display:flex;justifyContent:center;alignItems:center;fontSize:50px;color:#ccc">
                        <i class="el-icon-loading"></i>
                    </div>
                    <!-- 图片加载失败 -->
                    <div slot="error" class="image-slot" style="width:100px;height:100px;display:flex;justifyContent:center;alignItems:center;fontSize:50px;color:#ccc">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <div class="desc-box">
                    <h2 class="desc-title">{{item.title}}</h2>
                    <p class="author">作者：{{item.author}}</p>
                    <p class="time-box">上传时间：{{item.updateTime}}</p>
                    <p class="grade-box">评分：
                        <el-rate
                            v-model="item.score"
                            disabled
                            show-score
                            text-color="#ff9900"
                            allow-half
                        ></el-rate>
                    </p>
                    <div class="desc-info">描述：
                        <div :class="{'info-text': true, 'info-text-more': !item.isShowOpen}">{{item.desc}}
                            <i class="el-icon-arrow-down down-icon" @click.stop="openMore(index)" v-if="item.isShowOpen && item.isShowMore">展开</i>
                            <i class="el-icon-arrow-up up-icon" @click.stop="closeMore(index)" v-else-if="item.isShowOpen == false">收起</i>
                        </div>
                    </div>
                </div>
                <img src="@/assets/img/new.png" alt="最新" class="new" v-if="item.isNew">
            </div>
            <div class="caseInfo-bottom" @click.stop>
                <el-popover
                    placement="bottom"
                    trigger="click"
                >
                    <el-rate v-model="item.initScore" show-text allow-half @change="handleGrade(index)" @click="changeGrade(index)"></el-rate>
                    <p class="grade" slot="reference"><i class="el-icon-star-off"></i>评分</p>
                </el-popover>
                <el-popover
                    trigger="click"
                    placement="bottom"
                >
                    <img src="@/assets/img/qq.png" alt="qq" title="分享至QQ" style="width:45px;height:45px;cursor:pointer;margin: 0 5px;" @click="shareToQQ(index)">
                    <img src="@/assets/img/wechat.png" alt="微信" title="分享至微信" style="width:45px;height:45px;cursor:pointer;margin: 0 5px;" @click="shareToWechat(index)">
                    <img src="@/assets/img/sina.png" alt="新浪微博" title="分享至新浪微博" style="width:45px;height:45px;cursor:pointer;margin: 0 5px;" @click="shareToSina(index)">
                    <p class="share-box" slot="reference"><i class="el-icon-share"></i>分享</p>
                </el-popover>
                
                <p class="download-box" @click="downloadCode(item.id)"><i class="el-icon-download"></i>下载</p>
                <p class="views-box" @click="onlineView(item.url)">
                    <i class="el-icon-monitor"></i>
                    在线预览
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            caseInfo:[
                {
                    id: 100001,
                    author: '迪丽热Bug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 3,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战，剩者为王，败者为寇！加油奥利给',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: true, //决定是否显示展开按钮
                    isShowOpen: true,    //当前的状态是为展开还是收起
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: true
                },
                {
                    id: 100002,
                    author: 'dfsdfug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 4,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: false,
                    isShowOpen: true,
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: true
                },
                {
                    id: 100001,
                    author: '迪丽热Bug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 3,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战，剩者为王，败者为寇！加油奥利给',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: true, //决定是否显示展开按钮
                    isShowOpen: true,    //当前的状态是为展开还是收起
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: true
                },
                {
                    id: 100002,
                    author: 'dfsdfug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 4,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: false,
                    isShowOpen: true,
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: false
                },
                {
                    id: 100005,
                    author: '迪丽热Bug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 3,
                    desc: '这是一款紧张刺激的休闲娱乐游戏剩者为王，败者为寇！加油奥利给',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: false, //决定是否显示展开按钮
                    isShowOpen: true,    //当前的状态是为展开还是收起
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: false
                },
                {
                    id: 100001,
                    author: '迪丽热Bug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 3,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战，剩者为王，败者为寇！加油奥利给',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: true, //决定是否显示展开按钮
                    isShowOpen: true,    //当前的状态是为展开还是收起
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: true
                },
                {
                    id: 100002,
                    author: 'dfsdfug',
                    updateTime: '2020-02-11',
                    initScore: 0,
                    score: 4,
                    desc: '这是一款紧张刺激的休闲娱乐游戏，每个玩家都在为它的生存二战',//最大128个占位
                    url: 'www.baidu.com',
                    title: '贪吃蛇大作战',
                    isShowMore: false,
                    isShowOpen: true,
                    imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    isNew: true
                },
            ]
        }
    },
    computed: {
        
    },
    methods: {
        //点击评分
        handleGrade (index) {
            window.console.log(index);
            window.console.log(this.caseInfo[index].initScore);

        },
        //下载当前案例源码
        downloadCode (id) {
            window.console.log(id);
            this.message();
        },
        //在线预览,跳转指定页面
        onlineView (url) {
            window.console.log(url);
            // window.open(url,'_blank');
        },
        //分享至qq
        shareToQQ () {
           this.message();
        },
        //分享至微信
        shareToWechat () {
            this.message();
        },
        //分享至新浪微博
        shareToSina () {
            this.message();
        },
        //点击展开更多信息
        openMore (index) {
            window.console.log(index);

            this.caseInfo[index].isShowOpen = false; //切换状态
        },
        //点击收起更多信息
        closeMore (index) {
            this.caseInfo[index].isShowOpen = true;

            window.console.log(index);
        },
        message () {
            this.$message({
                showClose: true,
                message: '抱歉，该功能暂未开放'
            })
        }
        
    }
}
</script>
<style scoped>
.other-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 1024px;
    min-width: 1024px;
    background-color: #fff;
    margin: 0 auto;
}
.other-wrapper p {
    margin: 0;
    cursor: pointer;
}
.other-wrapper .caseInfo-box {
    width: 480px;
    height: 200px;
    margin: 15px;
    border: 1px solid gray;
    overflow: hidden;
    cursor: pointer;
}
.caseInfo-top {
    height: 171px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;
}
.caseInfo-top .new {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    right: 30px;
}
.caseInfo-top .desc-box {
    font-size: 13px;
    width: 320px;
    height: 170px;
    background-color: #fff;
}
.caseInfo-top .desc-box p{
    margin: 5px 0;
}
.caseInfo-top .desc-box .grade-box {
    display: flex;

}
.caseInfo-top .desc-box .desc-title {
    margin: 10px 0 7px 0;
}
.caseInfo-top .desc-box .desc-info {
    height: 60px;
    overflow: hidden;
    display: flex;
}
.caseInfo-top .desc-box .desc-info .down-icon,.up-icon {
    color: #49e;
    cursor: pointer;
    float: right;
    margin-top: 5px;
    position: absolute;
    bottom: 6px;
    right: 0;
    background-color: #fff;
}
.caseInfo-top .desc-box .desc-info .info-text {
    width: 280px;
    height: 42px;
    line-height: 20px;
    background-color: #fff;
    overflow: hidden;
    word-wrap: break-word;
    position: relative;
}
.caseInfo-top .desc-box .desc-info .info-text.info-text-more {
    height: auto;
}

.caseInfo-bottom {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ccc;
    padding: 5px 0;
    font-size: 14px;
}
.caseInfo-bottom i {
    margin-right: 2px;
}
.caseInfo-bottom .share-box:hover,.download-box:hover,.views-box:hover,.grade:hover{
    color: #49e;
}
</style>
