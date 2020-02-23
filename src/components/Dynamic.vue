<template>
    <div class="dynamic-wrapper">
        <div v-for="(item,index) in dynamicInfo" :key="index" class="dynamicInfo-box">
            <!-- 说说顶部区域 -->
            <div class="dynamic-top" @click="gotoDetail(index)">
                <img :src="'/api/getImgData?path=' + item.userInfoData.imgpath" class="headImg">
                <div class="top-center">
                    <p class="nickname">{{item.userInfoData.nickname}}</p>
                    <div class="time-box">
                        <p class="time"><i class="el-icon-time time-icon"></i>{{item.ctime}}</p>
                        <p class="funs-box">
                            <img src="@/assets/img/fans.png" :title="'粉丝量：' + item.userInfoData.fans" class="funs-img">
                            {{item.userInfoData.fans}}
                        </p>
                    </div>
                </div>
                <div class="attention-btn-box" v-if="item.isShowAttention">
                    <button class="attention-btn" v-if="item.isAttention" @click.stop="handleAttention(item.account,index)"><i class="el-icon-plus plus-icon"></i>关注</button>
                    <button class="attention-btn" v-else @click.stop="handleCancelAttention(item.account,index)"><i class="el-icon-check check-icon"></i>已关注</button>
                </div>
               
                <i class="el-icon-close close-icon" v-if="item.isShowRemove" @click.stop="removeCard(item.id,index)"></i>
            </div>

            <!-- 说说中间内容区 -->
            <div class="dynamic-middle" @click.stop>
                <div class="dynamic-text" ref="textBox">
                    <div class="text">{{item.content}}</div>
                </div>
                <div class="dynamic-img-box" @click.stop v-if="item.imgList.length != 0">
                    <!-- 图片为一张的时候 -->
                    <el-image v-if="item.imgList.length == 1" lazy :preview-src-list="item.imgList" :src="item.imgList[0]" style="width:240px;height:320px">
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
                    <el-image  v-else :src="img" class="dynamic-img" fit="cover" lazy :preview-src-list="item.imgList" v-for="(img,index) in item.imgList" :key="index">
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
                    <div class="img-more" v-if="item.imgList.length > 6" title="点击查看详情" @click.stop="gotoDetail(index)">
                        <i class="el-icon-plus plus-icon"></i>
                    </div>
                </div>
            </div>
            <!-- 说说底部区域 -->
            <div class="dynamic-bottom" @click.stop>
                <div class="location">
                    <i class="el-icon-map-location" title="地点" @click="handleMap"></i>
                    <p class="city">{{item.region}}·{{item.city}}</p>
                </div>
                <div class="views">
                    <i class="el-icon-view" title="浏览量"></i>
                    <p class="views-num">{{item.views > 9999 ? '9999+' : item.views}}</p>
                </div>
                <div class="talks">
                    <i class="el-icon-chat-dot-round" title="评论"></i>
                    <p class="talks-num">{{item.talks > 9999 ? '9999+' : item.talks}}</p>
                </div>
                <div class="praise">
                    <img src="@/assets/img/like.png" alt="" title='取消赞' class="praise-img" @click="cancelPraise(item.id,index)" v-if="item.isLike">
                    <img src="@/assets/img/nolike.png" alt="" class="praise-img" title="点赞" @click="handlePraise(item.id,index)" v-else>
                    <p class="praise-num">{{item.praise > 9999 ? '9999+' : item.praise}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var utils = require('../utils/cookie.js');
export default {
    data () {
        return {
            isShowMore: true,
            dynamicInfo: [], //每次请求之后进行拼接的数据
            dynamicData: [] ,//请求回来的源数据
            locationAccount: ''
        }
    },
    methods: {
        //进入该文章详情
        gotoDetail () {
            window.console.log('打开详情');
        },
        //点击×号,删除自己的文章
        removeCard (dynamic_id,index) {
            this.$confirm('你确定要删除此条动态？','提示',{
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/deleteDynamicInfo',{dynamic_id: dynamic_id})
                    .then((res) => {
                        if (res.data.type == 'success') {
                            this.axios.post('/api/deleteDynamicImg',{dynamic_id: dynamic_id})
                            .then((result) => {
                                if (result.data.type == 'success') {
                                    this.dynamicInfo.splice(index,1); //从此数据当中移除
                                    this.$forceUpdate();
                                }
                            })
                        }
                         
                    })
               
            })
                // this.$forceUpdate();
            
              
        },
        // 点击关注按钮
        async handleAttention (targetAccount,index) {
            // 只要关注了这个账号，那么与之相同的账号都得变换图标
            for (let i = 0; i < this.dynamicInfo.length; i++) {
                if (this.dynamicInfo[i].account == targetAccount) {
                    this.dynamicInfo[i].isAttention = false;
                    this.dynamicInfo[i].userInfoData.fans +=1;
                }
            }
            
            var updateResult = await this.axios.post('/api/updateFans',{account: targetAccount,fans: this.dynamicInfo[index].userInfoData.fans})
            // 根据当前账号和关注的此说说的账号
            var res = await this.axios.post('/api/addAttention',{originAccount: this.locationAccount,targetAccount: targetAccount})
           
            //更新失败
            if (updateResult.data.type != 'success' || res.data.type != 'success') {
                for (let i = 0; i < this.dynamicInfo.length; i++) {
                    if (this.dynamicInfo[i].account == targetAccount) {
                        this.dynamicInfo[i].isAttention = true;
                        if (this.dynamicInfo[i].userInfoData.fans > 0) {
                            this.dynamicInfo[i].userInfoData.fans -=1;
                        } else {
                            this.dynamicInfo[i].userInfoData.fans = 0;
                        }   
                    }
                }
            }
            this.$forceUpdate();
           window.console.log(this.dynamicInfo);
        },
        //取消关注
        async handleCancelAttention(targetAccount,index) {
            for (let i = 0; i < this.dynamicInfo.length; i++) {
                if (this.dynamicInfo[i].account == targetAccount) {
                    this.dynamicInfo[i].isAttention = true;
                    if (this.dynamicInfo[i].userInfoData.fans > 0) {
                        this.dynamicInfo[i].userInfoData.fans -= 1;
                    } else {
                        this.dynamicInfo[i].userInfoData.fans = 0;
                    }
                }
            }
            // 更新粉丝量
            var updateResult = await this.axios.post('/api/updateFans',{account: targetAccount,fans: this.dynamicInfo[index].userInfoData.fans})
            // 取消关注
            var res = await this.axios.post('/api/deleteAttention',{originAccount: this.locationAccount,targetAccount: targetAccount})

            //判断是否更新成功,没有更新成功恢复成原来的值
            if (updateResult.data.type != 'success' || res.data.type != 'success') {
                for (let i = 0; i < this.dynamicInfo.length; i++) {
                    if (this.dynamicInfo[i].account == targetAccount) {
                        this.dynamicInfo[i].isAttention = false;
                        this.dynamicInfo[i].userInfoData.fans +=1;
                    }
                }
            }
            this.$forceUpdate() //强制更新视图
         window.console.log(this.dynamicInfo);
        },
        //点赞
        async handlePraise (dynamic_id,index) {
            // 修改当前说说的状态，根据说说id修改点赞数，添加当前用户喜欢此说说
            this.dynamicInfo[index].isLike = true;
            this.dynamicInfo[index].praise += 1;
            var res = await this.axios.post('/api/addPraise',{account: this.locationAccount,dynamic_id: dynamic_id});
            var resultPraise = await this.axios.post('/api/updatePraise',{dynamic_id: dynamic_id,praise: this.dynamicInfo[index].praise})
            
            //服务器发生错误
            if (res.data.type != 'success' || resultPraise.data.type != 'success') {

                this.dynamicInfo[index].isLike = false;
                if (this.dynamicInfo[index].praise > 0) {
                    this.dynamicInfo[index].praise -= 1;
                } else {
                    this.dynamicInfo[index].praise = 0;
                }
            }
            window.console.log(res,resultPraise)
            this.$forceUpdate();
        },
        //取消赞
        async cancelPraise(dynamic_id,index) {
            this.dynamicInfo[index].isLike = false;
            if ( this.dynamicInfo[index].praise > 0) {
                this.dynamicInfo[index].praise -= 1;
            } else {
                this.dynamicInfo[index].praise = 0;
            }
            
            var res = await this.axios.post('/api/cancelPraise',{account: this.locationAccount,dynamic_id: dynamic_id})
            var resultPraise = await this.axios.post('/api/updatePraise',{dynamic_id: dynamic_id,praise: this.dynamicInfo[index].praise})
            
            //服务器发生错误
            if (res.data.type != 'success' || resultPraise.data.type != 'success') {
                this.dynamicInfo[index].isLike = true;
                this.dynamicInfo[index].praise += 1;
            }
            this.$forceUpdate();
        },
        //点击地图图标
        handleMap () {
            this.$message({
                showClose: true,
                message: '抱歉！该功能暂未开放！',
                type: 'warning'
            })
        },
        // 发送请求，去数据库查找最近时间说说
        async getDynamicData() {
            try{
                var res = await this.axios.get('/api/getDynamicInfo',{params: {start: 0,nums: 20}});
                if (res.data.type == 'success') {

                    this.dynamicData = res.data.dynamicInfoArray;

                    for (let i = 0; i < res.data.dynamicInfoArray.length; i++) {
                        // 获取本机cookie当中的登录的账号
                        this.locationAccount = utils.getCookie('account');
                        
                        var resultPraise = await this.axios.get('/api/getPraise',{params: {account: this.locationAccount,dynamic_id: this.dynamicData[i].id}})
                        if (resultPraise.data.type == 'success') {
                            if (resultPraise.data.data.length != 0) {
                                this.dynamicData[i].isLike = true;
                            } else {
                                this.dynamicData[i].isLike = false;
                            }
                        } else {
                            //服务端错误,默认没点赞
                            this.dynamicData[i].isLike = false;
                        }
                        
                       
                        //先判断获取到的说说是不是本人发布的
                        if (this.dynamicData[i].account == this.locationAccount) {
                           this.dynamicData[i].isShowAttention = false;
                           this.dynamicData[i].isShowRemove = true;
                        } else {
                            this.dynamicData[i].isShowAttention = true;
                            this.dynamicData[i].isShowRemove = false;
                        }
                        //然后根据本地账号去查询是否关注了此账号
                        var resultAttention = await this.axios.get('/api/getAttention',{params: {account: this.locationAccount}});
                        if (resultAttention.data.type == 'success') {
                            // 判断有没有数据
                            if (resultAttention.data.data.length != 0) {
                                for (let k = 0; k < resultAttention.data.data.length; k++) {
                                    if (this.dynamicData[i].account == resultAttention.data.data[k].targetAccount) {
                                        this.dynamicData[i].isAttention = false;
                                    } else {
                                        this.dynamicData[i].isAttention = true;
                                    }
                                }
                            } else {
                                 this.dynamicData[i].isAttention = true;
                            }
                            
                        } else {
                            //当后台发生错误或者查询失败
                            this.dynamicData[i].isAttention = true;
                        }

                        //请求图片信息
                        var resultImg = await this.getDynamicImg(this.dynamicData[i].id);
                        
                        if (resultImg.data.type == 'success') {
                            var imgArr = [];
                            for (let j = 0; j < resultImg.data.imgList.length; j++ ) {
                                imgArr.push('/api/getImgData?path=' + resultImg.data.imgList[j].path);
                            }
                            this.dynamicData[i].imgList = imgArr;
                        } else {
                            // 请求图片失败，赋值空
                            this.dynamicData[i].imgList = [];
                        }
                        // 请求这一篇发表说说的用户的信息
                        var result = await this.getUserInfo(this.dynamicData[i].account);
                        if (result.data.type == 'success') {
                            // 返回的是一个数组，处理一下
                            this.dynamicData[i].userInfoData = result.data.userInfoData[0];
                        }
                    }
                    this.dynamicInfo = this.dynamicInfo.concat(this.dynamicData);
                    window.console.log(this.dynamicInfo);
                }
                
            } catch(err) {
                this.isLoading = false;
            }
            
        },
        // 根据说说返回的账号信息，去查找该账号的信息
        async getUserInfo(account) {
            var res = await this.axios.get('/api/getUserInfo',{params: {account: account}});
            return res;
        },
        //根据说说的id返回里面的图片信息
        async getDynamicImg(dynamic_id) {
            var res = await this.axios.get('/api/getDynamicImg',{params: {dynamic_id: dynamic_id}});
            return res;
        }
    },
    created() {
        this.locationAccount = utils.getCookie('account');
        this.getDynamicData(20);
    }
}
</script>
<style scoped>
.dynamic-wrapper {
    /* background-color: rgb(238, 161, 238); */
}
.dynamic-wrapper .dynamicInfo-box {
    margin: 20px 0px;
    border: 1px solid #d2c8e6;
    background-color: #faf8ff;
    /* box-shadow: #ccc 3px 2px 5px; */
    border-radius: 4px;
    color: #2f2e33;
    
}
.dynamic-wrapper p {
    margin: 0;
}

/* 顶部区域css--------- */
.dynamic-top {
    /* background-color: rgb(70, 203, 243); */
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
    border: 1px solid #eee;
    cursor: pointer;
    margin-left: 15px;
}
.dynamic-top .nickname {
    margin: 0;
    font-size: 16px;
}
.dynamic-top .time-box {
    display: flex;
    margin: 3px 0 0 0;
    font-size: 14px;
    color: #827e8c;
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
}
.dynamic-top .time-box .funs-box .funs-num {
    margin: 0;
}
.dynamic-top .top-center {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
}
.dynamic-top .attention-btn-box {
    position: absolute;
    right: 40px;
    width: 80px;
    height: 30px;
    cursor: pointer;
}
.dynamic-top .attention-btn {
    /* position: absolute;
    right: 40px; */
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
    right: 6px;
    top: 5px;
    font-size: 18px;
    color: rgb(129 ,110 ,170);
    cursor: pointer;
}

/* 中间内容css---------- */
.dynamic-middle {
    /* background-color: gray; */
    margin-bottom: 15px;
    /* max-height:  */
}
.dynamic-middle .dynamic-text {
    padding: 5px 15px;
    /* background-color: #f40; */
    margin-bottom: 15px;

}
.dynamic-middle .dynamic-text .text {
    min-height: 70px;
    max-height: 140px;
    /* background-color: #ccc; */
    font-size: 17px;
    line-height: 23px;
    overflow: hidden;
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
    color: #827e8c;
    border-top: 1px solid rgb(223 ,214 ,240);
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


