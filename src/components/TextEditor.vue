<template>
    <div class="textarea-wrapper" v-loading.fullscreen.lock="loading">
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
                <el-button type="primary" size="mini" @click="sendMsg">发表</el-button>
            </div>
        </div>
    </div>
</template>
<script>
// var cookieFun = require('../utils/cookie.js');
var session = require('../utils/sessionStorage.js');
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
            limit: 6, //配置最多可以上传几张图片
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
        // 图片上传之后的响应,关闭loading，只要有响应就清空之前的所有内容
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
                }).then(() => {
                     //将已经写入数据库的东西根据id在重新删掉
                    this.axios.post('/api/deleteDynamicInfo',this.msg)
                    this.clearData();
                })
           
        },
        //点击发表时，发送请求，将图片还有文字外加地址一起发送，开启loading
        async sendMsg() {
            var account = session.getSessionStorage('account');
            //先判断有没有登录
            if (!account) {
                this.$confirm('请您登录账号以后在进行发布！','提示',{
                    showCancelButton: false,
                    type: 'warning',
                    showClose: false
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
                    type: 'warning',
                    showClose: false
                }).then(() => {

                })
                return;
            }
            
            //开启loading
            this.loading = true;
            //从缓存中获取地理位置
            this.dynamicInfo.region = session.getSessionStorage('region');
            this.dynamicInfo.city = session.getSessionStorage('city');
            //将说说内容和城市发送给后端
            var res = await this.axios.post('/api/dynamicInfo',this.dynamicInfo);

            if (res.data.type === 'success') {
                // 将返回的当前说说id，再次抛送给后台，关闭loading
                this.msg.dynamic_id = res.data.dynamic_id;

                // 根据这个id在把它取出来，用于更新本地显示的内容
                this.axios.get('/api/getOneDynamicInfo',{params: {dynamic_id: res.data.dynamic_id}})
                    .then((res) => {
                        if (res.data.type == 'success') {
                            // res.data.data
                            this.$emit('changeData',res.data.data[0])
                        }
                    })
                //提交图片
                this.$refs.upload.submit();
                // 判断是不是还有图片要上传
                if (this.fileList.length == 0) {
                    this.loading = false;
                    //刷新说说
                     this.$message({
                        message: '内容发布成功！',
                        type: 'success'
                    })
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
.textarea-wrapper {
    background-color: #fff;
    margin-bottom: 20px;
}
.textarea-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fef2da99;
    border: 1px solid #feefda;
    border-top: none;
    padding-top: 5px;
    padding-bottom: 5px;
    
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
    background-color: #faf8ff;
    width: 100px;
    list-style: none;
    position: absolute;
    z-index: 2;
    padding: 0;
    margin: 0;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #d2c8e6;
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
    border-bottom: 5px solid #d2c8e6;
    border-top: 5px solid transparent;
}
.textarea-bottom .img-box .upload-box .imgInfo  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3px 5px;
    color: #827e8c;

}
.textarea-bottom .img-box .upload-box .imgInfo  li:hover {
    background-color: #e3ddf0;
    cursor: pointer;
}
.textarea-bottom .img-box .upload-box .imgInfo .text {
    margin: 0;
    padding: 0;
    width: 80px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
}
.textarea-bottom .img-box .upload-box .imgInfo .close-icon {
    cursor: pointer;
    color: rgb(129,120,170);
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