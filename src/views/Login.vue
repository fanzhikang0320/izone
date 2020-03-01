<template>
    <div class="form-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="right">
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" :loading="isLoading" round @click="formSubmit">{{btnContent}}</el-button>
            </el-form-item>
        </el-form>
        <el-link type="success" class="link" href="/register">没有账号？马上去注册</el-link>
    </div>
</template>

<script>
var cookieUtils = require('../utils/cookie.js');
export default {
    data () {
        var validateAccount = (rule,value,callback) => {
            if (!value) {
                callback(new Error('账号不能为空！'));
            } else {
                callback();
            }
        };
        var validatePassword = (rule,value,callback) => {
            if (!value) {
                callback(new Error('密码不能为空！'));
            } else {
                callback();
            }
        }
        return {
            ruleForm: {
                account: '',
                password: ''
            },
            rules: {
                account: [{validator: validateAccount}],
                password: [{validator: validatePassword}]
            },
            checked: false,
            btnContent: '立即登录',
            isLoading: false
        }
    },
    methods: {
        async formSubmit () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    //校验成功,开启loading，发送请求，成功关闭loading，跳转，失败关闭loading，弹框
                    this.isLoading = true;
                    this.btnContent = '登录中...';
                    let that = this;
                    this.axios.post('/api/getlogin',this.ruleForm)
                        .then((res) => {
                            //判断返回结果是否可以登录
                            if (res.data.isLogin) {
                                //可以登陆
                                that.isLoading = false;
                                that.btnContent = '立即登录';
                                //是否要种cookie
                                if (that.checked) {
                                    cookieUtils.setCookie('account',this.ruleForm.account,1)
                                }
                                window.open('/home','_self');
                               
                            } else {
                                that.isLoading = false;
                                that.btnContent = '立即登录';
                                that.$message({
                                    type: 'error',
                                    message: '账号或密码输入错误'
                                })
                            }
                        })
                        .catch((err) => {
                            window.console.log(err);
                        })

                } else {
                    //验证规则失败，返回不通过的字段属性,弹出警告
                    this.$message({
                        type: 'warning',
                        message: '账户或密码不能为空！'
                    })
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.form-container {
    border: 1px solid #000;
    margin: 0 auto;
    width: 450px;
    padding: 30px;
}
.btn {
    width: 150px;
    margin-left: 80px;
}
.link {
    font-size: 12px;
    float: right;
    transform: translateY(-15px);
}
</style>