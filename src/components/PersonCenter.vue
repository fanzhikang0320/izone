<template>
    <div class="personCenter-wrapper">
        <el-row>
            <el-col :span="7" class="left">

                <!-- 个人信息区域 -->
                <div class="information" v-for="(item,index) in userInfo" :key="index">
                    <el-popover trigger="hover" placement="bottom">
                        <el-upload
                            :action="'http://127.0.0.1:8081/api/updateHeadImg?account='+ locationAccount" 
                            :multiple="false"
                            :show-file-list="false"
                            accept="image/*"
                            name="avatar"
                            :on-success="uploadAvatarSuccess"
                            :on-change="fileChange"
                        >
                            <span class="updateAvatar-text">修改头像</span>
                        </el-upload>
                        <img :src="'http://127.0.0.1:8081/api/getImgData?path=' + item.imgpath" class="headImg" slot="reference">
                    </el-popover>
                    <div class="nickname">{{item.nickname}}</div>
                    <div class="info-content">
                        年龄：{{getAge(item.birthday)}}岁
                    </div>
                    <div class="info-content">
                        性别：{{item.sex == '1' ? '男' : '女'}}
                    </div>
                    <div class="info-content">
                        生日：{{getBirthday(item.birthday)}}
                    </div>
                    <div class="info-content">
                        现居住地：{{item.region}}·{{item.city}}
                    </div>
                    <div class="edit-content">
                        <span class="edit" @click="editInfo"><i class="el-icon-edit"></i>编辑资料</span> 
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
                        <div class="visitor-area-box" v-if="this.visitorData.length != 0">
                            <div class="visitor-area">
                                <div class="visitor-item">
                                    <img src="../assets/img/headImg.png" alt="">
                                    <span class="user-nickname">杀手不太冷</span>
                                </div>
                                <div class="time-box">2020.02.27</div>
                            </div>
                        </div>
                        <div class="no-more" v-else>
                            <span v-if="this.isLoadingVisitor">
                                努力获取数据中 ー=≡Σ( ε¦) 0...<i class="el-icon-loading"></i>
                            </span>
                            <span v-else>sorry！人家也是有底线的嘛~ (づ◡ど)</span>
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

                <el-dialog :visible="isVisible" title="修改个人信息" width="400px" :show-close="false" class="dialog">
                    <el-form 
                    ref="editForm"
                    :model="formData"
                    :rules="rules" 
                    label-width="80px"
                    class="dialog-form"
                    >
                        <el-form-item label="昵称" prop="nickname">
                            <el-input type="text" v-model="formData.nickname" placeholder="请输入不超过12位字符"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="formData.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker v-model="formData.birthday" placeholder="选择日期" format="yyyy年MM月dd日" value-format="timestamp" type="date"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="resetForm" size="small">取消</el-button>
                            <el-button type="primary" @click="submitForm" size="small">确定</el-button>
                        </el-form-item>
                        
                    </el-form>
                        
                </el-dialog>

            </el-col>
            <!-- 中间内容区 -->
            <el-col :span="12" class="center">
                <router-view></router-view>
            </el-col>
             <el-col :span="5" class="right">
                 <div class="dynamic-num-box">
                     <span>累计发表</span>
                     <span>{{dynamicNum}}</span>
                     <span>篇</span>
                 </div>
                 <!-- 广告区域 -->
                <div class="ad-box">
                    <el-carousel
                        indicator-position="none"
                        arrow="never"
                    >
                        <el-carousel-item>
                            codeing.. <i class="el-icon-loading"></i>
                        </el-carousel-item>
                        <el-carousel-item>
                            codeing... <i class="el-icon-loading"></i>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
           
        </el-row>
    </div>
</template>
<script>
var sessionStorageUtils = require('../utils/sessionStorage.js');
export default {
    data() {
        var validateName = (rule,value,callback) => {
            // rule： 此input框校验规则 value: 输入框当中的内容 callback: 提示的错误信息
            let flag = RegExp(/[\s]/).test(value);
            if (!value) {
                return callback(new Error('昵称不能为空！'));
            } else if (flag) {
                return callback(new Error('不能包含空白字符！'));
            } else if (value.length > 12) {
                return callback(new Error('不能输入超过12位字符！'));
            } else {
                callback();
            }
        };
        var validateBirthday = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('请选择日期！'));
            } else {
                callback();
            }
        };
        return {
            locationAccount: sessionStorageUtils.getSessionStorage('account'),
            userInfo: [],
            dynamicNum: 0,
            isVisible: false,
            formData: {
                nickname: '',
                sex: 1,
                birthday: ''
            },
            rules: {
                nickname: [{validator: validateName}],
                birthday: [{validator: validateBirthday}]
            },
            visitorData: [], //访客数据
            isLoadingVisitor: true //用户是否加载访客数据中
        }
    },
    methods: {
        async getUserInfo() {
            
            var res = await this.axios.get('/api/getUserInfo',{params: {account: this.locationAccount}});
            if (res.data.type == 'success') {
                this.userInfo = res.data.userInfoData;
            }
        },
        getAge(time) {
            var nowDate = new Date();
            var oldDate = new Date(time);
            var nowMonth = nowDate.getMonth() + 1;
            var oldMonth = oldDate.getMonth() + 1;
            var month = nowMonth - oldMonth;
            var newDay = nowDate.getDate();
            var oldDay = oldDate.getDate();
            var day = newDay - oldDay;
            var year = nowDate.getFullYear() - oldDate.getFullYear() - 1;
            var age = 0;
            //不满一年的按月份和天数算够不够
            if (year <= 0) {
               age = 0
            } else if (year > 0) {
                age = year;
            }
            //当月份已经过了出生的月份年龄+1
            if (month > 0) {
               age = age + 1;
            } else if (month == 0) {
                //还在当月判断天数是不是够了
                if (day >= 0) {
                    // 年龄+1
                   age = age + 1;
                }
            }
            return age
        },
        getBirthday(time) {
            var date = new Date(time);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return `${month}月${day}日`
        },
        //获取发表说说数量
        async getDynamicNum() {
            var res = await this.axios('/api/getDynamicNumByAccount',{params: {account: this.locationAccount}})
            if (res.data.type == 'success') {
                this.dynamicNum = res.data.data;
            }
        },
        //点击编辑个人信息
        editInfo() {
            this.isVisible = true;
        },
        submitForm() {
            
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.axios.post('/api/updateUserNickname',{nickname: this.formData.nickname,account: this.locationAccount})
                        .then((res) => {
                            if (res.data.type == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '更新昵称成功！'
                                })
                                this.userInfo[0].nickname = this.formData.nickname;
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '更新昵称失败，请稍后重试！'
                                })
                            }
                        })
                    this.axios.post('/api/updateUserSex',{sex: this.formData.sex,account: this.locationAccount})
                        .then((res) => {
                            if (res.data.type == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '更新性别成功！'
                                })
                                this.userInfo[0].sex = this.formData.sex;
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '更新性别失败，请稍后重试！'
                                })
                            }
                        })
                    this.axios.post('/api/updateUserBirthday',{birthday: this.formData.birthday,account: this.locationAccount})
                        .then((res) => {
                            if (res.data.type == 'success') {
                                this.$message({
                                    type: 'success',
                                    message: '更新生日成功！'
                                })
                                this.userInfo[0].birthday = this.formData.birthday;
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '更新生日失败，请稍后重试！'
                                })
                            }
                        }) 
                    this.$forceUpdate();
                    window.location.reload();
                    this.isVisible = false;
                }
                
            })
        },
        resetForm() {
            this.$refs['editForm'].resetFields();
            this.isVisible = false;
        },
        // 更新头像返回结果
        uploadAvatarSuccess(res) {
            if (res.type == 'success') {
                this.$message({
                    type: 'success',
                    message: '更新头像成功！'
                })
            } else {
                this.$message({
                    type:"error",
                    message: '更新头像失败，请稍后再试！'
                })
            }
        },
        //选择要上传的头像
        fileChange(file,fileList) {
            fileList = [];
            if (file.status == 'ready') {
                fileList.push(file);
            }
        }

    },
    created() {
        this.locationAccount = sessionStorageUtils.getSessionStorage('account');
        this.getDynamicNum();
    },
    mounted() {
        this.getUserInfo();
        this.getDynamicNum();
    }
}
</script>
<style scoped>
.personCenter-wrapper {
    width: 1024px;
    min-width: 1024px;
    margin: 0 auto;

}
.personCenter-wrapper .left {
    padding-right: 30px;
}

/* 用户信息------------- */

.information {
    border: 1px solid #fdcfa1;
    border-radius: 4px;
    font-size: 13px;
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fef3dfc7;
}
.information .headImg {
    display: inline-block;
    text-align: center;
    width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
}
.updateAvatar-text:hover {
    cursor: pointer;
    color: #409EFF;
}
.information .nickname {
    font-size: 18px;
    font-weight: bold;
    text-align: center;

}
.information .info-content {
    width: 100%;
    height: 35px;
    /* background-color: #f5f0ff; */
    border-bottom: 1px solid #fdcfa1;
    line-height: 35px;
    color: #706982;
    padding-left: 10px;
}
.information .edit-content {
    width: 100%;
    height: 35px;
    line-height: 35px;
}
.information .edit-content .edit {
    color: #409EFF;
    float: right;
    cursor: pointer;
}
.information .info-content .edit:hover {
    color: #0a82fa;
}

.msg-box {
    padding: 0px 10px;
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    border: 1px solid #fdcfa1;
    border-radius: 4px;
    color: #ec8d59;
    background-color: #fef3dfc7;
}
.msg-box  div{
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}
.msg-box  div:hover {
    color: #e9773a;
}
/* 访客区域------------------ */

.visitor-box {
    margin-top: 25px;
    background-color: #fef3dfc7;
    border-radius: 4px;
   border: 1px solid #fdcfa1;
    
}
.visitor-box .title {
    font-size: 16px;
    font-weight: bold;
    padding-left: 7px;
    background-color:rgba(245, 163, 102, 0.7);
    color: #fff;
    height: 35px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    line-height: 35px;
    letter-spacing: 2px;

}
.visitor-box .visitor {
    height: 420px;
    max-width: 420px;
    margin-top: 8px;
}
.visitor-box .visitor .no-more {
    font-size: 14px;
    color: #fe6232;
    width: 100%;
    height: 420px;
    line-height: 420px;
    text-align: center;
}
.visitor-box .visitor-area-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.visitor-area {
    /* background-color: aqua; */
    width: 80px;
    margin-left: 7px;
    margin-top: 5px;
}
.visitor-area .visitor-item {
    position: relative;
    width: 75px;
    height: 75px;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid #fdcfa1;
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
    background-image: linear-gradient(to bottom,transparent,rgba(246, 111, 63,.79))
}
.visitor-area .time-box {
    font-size: 14px;
    text-align: center;
    color: #f54b28;
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
    border: 1px solid #fdcfa1;
    background-color: #fef3dfc7;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    color: #f76d3e;
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
    border-radius: 4px;
    border: 1px solid #fdcfa1;
    background-color: #fef3dfc7;
}


</style>
