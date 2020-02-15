<template>
    <div class="dynamic-wrapper">
        <div v-for="(item,index) in dynamicInfo" :key="index">
            <!-- 说说顶部区域 -->
            <div class="dynamic-top" @click="gotoDetail(index)">
                <img :src="item.headImg" class="headImg">
                <div class="top-center">
                    <p class="nickname">{{item.nickname}}</p>
                    <div class="time-box">
                        <p class="time"><i class="el-icon-time time-icon"></i>{{item.updateTime}}</p>
                        <p class="funs-box">
                            <img src="@/assets/img/fans.png" :title="'粉丝量：' + item.fansNum" class="funs-img">
                            {{item.fansNum}}
                        </p>
                    </div>
                </div>
                <button class="attention-btn" v-if="item.isShowAttention" @click.stop="handleAttention(index)"><i class="el-icon-plus plus-icon"></i>关注</button>
                <button class="attention-btn" v-else @click.stop="handleAttention(index)"><i class="el-icon-check check-icon"></i>已关注</button>
                <i class="el-icon-close close-icon" @click.stop="removeCard(index)"></i>
                
                
            </div>
            <!-- 说说中间内容区 -->
            <div class="dynamic-middle" @click.stop>
                <div class="dynamic-text" ref="textBox">
                    <div class="text">{{item.text}}</div>
                    <p class="down-icon-box">
                        <i class="el-icon-arrow-down down-icon" v-if="isShowMore" @click="gotoDetail(index)">阅读全文</i>
                    </p>
                </div>
                <div class="dynamic-img-box" @click.stop v-if="item.imgList.length != 0">
                    <!-- 图片为一张的时候 -->
                    <el-image v-if="item.imgList.length == 1" :preview-src-list="item.imgList" :src="item.imgList[0]" style="width:240px;height:320px">
                        <!-- 图片未加载之前的占位内容 -->
                        <div slot="placeholder" style="width:240px;height:320px;font-size:50px;backgroundColor:#ccc">
                            <i class="el-icon-loading"></i>
                        </div>
                        <!-- 图片加载显示失败 -->
                        <div slot="error" style="width:240px;height:320px;font-size:50px;backgroundColor:#ccc">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <!-- 当图片显示多张的时候 -->
                    <el-image  v-else :src="img" class="dynamic-img" fit="cover" :preview-src-list="item.imgList" v-for="(img,index) in item.imgList" :key="index">
                        <!-- 图片未加载之前的占位内容 -->
                        <div slot="placeholder" style="width:155px;height:155px;font-size:50px;backgroundColor:#ccc">
                            <i class="el-icon-loading"></i>
                        </div>
                        <!-- 图片加载显示失败 -->
                        <div slot="error" style="width:155px;height:155px;font-size:50px;backgroundColor:#ccc">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <!-- 当图片的数量大于六张的时候 -->
                    <div class="img-more" v-if="item.imgList.length> 6" title="点击查看详情" @click.stop="gotoDetail(index)">
                        <i class="el-icon-plus plus-icon"></i>
                    </div>
                </div>
            </div>
            <!-- 说说底部区域 -->
            <div class="dynamic-bottom" @click.stop>
                <div class="location">
                    <i class="el-icon-map-location" title="地点" @click="handleMap"></i>
                    <p class="city">中国·{{item.city}}</p>
                </div>
                <div class="views">
                    <i class="el-icon-view" title="浏览量"></i>
                    <p class="views-num">{{item.viewsNum > 9999 ? '9999+' : item.viewsNum}}</p>
                </div>
                <div class="talks">
                    <i class="el-icon-chat-dot-round" title="评论"></i>
                    <p class="talks-num">{{item.talks > 9999 ? '9999+' : item.talks}}</p>
                </div>
                <div class="praise">
                    <img src="@/assets/img/like.png" alt="" title='取消赞' class="praise-img" @click="handlePraise(index)" v-if="item.isLike">
                    <img src="@/assets/img/nolike.png" alt="" class="praise-img" title="点赞" @click="handlePraise(index)" v-else>
                    <p class="praise-num">{{item.parise > 9999 ? '9999+' : item.parise}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dynamicInfo: [
                {
                    account: 23123434,
                    headImgSrc: require('@/assets/img/head.jpg'),
                    nickname: '迪丽热Bug',
                    updateTime: '2019-02-01 12:00',
                    fansNum: '9933',
                    text: '傅雷家书对方就立刻会计案例开始的弗兰克大力开发就拉手机壳积分吉林省接待来访就俺俩地方了卡机',
                    imgList: [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                    ],
                    city: '周口',
                    viewsNum: 112232,
                    talks: 2343,
                    parise: 3432,
                    isLike: false,
                    isShowAttention: true

                },
                {
                    account: 23123434,
                    headImgSrc: require('@/assets/img/head.jpg'),
                    nickname: 'sdfashkBug',
                    updateTime: '2019-02-01 12:00',
                    fansNum: '9933',
                    text: '傅雷家书对方就立刻会计案例开始的弗兰克大力开发就拉手机壳积分吉林省接待来访就俺俩地方了卡机',
                    imgList: [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                    ],
                    city: '周口',
                    viewsNum: 112232,
                    talks: 2343,
                    parise: 3432,
                    isLike: false,
                    isShowAttention: true

                },
                {
                    account: 23123434,
                    headImgSrc: require('@/assets/img/head.jpg'),
                    nickname: 'fdashfkhug',
                    updateTime: '2019-02-01 12:00',
                    fansNum: '9933',
                    text: '傅雷家书对方就立刻会计案例开始的弗兰克大力开发就拉手机壳积分吉林省接待来访就俺俩地方了卡机',
                    imgList: [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    ],
                    city: '周口',
                    viewsNum: 112232,
                    talks: 2343,
                    parise: 3432,
                    isLike: false,
                    isShowAttention: false

                },
                {
                    account: 23123434,
                    headImgSrc: require('@/assets/img/head.jpg'),
                    nickname: 'sdfadfasfkBug',
                    updateTime: '2019-02-01 12:00',
                    fansNum: '9933',
                    text: '傅雷家书对方就立刻会计案例开始的弗兰克大力开发就拉手机壳积分吉林省接待来访就俺俩地方了卡机',
                    imgList: [],
                    city: '周口',
                    viewsNum: 112232,
                    talks: 2343,
                    parise: 3432,
                    isLike: false,
                    isShowAttention: true

                }
            ],
            isShowMore: true,
            

        }
    },
    methods: {
        //进入该文章详情
        gotoDetail () {
            window.console.log('打开详情');
        },
        //点击×号,移除掉当前内容
        removeCard (index) {

            window.console.log(index,'移除当前文章');
            this.dynamicInfo.splice(index,1); //将当前接收到的数据进行裁剪
            this.$message({
                message: '已为您减少此类动态',
                duration: 1500
            })
        },
        // 点击关注按钮
        handleAttention (index) {
            this.dynamicInfo[index].isShowAttention = !this.dynamicInfo[index].isShowAttention;
            window.console.log(index);
            if (this.dynamicInfo.isShowAttention) {
                //取消关注
                window.console.log('取消关注');
            } else {
                //关注
                window.console.log('关注');
            }
        },
        //点赞
        handlePraise (index) {
            this.dynamicInfo[index].isLike = ! this.dynamicInfo[index].isLike;
            window.console.log(index);
            if ( this.dynamicInfo[index].isLike) {
                window.console.log('点赞');
            } else {
                window.console.log('取消赞');
            }
        },
        //点击地图图标
        handleMap () {
            this.$message({
                showClose: true,
                message: '抱歉！该功能暂未开放！',
                type: 'warning'
            })
        }
    }
}
</script>
<style scoped>
.dynamic-wrapper {
    background-color: #fff;
}
.dynamic-wrapper p {
    margin: 0;
}

/* 顶部区域css--------- */
.dynamic-top {
    background-color: rgb(70, 203, 243);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 0;
    position: relative;
    cursor: pointer;

}
.dynamic-top .headImg {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #000;
    cursor: pointer;
}
.dynamic-top .nickname {
    margin: 0;
    font-size: 16px;
}
.dynamic-top .time-box {
    display: flex;

    margin: 3px 0 0 0;
    font-size: 14px;
}
.dynamic-top .time-box .time {
    width: 140px;
    margin: 0;
}
.dynamic-top .time-box .time-icon {
    font-size: 15px;
    margin-right: 4px;
}
.dynamic-top .time-box .funs-box {
    margin: 0;
}
.dynamic-top .time-box .funs-box .funs-img {
    display: inline-block;
    width: 15px;
    height: 15px;
    transform: translateY(1px);
    margin-left: 8px;
    margin-right: 3px;
    /* border: 1px solid #000; */
    /* vertical-align: bottom; */
}
.dynamic-top .time-box .funs-box .funs-num {
    margin: 0;
    /* vertical-align: middle */
}
.dynamic-top .top-center {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
}
.dynamic-top .attention-btn {
    position: absolute;
    right: 40px;
    width: 80px;
    height: 30px;
    outline: none;
    background-color: #fff;
    border-radius: 8px;
    color: rgb(250, 214, 12);
    border: 1px solid rgb(250, 214, 12);
    cursor: pointer;
}
.dynamic-top .attention-btn i {
    margin-right: 5px;
}
.dynamic-top .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
    cursor: pointer;
}

/* 中间内容css---------- */
.dynamic-middle {
    background-color: gray;
    margin-bottom: 15px;
    /* max-height:  */
}
.dynamic-middle .dynamic-text {
    padding: 5px 15px;
    background-color: #f40;
    margin-bottom: 15px;

}
.dynamic-middle .dynamic-text .text {
    min-height: 70px;
    max-height: 118px;
    background-color: #ccc;
    font-size: 17px;
    line-height: 23px;
    overflow: hidden;
}
.dynamic-middle .dynamic-text .down-icon-box {
    text-align: right;
    font-size: 14px;
    color: rgb(29, 189, 238);
}
.dynamic-middle .dynamic-text .down-icon-box .down-icon {
    cursor: pointer;
}
.dynamic-middle .dynamic-img-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 10px;
    max-height: 322px;
    overflow: hidden;
    position: relative;
}
.dynamic-middle .dynamic-img-box .dynamic-img {
    width: 155px;
    height: 155px;
    margin: 3px 4px;
}
.dynamic-middle .dynamic-img-box .img-more {
    position: absolute;
    bottom: 3px;
    right: 16px;
    width: 155px;
    height: 155px;
    font-size: 50px;
    line-height: 155px;
    text-align: center;
    cursor: pointer;
    color: #ccc;
    background-color: rgba(34, 33, 33, 0.709);
}
/* 底部内容------ */
.dynamic-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5px 0;
    font-size: 19px;
    /* background-color: rgb(248, 66, 66); */
    border-top: 1px solid #ccc;
}
.dynamic-bottom i{
    cursor: pointer;
}
.dynamic-bottom .location {
    display: flex;
    width: 110px;
    justify-content: center;
    align-items: center;
}
.dynamic-bottom .location .city{
    font-size: 12px;
    margin-left: 5px; 
}
.dynamic-bottom .views {
    width: 110px;
    justify-content: center;
    display: flex;
    align-items: center;
}
.dynamic-bottom .views .views-num {
    font-size: 12px;
    margin-left: 5px;
}
.dynamic-bottom .talks {
    justify-content: center;
    width: 110px;
    display: flex;
    align-items: center;
}
.dynamic-bottom .talks .talks-num {
    font-size: 12px;
    margin-left: 5px;
}
.dynamic-bottom .praise {
    width: 110px;
    justify-content: center;
    display: flex;
    align-items: center;
}
.dynamic-bottom .praise .praise-img {
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    /* background-color: #fff; */
}
.dynamic-bottom .praise .praise-num {
    font-size: 12px;
    margin-left: 5px;
}
</style>


