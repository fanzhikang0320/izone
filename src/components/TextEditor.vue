<template>
    <div id="textarea-wrapper" v-loading.fullscreen.lock="loading">
        <el-input
            type="textarea"
            placeholder="说点什么吧"
            v-model="dynamicInfo.content"
            maxlength="150"
            show-word-limit
            :rows=rows
            @focus="handleFocus"
        >
        </el-input>
        <div class="textarea-bottom">
            <div class="img-box">
                <img src="@/assets/img/emoji.png" alt="添加表情" title="添加表情" @click="addEmoji">
                <div class="upload-box">
                    <el-upload
                        action="/api/dynamicImg"
                        multiple
                        :limit="limit"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        ref="upload"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleChange"
                        :on-success="uploadSuccess"
                        :on-error="uploadFail"
                        :data="msg"
                        accept=".jpg,.jpeg,.png,.gif"
                        name="file"
                    >
                        <img src="@/assets/img/photo.png" alt="添加图片" title="上传图片" slot="trigger">
                    </el-upload>
                    <ul class="imgInfo" v-if="fileList.length != 0">
                        <li v-for="(item,index) in fileList" :key="index">
                            <p class="text">{{item.name}}</p>
                            <i class="el-icon-close close-icon" @click="handleRemove(index)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btn-box">
                <el-button type="info" size="mini" @click="clearData">清空</el-button>
                <el-button type="primary" size="mini" @click="sendMsg">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script>
var utils = require('../utils/index.js');
var cookieFun = require('../utils/cookie.js');
export default {
    data() {
        return {
            dynamicInfo: {
                account: '', //客户当前的账号
                region: '', //获取客户端的所在省
                city: '',//获取客户端的所在城市
                content: '', //输入框中的内容
            },
            msg: {
                dynamic_id: ''
            },
            rows: 4, //最多显示几行
            limit: 9, //配置最多可以上传几张图片
            fileList: [],
            loading: false
            
        }
    },
    methods: {
        

        //文本框聚焦，主要是改变展示区域的样式
        handleFocus() {
        },
        //点击添加表情
        addEmoji() {
            this.$message({
                message: '抱歉，暂不支持该功能！'
            })
        },
        //当图片发生改变时执行,这里只用来监听添加图片
        handleChange(file) {
            //如果当前图片的状态是等待上传的，就添加进数组
            if (file.status == 'ready') {
                this.fileList.push(file);
            }
        },
        //移除某个不想上传的图片
        handleRemove(index) {
            this.fileList.splice(index,1);
        },
        //文件超出限制
        handleExceed() {
            this.$confirm('抱歉，最多只能上传9张照片','提示',{
                showCancelButton: false,
                type: 'warning'
            })
        },
        //清空输入内容，和存储的照片列表信息
        clearData() {
            this.dynamicInfo.content =  '';
            this.fileList = [];
        },
        // 上传之后的响应,关闭loading，只要有响应就清空之前的所有内容
        uploadSuccess(result) {
            this.loading = false;
            // 上传成功提示信息
            if (result.type == 'success') {
                this.$message({
                    message: '内容发布成功！',
                    type: 'success'
                })
            } else {
                // 上传失败提示信息
                this.$confirm('图片上传失败！请稍后重新编辑再试！','提示',{
                    showCancelButton: false,
                    type: 'warning'
                })
                //将已经写入数据库的东西根据id在重新删掉
                this.axios.post('/api/deleteDynamicInfo',this.msg)
            }   
            this.clearData();
        },
        // 上传失败（这一步不敢肯定是不是要走进去）
        uploadFail() {
           this.$confirm('图片上传失败！请稍后重新编辑再试！','提示',{
                    showCancelButton: false,
                    type: 'warning'
                })
            //将已经写入数据库的东西根据id在重新删掉
            this.axios.post('/api/deleteDynamicInfo',this.msg)
            this.clearData();
        },
        //点击发表时，发送请求，将图片还有文字外加地址一起发送，开启loading
        async sendMsg() {
            var account = cookieFun.getCookie('account');
            //先判断有没有登录
            if (!account) {
                this.$confirm('请您登录账号以后在进行发布！','提示',{
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    this.clearData();
                })
               
                return;
            }
            this.dynamicInfo.account = account;

            // 如果内容，图片一个都没有要上传的，直接提示返回
            if (this.fileList.length == 0 && this.dynamicInfo.content.trim() == '') {
                this.$confirm('请您编辑文字或图片后发布！','提示',{
                    showCancelButton: false,
                    type: 'warning'
                })
                return;
            }
            
            //开启loading
            this.loading = true;
            //处理地址问题
            try {
                var ip = await utils.getClientIp(this);
                // //获取当前用户详细地址
                var location = await utils.getLocation(this,ip);
                this.dynamicInfo.city = location.city;
                this.dynamicInfo.region = location.region;
            } catch(err) {
                //获取位置失败，采用默认位置
                this.dynamicInfo.city = '未知';
                this.dynamicInfo.region = '中国';
            }
            //将说说内容和城市发送给后端
            var res = await this.axios.post('/api/dynamicInfo',this.dynamicInfo);

            if (res.data.type === 'success') {
                // 将返回的当前说说id，再次抛送给后台，关闭loading
                this.msg.dynamic_id = res.data.dynamic_id;
                //提交图片
                this.$refs.upload.submit();
                // 判断是不是还有图片要上传
                if (this.fileList.length == 0) {
                    this.loading = false
                    this.clearData();
                }
            } else {
                //上传内容失败或者其它原因，清空所有东西，关闭loading
                this.loading = false;
                this.$confirm('内容发布失败！请稍后重新编辑再试！','提示',{
                    showCancelButton: false,
                    type: 'warning'
                })
                .then(() => {
                    this.clearData();
                })
            }
            
        }

    }
}

</script>

<style scoped>
.textarea-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 7px;
    /* background-color: green; */
}

.textarea-bottom .img-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.textarea-bottom .img-box .upload-box {
    position: relative;
}
.textarea-bottom .img-box .upload-box .imgInfo {
    background-color: #fff;
    width: 100px;
    list-style: none;
    position: absolute;
    z-index: 2;
    padding: 0;
    margin: 0;
    font-size: 14px;
}
.textarea-bottom .img-box .upload-box .imgInfo::after {
    position: absolute;
    top: -10px;
    left: 15px;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    border-top: 5px solid transparent;
}
.textarea-bottom .img-box .upload-box .imgInfo  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2px;
}
.textarea-bottom .img-box .upload-box .imgInfo .text {
    margin: 0;
    padding: 0;
    width: 80px;
    background-color: gray;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
}
.textarea-bottom .img-box .upload-box .imgInfo .close-icon {
    cursor: pointer;
}
.textarea-bottom .img-box img {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 10px;
    cursor: pointer;
}
.textarea-bottom .btn-box {
    margin-right: 5px;
}
</style>