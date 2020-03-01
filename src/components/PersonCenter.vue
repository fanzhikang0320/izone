<template>
    <div class="personCenter-wrapper">
        <el-row>
            <el-col :span="7" class="left">

                <!-- 个人信息区域 -->
                <div class="information">
                    <img src="../assets/img/headImg.png" alt="" class="headImg">
                    <div class="nickname">迪丽热bug</div>
                    <div class="info-content">
                        年龄：
                    </div>
                    <div class="info-content">
                        性别：
                    </div>
                    <div class="info-content">
                        生日：
                    </div>
                    <div class="info-content">
                        现居住地：
                    </div>
                    <div class="info-content">
                        个性签名：
                    </div>
                    <div class="info-content">
                        <span class="edit"><i class="el-icon-edit"></i>编辑资料</span> 
                    </div>
                </div>
                <div class="msg-box">
                    <router-link :to="{name: 'messageBoard'}" tag="div">留言板</router-link>
                </div>
                <!-- 最近访客区域   -->
                <div class="visitor-box">
                    <div class="title">最近访客</div>
                    <!-- 整体 -->
                    <div class="visitor">
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <!-- 单个 -->
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                        <div class="visitor-area">
                            <div class="visitor-item">
                                <img src="../assets/img/headImg.png" alt="">
                                <span class="user-nickname">杀手不太冷</span>
                            </div>
                            <div class="time-box">2020.02.27</div>
                        </div>
                    </div>
                    <!-- 底部按钮 -->
                    <div class="btn-box">
                        <span>
                            <i class="el-icon-arrow-left"></i>
                        </span>
                        <span>
                            <i class="el-icon-arrow-right"></i>
                        </span>
                    </div>
                </div>

            </el-col>
            <!-- 中间内容区 -->
            <el-col :span="12" class="center">
                <router-view></router-view>
            </el-col>
             <el-col :span="5" class="right">
                 <div class="dynamic-num-box">
                     <span>累计发表</span>
                     <span>1999</span>
                     <span>篇</span>
                 </div>
                 <!-- 广告区域 -->
                <div class="ad-box">
                    <el-carousel
                        indicator-position="none"
                        arrow="never"
                    >
                        <el-carousel-item>
                            广告1
                        </el-carousel-item>
                        <el-carousel-item>
                            广告2
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
           
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            account: '12345678902'
        }
    },
    components: {
    }
}
</script>
<style scoped>
.personCenter-wrapper {
    width: 1024px;
    min-width: 1024px;
    background-color: #fff;
    margin: 0 auto;

}
.personCenter-wrapper .left {
    /* background-color: rgb(110, 226, 110); */
    padding-right: 30px;
}

/* 用户信息------------- */

.information {
    /* width: 100%; */
    /* height: 250px; */
    /* background-color: #f40; */
    border: 1px solid #d2c8e6;
    border-radius: 4px;
    font-size: 13px;
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.information .headImg {
    display: inline-block;
    text-align: center;
    width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.information .nickname {
    font-size: 18px;
    font-weight: bold;
    text-align: center;

}
.information .info-content {
    width: 100%;
    height: 35px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    line-height: 35px;
}
.information .info-content .edit {
    color: #409EFF;
    float: right;
    cursor: pointer;
}
.information .info-content .edit:hover {
    color: #0a82fa;
}

.msg-box {
    /* background-color: #409EFF; */
    padding: 0px 10px;
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    /* color: #fff; */
    border: 1px solid #d2c8e6;
    border-radius: 4px;
}
.msg-box  div{
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}
.msg-box  div:hover {
    color: #409EFF;
}

/* 访客区域------------------ */

.visitor-box {
    margin-top: 25px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d2c8e6;
    
}
.visitor-box .title {
    font-size: 16px;
    font-weight: bold;
    padding-left: 7px;
    background-color: rgb(83, 166, 250);
    color: #fff;
    height: 30px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    line-height: 30px;

}
.visitor-box .visitor {
    /* background-color: green; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 8px;
}
.visitor-area {
    /* background-color: aqua; */
    width: 80px;
    margin-left: 7px;
    margin-top: 5px;
}
.visitor-area .visitor-item {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 6px;
    background-color: rgb(228, 198, 29);
    cursor: pointer;
    overflow: hidden;
}
.visitor-item img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
}
.visitor-item .user-nickname {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 22px;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    background-image: linear-gradient(to bottom,transparent,rgba(0,0,0,.7))
}
.visitor-area .time-box {
    font-size: 14px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    
}

/* 访客底部区域----------- */
.btn-box {
    height: 25px;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn-box span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 3px 8px 5px 8px;
    text-align: center;
    line-height: 20px;
    font-weight: bolder;
    font-size: 15px;
    color: #857a99;
    cursor: pointer;
}
.btn-box span:hover {
    background-color: #ede9f5;
}

/* 右边---------- */
.right {
    /* background-color: pink; */
    padding-left: 30px;
}
.dynamic-num-box {
    height: 80px;
    border: 1px solid #d2c8e6;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
}
.dynamic-num-box span {
    display: inline-block;
    font-size: 17px;
    margin: 2px 0px;
}

.dynamic-num-box span:nth-child(2) {
    font-size: 20px;
    font-weight: bold;
}

.right .ad-box {
    height: 300px;
    margin-top: 25px;
    background-color: #0a82fa;
    border-radius: 4px;
    border: 1px solid #d2c8e6;
}
</style>
