<template>
    <div class="dynamic-wrapper" >
        
        <!-- 有数据的时候显示 -->
        <div v-if="dynamicInfo.length != 0">
            <div v-for="(item,index) in dynamicInfo" :key="index" class="dynamicInfo-box">
                <!-- 说说顶部区域 -->
                <div class="dynamic-top" @click="gotoDetail(index)">
                    <img :src="'http://127.0.0.1:8081/api/getImgData?path=' + item.userInfoData.imgpath" class="headImg">
                    <div class="top-center">
                        <p class="nickname">{{item.userInfoData.nickname}}</p>
                        <div class="time-box">
                            <p class="time"><i class="el-icon-time time-icon"></i>{{getTime(item.ctime)}}</p>
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
                    <div class="dynamic-text" ref="textBox" v-if="item.content != ''">
                        <div class="text">{{item.content}}</div>
                    </div>
                    <div class="dynamic-img-box" @click.stop v-if="item.imgList.length != 0">
                        <!-- 图片为一张的时候 -->
                        <el-image v-if="item.imgList.length == 1" lazy :preview-src-list="item.imgList" :src="'http://127.0.0.1:8081' + item.imgList[0]" style="width:240px;height:320px">
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
                        <el-image  v-else :src="'http://127.0.0.1:8081' + img" class="dynamic-img" fit="cover" lazy :preview-src-list="item.imgList" v-for="(img,index) in item.imgList" :key="index">
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
                    <el-popover
                            width="300"
                            trigger="click"
                            placement="bottom"
                            v-model="item.visible"
                            class="talk-popover"
                        >
                        <div class="talks" slot="reference">
                            <i class="el-icon-chat-dot-round" title="评论"></i>
                            <p class="talks-num">{{item.talks > 9999 ? '9999+' : item.talks}}</p>
                        </div>

                        <el-input type="textarea"  placeholder="请输入评论内容" v-model="item.talkContent" maxlength="35" show-word-limit></el-input>
                        <div class="button-box" style="marginTop: 10px;text-align: right;">
                            <el-button type="info" size="mini" @click="cancelTalk(index)">取消</el-button>
                            <el-button type="primary" size="mini" @click="talks(index,item.id)">发表</el-button>
                        </div>
                        
                    </el-popover>
                    <div class="praise">
                        <img src="@/assets/img/like.png" alt="" title='取消赞' class="praise-img" @click="cancelPraise(item.id,index)" v-if="item.isLike">
                        <img src="@/assets/img/nolike.png" alt="" class="praise-img" title="点赞" @click="handlePraise(item.id,index)" v-else>
                        <p class="praise-num">{{item.praise > 9999 ? '9999+' : item.praise}}</p>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="talks-box">
                    <div v-if="item.talksArray.length != 0">
                        <div class="reply-box" v-for="(talksItem,talksIndex) in item.talksArray" :key="talksIndex">
                            <!-- 一级评论 -->
                            <div class="reply-item">
                                <img :src="'http://127.0.0.1:8081/api/getImgData?path=' + talksItem.imgpath" alt="">
                                <div class="reply-item-right">
                                    <div>
                                        <span class="nickname">{{talksItem.parentNickname}}</span>
                                        <span>：</span>
                                        <p class="time-box">{{getTime(talksItem.ctime)}}</p>
                                    </div>
                                    <el-tooltip placement="bottom-start" effect="light">
                                        <span class="reply-content">{{talksItem.content}}</span>
                                        <div slot="content" style="color:#1c87eb;">
                                            <span type="text" @click="reply(index,talksIndex)" size="mini" style="margin-right: 8px;cursor:pointer;">回复</span>
                                            <!-- <span type="text" size="mini" style="cursor:pointer;">举报</span> -->
                                        </div>
                                    </el-tooltip>
                                </div>
                            </div>
                            <!-- 回复区 -->
                            <div v-if="talksItem.replyArray.length != 0">
                                <div class="reply-item reply-c"  v-for="(replyItem,replyIndex) in talksItem.replyArray" :key="replyIndex">
                                    <img :src="'http://127.0.0.1:8081/api/getImgData?path=' + replyItem.parentImgpath" alt="">
                                    <div class="reply-item-right">
                                        <div>
                                            <span class="nickname">{{replyItem.parentNickname}}</span>
                                            <span class="reply">回复</span>
                                            <span class="nickname">{{replyItem.childNickname}}</span>
                                            <span>：</span>
                                            <p class="time-box">{{getTime(replyItem.ctime)}}</p>
                                        </div>
                                        <el-tooltip
                                            placement="bottom-start"
                                            effect="light"
                                        >
                                            <span class="reply-content">{{replyItem.content}}</span>
                                            <div slot="content" style="color:#1c87eb;">
                                                <span type="text" @click="reply(index,talksIndex,replyIndex)" size="mini" style="margin-right: 8px;cursor:pointer;">回复</span>
                                                <!-- <span type="text" size="mini" style="cursor:pointer;">举报</span> -->
                                            </div>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="more-reply-box" v-if="item.isLoadTalk">
                        <span>正在加载评论...<i class="el-icon-loading"></i></span>
                    </div>
                    <div v-else>
                        <div class="more-reply-box" @click="loadMoreTalks(index,item.id)" v-if="item.isShowMoreTalk">
                            <span>展开更多评论<i class="el-icon-caret-bottom"></i></span>
                        </div>
                        <div class="more-reply-box" v-else>
                            <span><i class="el-icon-s-release"></i>暂无更多评论</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!-- 请求数据为空的时候显示 -->
        <div class="placehodler-box" v-if="isShowNull">
            <span v-if="loading">正在努力获取更多内容  ─=≡Σ(((つ•̀ω•́)つ <i class="el-icon-loading"></i></span>
            <span v-else>sorry！人家也是有底线的嘛  ≦(._.)≧</span>
        </div>
    </div>
</template>
<script>
var sessionStorageUtil = require('../utils/sessionStorage.js');
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            dynamicInfo: [], //展示的数据，用于每次请求之后进行拼接的数据
            dynamicData: [] ,//请求回来的源数据
            locationAccount: '', //本地session当中存储的记录,
            talkLimit: 10, //每次去请求多少条评论
            timer: null
        }
    },
    watch: {
        dynamicInfoData(newValue) {
            this.getData(newValue)
        }

    },
    computed: {
        ...mapGetters(['loading','isShowNull','dynamicInfoData']),
        
    },
    methods: {
        //进入该文章详情
        gotoDetail () {
            this.$message({
                type: 'warning',
                message: '抱歉，该功能暂不支持！'
            })
        },
        //点击×号,删除自己的文章
        removeCard (dynamic_id,index) {
            this.$confirm('你确定要删除此条动态？','提示',{
                type: 'warning'
            }).then(() => {
                //删除文章信息
                this.axios.post('/api/deleteDynamicInfo',{dynamic_id: dynamic_id})
                    .then((res) => {
                        if (res.data.type == 'success') {
                            //删除说说图片信息
                            this.axios.post('/api/deleteDynamicImg',{dynamic_id: dynamic_id})
                                .then((result) => {
                                    if (result.data.type == 'success') {
                                        this.dynamicInfo.splice(index,1); //从此数据当中移除
                                        this.$forceUpdate();
                                    }
                                })
                            //删除说说所有的评论
                            this.axios.post('/api/deleteAllTalks',{dynamic_id: dynamic_id})
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
        //发表评论
        async talks(index,dynamic_id) {
            //显示评论框
            this.dynamicInfo[index].visible = false;
            var talkContent = this.dynamicInfo[index].talkContent;
            //如果评论内容为空 
            if (!talkContent || talkContent.trim().length == 0) {
                this.$message({
                    message: '评论内容不能为空',
                    type: 'warning'
                })
                return ;
            }
            var locationAccount = this.$store.state.locationUserInfo.account;
            var nickname = this.$store.state.locationUserInfo.nickname;
            var imgpath = this.$store.state.locationUserInfo.imgpath;
            // 将评论存入到数据库
            var res = await this.axios.post('/api/insertTalk',{dynamic_id: dynamic_id,parentAccount: locationAccount,parentNickname: nickname,parentImgpath: imgpath,content: talkContent})
            if (res.data.type == 'success') {
                var resultTalk = res.data.data[0];
                resultTalk.replyArray = [];
                this.dynamicInfo[index].talksArray.push(resultTalk);
                //修改该篇说说的评论量
                var talks = this.dynamicInfo[index].talks += 1;
                this.axios.post('/api/updateTalks',{dynamic_id: dynamic_id,talks: talks})
;
                this.$forceUpdate(); //更新视图
            } else {
                this.$message({
                    message: '评论发表失败！（暂不支持表情符号）',
                    type: 'error'
                })
            }
        },
        // 取消评论
        cancelTalk(index) {
            this.dynamicInfo[index].talkContent = '';
            this.dynamicInfo[index].visible = false;
        },
        //加载更多评论
        async loadMoreTalks(index,dynamic_id) {
            this.dynamicInfo[index].isLoadTalk = true;

            this.dynamicInfo[index].talkStart = this.dynamicInfo[index].talkStart + this.talkLimit;
             
            var res = await this.getTalks(dynamic_id,this.dynamicInfo[index].talkStart);

            if (res.data.type == 'success') {
                this.dynamicInfo[index].isLoadTalk = false;
                var data = res.data.data;
                    //获取当前评论下的回复评论
                for (var n = 0; n < data.length; n ++) {
                    var resultReply = await this.axios.post('/api/selectReply',{talks_id: data[n].id});
                    // 查询回复评论成功
                    if (resultReply.data.type == 'success') {
                        data[n].replyArray = resultReply.data.data;
                    } else {
                        data[n].replyArray = [];
                    }
                }
                //没有评论,显示暂无评论
                if (data.length == 0) {
                    this.dynamicInfo[index].isShowMoreTalk = false;
                } else {
                    this.dynamicInfo[index].isShowMoreTalk = true;
                }
                this.dynamicInfo[index].talksArray = this.dynamicInfo[index].talksArray.concat(data);
                this.$forceUpdate(); //更新视图
            }
        },

        //点击回复
        reply(index,talkIndex,replyIndex) {
            var childAccount,
                childNickname;
            //得到此条评论的完整信息
            var replyInfo = this.dynamicInfo[index].talksArray[talkIndex];
            // 判断点击的是不是一级评论的回复
            if (replyIndex >= 0) {
                // 不是一级评论
                childAccount = replyInfo.replyArray[replyIndex].parentAccount;
                childNickname = replyInfo.replyArray[replyIndex].parentNickname;
            } else {
                // 是一级评论
                childAccount = replyInfo.parentAccount;
                childNickname = replyInfo.parentNickname;
            }
            var talksId = replyInfo.id;
            var dynamic_id = replyInfo.dynamic_id;
            var locationAccount = this.$store.state.locationUserInfo.account;
            var nickname = this.$store.state.locationUserInfo.nickname;
            var imgpath = this.$store.state.locationUserInfo.imgpath;
            this.$prompt('输入回复内容，最多不超多35个字','回复  '+childNickname,{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                showClose: false
            }).then(({value}) => {
                if (!value || value.trim().length == 0) {
                    this.$message({
                        message: '消息内容不能为空',
                        type: 'warning'
                    })
                } else if (value.trim().length >= 35) {
                    this.$message({
                        message: '消息内容不能为空',
                        type: 'warning'
                    })
                } else {
                    
                    var postData = {
                        dynamic_id: dynamic_id,
                        talk_id: talksId,
                        parentAccount: locationAccount,
                        parentNickname: nickname,
                        imgpath: imgpath,
                        childAccount: childAccount,
                        childNickname: childNickname,
                        replyContent: value
                    }
                    this.axios.post('/api/insertReply',postData)
                        .then((res) => {
                            //插入回复成功,更新评论量，刷新视图，请求当前的回复评论
                            if (res.data.type == 'success') {
                                replyInfo.replyArray.push(res.data.data[0]);
                                //修改该篇说说的评论量
                                var talks = this.dynamicInfo[index].talks += 1;

                                this.axios.post('/api/updateTalks',{dynamic_id: dynamic_id,talks: talks});
                                this.$forceUpdate();
                            }
                        })
                    
                }
               
            }).catch(() => {
                window.console.log('取消');
            }) 

        },
        // 根据说说id请求下面的评论
        async getTalks(dynamic_id,start) {
            var limit = 1; //每篇说说每次最多请求的数据
            var res = await this.axios.get('/api/getTalks',{params: {start: start, limit: limit,dynamic_id: dynamic_id}});
            
            return res;
        },
        // 根据前面传递进来的数据进行获取，加工，赋值给最终要渲染的数据
        async getData(d) {
            this.dynamicData = d;
            for (let i = 0; i < this.dynamicData.length; i++) {

                this.dynamicData[i].visible; //控制是否显示评论框
                this.dynamicData[i].talkContent; //评论框的值
                this.dynamicData[i].talkStart = 0; //请求评论的起始位置
                this.dynamicData[i].isLoadTalk = true; //是否显示正在加载评论loading,默认显示
                this.dynamicData[i].isShowMoreTalk = false//是否显示展示更多,默认不显示
                // 获取用户是否已经点赞过
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
                

                //判断获取到的说说是不是本人发布的
                if (this.dynamicData[i].account == this.locationAccount) {
                    this.dynamicData[i].isShowAttention = false;
                    this.dynamicData[i].isShowRemove = true;
                } else {
                    this.dynamicData[i].isShowAttention = true;
                    this.dynamicData[i].isShowRemove = false;
                }

                //根据本地账号去查询是否关注了此账号
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

                //请求该篇说说当中的图片信息
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

                // 获取当前说说评论
                var resultTalk = await this.getTalks(this.dynamicData[i].id,this.dynamicData[i].talkStart);
                if (resultTalk.data.type == 'success') {
                    this.dynamicData[i].isLoadTalk = false; //关闭loading

                    this.dynamicData[i].talksArray = [];

                    var data = resultTalk.data.data;
                        //获取当前评论下的回复评论
                    for (var n = 0; n < data.length; n ++) {
                        var resultReply = await this.axios.post('/api/selectReply',{talks_id: data[n].id});
                        // 查询回复评论成功
                        if (resultReply.data.type == 'success') {
                            data[n].replyArray = resultReply.data.data;
                        } else {
                            data[n].replyArray = [];
                        }
                    }
                    //没有评论,或者评论数达不到的，显示暂无评论
                    if (data.length == 0 || data.length <= 1) {
                        this.dynamicData[i].isShowMoreTalk = false;
                    } else {
                        this.dynamicData[i].isShowMoreTalk = true;
                    }
                    this.dynamicData[i].talksArray = this.dynamicData[i].talksArray.concat(data);
                }
                
            }

            // 把加工过的数据塞给要最终渲染使用的数据
            this.dynamicInfo = this.dynamicData;
            this.$forceUpdate();
            
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
        },
        //计算时间
        getTime(time) {
            var oldTime = new Date(time);
            var newTime = new Date()
            var differYear = newTime.getFullYear() - oldTime.getFullYear();
            var differMonth = (newTime.getMonth() + 1) - (oldTime.getMonth() + 1);
            var differDate = newTime.getDate() - oldTime.getDate();
            var year = oldTime.getFullYear();
            var date = oldTime.getDate();
            var month = oldTime.getMonth() + 1;
            var hours = oldTime.getHours();
            var minutes = oldTime.getMinutes();
            
            // 不是今年发布的，返回带年份的
            if (differYear > 0) {
                return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
            }
            //今年发布的
            if (differYear == 0 ) {
                // 判断是不是当月并且是最近两天的
                if (differMonth == 0 && (differDate == 0 || differDate == 1)) {
                    // 判断是不是当天
                    if (differDate == 0) {
                        date = '今天'
                    } else if (differDate == 1) {
                        date = '昨天'
                    }
                    return `${date} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
                } else {
                    // 不是最近两天发布的，但是是今年发布的
                    return `${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
                }
               
            }
           
            
            
        }
        
       
    },
    created() {
        this.locationAccount = sessionStorageUtil.getSessionStorage('account');
        this.getData(this.dynamicInfoData);
    }
}
</script>
<style scoped>


.placehodler-box {
    height: 150px;
    background-color: #fef3dfc7;
    border: 1px solid #d2c8e6;
    text-align: center;
    line-height: 150px;
    color: #aca3c1;
    border-radius: 5px;
    font-size: 15px;
}


/* 说说外壳 -------*/
.dynamic-wrapper .dynamicInfo-box {
    margin: 0px 0px 20px 0px;
    border: 1px solid #fdcfa1;
    background-color: #fef3dfc7;
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
    background-color: #fff4e2;
    border-radius: 8px;
    color: #f9b180;
    border: 1px solid rgba(254, 150, 63, 0.32);
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
    color: #827e8c;
    border-top: 1px solid #d2c8e6;
    border-bottom: 1px solid #d2c8e6;
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

/* 评论区------------ */
.talks-box {
    font-size: 14px;
}
.reply-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 8px 0px;
}
.reply-item.reply-c {
    margin-left: 30px;
}
.reply-item img{
    width: 35px;
    height: 35px;
    border: 1px solid #d2c8e6;
    border-radius: 4px;
}
.reply-item .time-box {
    color: #827e8c;
}
.reply-item .nickname {
    color: #5d4a92;
    cursor: pointer;
}
.reply-item .nickname:hover {
    color: #762dfd;
}
.reply-item .reply {
    margin-left: 5px;
}
.reply-item .reply-content {
    max-width: 260px;
    height: 20px;
    max-height: 40px;
    display: inline-block;
}
.reply-item .reply-content:hover {
    cursor: pointer;
    background-color: #e4e2e6;
}
.reply-item .reply-item-right {
    margin-left: 6px;
    display: flex;
    flex-direction: row;

}


.more-reply-box {
    height: 30px;
    background-color: #fe833f4d;
    color: #d2956c;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}
</style>


