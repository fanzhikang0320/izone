<template>
    <div class="dynamic-wrapper">
        <!-- 说说顶部区域 -->
        <div class="dynamic-top" @click="gotoDetail">
            <img src="@/assets/img/headImg.png" class="headImg">
            <div class="top-center">
                <p class="nickname">迪丽热Bug</p>
                <div class="time-box">
                    <p class="time"><i class="el-icon-time time-icon"></i>2019-02-01 12:00</p>
                    <p class="funs-box">
                        <img src="@/assets/img/fans.png" title="粉丝量：9999" class="funs-img">9999
                    </p>
                </div>
            </div>
            <button class="attention-btn" v-if="isShowAttention" @click.stop="handleAttention"><i class="el-icon-plus plus-icon"></i>关注</button>
            <button class="attention-btn" v-else @click.stop="handleAttention"><i class="el-icon-check check-icon"></i>已关注</button>
            <div class="">

            </div>
            <i class="el-icon-close close-icon" @click.stop="removeCard"></i>
            
            
        </div>
        <!-- 说说中间内容区 -->
        <div class="dynamic-middle"></div>
        <!-- 说说底部区域 -->
        <div class="dynamic-bottom">
            <div class="location">
                <i class="el-icon-map-location" title="地点" @click="handleMap"></i>
                <p class="city">中国·北京</p>
            </div>
            <div class="views">
                <i class="el-icon-view" title="浏览量"></i>
                <p class="views-num">1万+</p>
            </div>
            <div class="talks">
                <i class="el-icon-chat-dot-round" title="评论"></i>
                <p class="talks-num">2313</p>
            </div>
            <div class="praise">
                <img src="@/assets/img/like.png" alt="" title='取消赞' class="praise-img" @click="handlePraise" v-if="isLike">
                <img src="@/assets/img/nolike.png" alt="" class="praise-img" title="点赞" @click="handlePraise" v-else>
                <p class="praise-num">1323</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isShowAttention: true,
            isLike: false

        }
    },
    methods: {
        //进入该文章详情
        gotoDetail () {
            window.console.log('打开详情');
        },
        //点击×号,移除掉当前内容
        removeCard () {
            window.console.log('移除当前文章');
            this.$message({
                message: '已为您减少此类动态',
                duration: 1500
            })
        },
        // 点击关注按钮
        handleAttention () {
            this.isShowAttention = !this.isShowAttention;
            if (this.isShowAttention) {
                //取消关注
                window.console.log('取消关注');
            } else {
                //关注
                window.console.log('关注');
            }
        },
        //点赞
        handlePraise () {
            this.isLike = !this.isLike;
            if (this.isLike) {
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
        },
        
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
    background-color: rgb(70, 230, 70);
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
    height: 200px;
}


/* 底部内容------ */
.dynamic-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5px 0;
    font-size: 19px;
    background-color: rgb(248, 66, 66);
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


