<template>
    <div class="other-wrapper">
        <div class="caseInfo-wrapper" v-loading="isLoading">
            <div v-if="caseInfo.length != 0" style="display:flex;flex-wrap: wrap">
                <div class="caseInfo-box" @click="onlineView(item.url)" v-for="(item,index) in caseInfo" :key="index">
                    <div class="caseInfo-top">
                        <el-image style="width:100px;height:100px;borderRadius:8px" :src="'http://127.0.0.1:8081/api/getImgData?path='+ item.imgpath" fit="cover">
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
                            <h2 class="desc-title">{{item.name}}</h2>
                            <p class="author">作者：{{item.author}}</p>
                            <p class="time-box">上传时间：{{getTime(item.ctime)}}</p>
                            <p class="grade-box">评分：
                                <el-rate
                                    v-model="item.score"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    allow-half
                                    class="other-rate"
                                ></el-rate>
                            </p>
                            <div class="desc-info">描述：
                                <div :class="{'info-text': true, 'info-text-more': !item.isShowOpen}">
                                    {{item.description}}
                                    <div v-if="item.isShowMore">
                                        <i class="el-icon-arrow-down down-icon" @click.stop="openMore(index)" v-if="item.isShowOpen">展开</i>
                                        <i class="el-icon-arrow-up up-icon" @click.stop="closeMore(index)" v-else>收起</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src="@/assets/img/new.png" alt="最新" class="new" v-if="getIsNew(item.ctime)">
                    </div>
                    <div class="caseInfo-bottom" @click.stop>
                        <el-popover
                            placement="bottom"
                            trigger="click"
                        >
                            <el-rate v-model="item.initScore" show-text allow-half @change="handleGrade(index)"></el-rate>
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
                        
                        <p class="download-box" @click="downloadCode(item.packagePath)"><i class="el-icon-download"></i>下载</p>
                        <p class="views-box" @click="onlineView(item.url)">
                            <i class="el-icon-monitor"></i>
                            在线预览
                        </p>
                    </div>
                </div>
            </div>
            <div class="nomore" v-else>
                {{isLoading ? '正在努力获取中...' : 'sorry！人家也是有底线的嘛 (⇀‸↼‶)'}}
            </div>
        </div>
        <el-pagination 
        layout="prev,pager,next" 
        background 
        :page-size=pageSize
        :total=total
        :hide-on-single-page=true
        @current-change="pageChange" 
        class="pagination"
        >

        </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            caseInfo:[],
            total: 0, //数据的总数量
            pageSize: 20, //每页展示多少条数据
            start: 1,
            isLoading: false
        }
    },
    methods: {
        //点击评分
        handleGrade (index) {
            var id = this.caseInfo[index].id;
            var score = this.caseInfo[index].initScore;
            this.axios.post('/api/updateScore',{id: id,score: score})
                .then((res) => {
                    if (res.data.type == 'success') {
                        //更新当前评分
                        this.caseInfo[index].score = parseInt( (this.caseInfo[index].initScore + this.caseInfo[index].score) / (this.caseInfo[index].evaluate + 1).toFixed(1))
                        this.$message({
                            type: 'success',
                            message:"感谢您的评价！"
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message:'评价失败，请稍后再试！'
                        })
                    }
                })

        },
        //下载当前案例源码
        downloadCode (path) {
            this.$confirm('确定要下载该文件吗？','提示',{
                type: 'warning',
                confirmButtonText: '是的',
                cancelButtonText: '再想想'
            }).then(() => {
                var a = document.createElement('a');
                a.href = 'http://127.0.0.1:8081/api/downLoadOtherData?path=' + path;
                a.download = 'demo.zip';
                a.click();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: "已取消下载"
                })
            })
        },
        //在线预览,跳转指定页面
        onlineView (url) {
            if(url) {
                window.open(url,'_blank');
            } else {
                this.$message({
                    type: 'warning',
                    message: '抱歉，该案例暂不支持在线预览！'
                })
            }
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
            this.caseInfo[index].isShowOpen = false; //切换状态
        },
        //点击收起更多信息
        closeMore (index) {
            this.caseInfo[index].isShowOpen = true;
        },
        // 当前页改变时
        pageChange(currentPage) {
            this.getData(currentPage);
        },
       
        //获取数据
        async getData(currentPage) {
            this.start = currentPage;
            this.isLoading = true; //开启loading
            var res = await this.axios.get('/api/getOtherData',{params: {start: (this.start - 1) * this.pageSize,limit: this.pageSize}})
           
            if (res.data.type == 'success') {
                this.isLoading = false;  //关闭loading

                this.total = res.data.count;
                var len;
                for (var i = 0; i < res.data.data.length; i++) {
                    res.data.data[i].isShowOpen = false;
                    //判断字符串占位长度决定是否显示更多按钮
                    len = this.getCharLength(res.data.data[i].description);
                    if (len > 84) {
                        res.data.data[i].isShowMore = true
                    } else {
                        res.data.data[i].isShowMore = false;
                    }
                    //控制是否展开
                    res.data.data[i].isShowOpen = true;

                    //计算平均分数
                    if (res.data.data[i].evaluate == 0) {
                        res.data.data[i].score = 0;
                    } else {
                        res.data.data[i].score = +(res.data.data[i].score / res.data.data[i].evaluate).toFixed(1);
                    }
                    if (res.data.data[i].score > 5) {
                        res.data.data[i].score = 5
                    } else if (res.data.data[i].score < 0) {
                        res.data.data[i].score = 0
                    }

                    //初始化用户评分，
                    res.data.data[i].initScore = 0;
                }
                //赋值要渲染的最终数组
                this.caseInfo = res.data.data;
            } 
        },
        //
        //获取字符占位长度
        getCharLength (str) {
            var len = 0;    
            for (var m= 0; m < str.length; m++) {    
                if (str.charCodeAt(m)>127 || str.charCodeAt(m)==94) {    
                    len += 2;    
                } else {    
                    len ++;    
                }    
            }  
            return len; 
        },
        // 处理时间格式
        getTime(time) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
        },
        //计算是否显示最新
        getIsNew(time) {
            var date = new Date().getTime();
            var day = parseInt((date - time) / (1000 * 60 * 60 * 24));
            if (day < 7) {
                return true;
            } else {
                return false
            }
        },
        message () {
            this.$message({
                showClose: true,
                message: '抱歉，该功能暂未开放',
                type: 'warning'
            })
        }
        
    },
    mounted() {
        this.getData(this.start)

    }
}
</script>
<style scoped>
.other-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 1024px;
    min-width: 1024px;
    /* background-color: #fff; */
    margin: 0 auto;
}

.caseInfo-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%
}

.other-wrapper p {
    margin: 0;
    cursor: pointer;
}
.other-wrapper .caseInfo-box {
    width: 480px;
    height: 200px;
    margin: 15px;
    border: 1px solid #fdcfa1;
    background-color: #fef3dfc7;
    border-radius: 4px;
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
    background-color: #ef93666e;
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
    color: #bd4558;
    /* background-color: rgb(184, 62, 62); */
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
    /* background-color: #fff; */
    overflow: hidden;
    word-wrap: break-word;
    position: relative;
}
.caseInfo-top .desc-box .desc-info .info-text.info-text-more {
    height: auto;
}


/* 底部 ------------------*/
.caseInfo-bottom {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #d2c8e6;
    padding: 5px 0;
    font-size: 14px;
    color: #d27b88;
}
.caseInfo-bottom i {
    margin-right: 2px;
}
.caseInfo-bottom .share-box:hover,.download-box:hover,.views-box:hover,.grade:hover{
    color: #da2e48;
}
.pagination {
    margin: 25px 0 20px 0;
}
.nomore {
    background-color: rgba(254, 240, 214, 0.67);
    border-radius: 4px;
    color: #af844e;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
}
</style>
