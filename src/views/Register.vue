<template>
    <div class="wrapper">
        <div class="form-container">
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-position="right" label-width="80px" status-icon>
                <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" v-model="formData.nickname" placeholder="请输入不超过12位字符"></el-input>
                </el-form-item>
                <el-form-item label="账户" prop="account">
                    <el-input type="text" v-model="formData.account" placeholder="请输入11位手机号码"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="请输入6-16位数字、字母、特殊字符"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="formData.confirmPassword"></el-input>
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
                <el-form-item label="验证码" prop="validateCode">
                    <el-input type="text" v-model="formData.validateCode" class="code"></el-input>
                    <el-button type="success" :loading="isLoading" @click="getValidateCode">{{buttonContent}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button round type="primary" @click="formSubmit" class="btn">注册</el-button>
                    <el-link class="link" href="/login" target="_self" type="primary">已有账号，速去登录</el-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
export default {
    data: function() {
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
        var validateAccount = (rule,value,callback) => {
            let flag = RegExp(/^1{1}[0-9]{9}[1-9]{1}$/).test(value);
            if (!value) {
                return callback(new Error('账户不能为空！'));
            } else if (value.length != 11 || !flag) {
                return callback(new Error('请输入正确的11位手机号码'));
            } else {
                callback();
            }
        };
        var validatePassword = (rule,value,callback) => {
            let flag = RegExp(/[\s]/).test(value);
            if (!value) {
                return callback(new Error('密码不能为空！'));
            } else if (flag) {
                return callback(new Error('不能包含空白字符！'));
            } else if (value.length < 6 || value.length > 16) {
                return callback(new Error('密码长度只能为6-16位！'));
            } else {
                callback();
            }
        };
        var validateConfirm = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('确认密码为空！'));
            } else if (value !== this.formData.password) {
                return callback(new Error('两次密码不一致！'));
            } else {
                callback();
            }
        };
        var validateVCode = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空！'));
            } else if (value != this.code) {
                return callback(new Error('验证码错误！'));
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
            formData: {
                nickname: '',
                account: '',
                password: '',
                confirmPassword: '',
                validateCode: '',
                birthday: '',
                sex: 1
            },
            rules: {
                nickname: [{validator: validateName}],
                account: [{validator: validateAccount}],
                password: [{validator: validatePassword}],
                confirmPassword: [{validator: validateConfirm}],
                validateCode: [{validator: validateVCode}],
                birthday: [{validator: validateBirthday}]
            },
            buttonContent: '获取验证码',
            isLoading: false, //控制验证码的loading
            code: '' //验证码
        };
    },
    methods: {
        //提交表单
        formSubmit () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    //加载loading
                    const loading = this.$loading({
                        lock: true,
                        text: '正在提交中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0,0,0,0.7)'
                    });
                    //向服务器发送表单数据,验证账号是否已被注册
                    var that = this;
                    axios.post('/api/register',this.formData)
                        .then(function (res) {
                            loading.close(); //关闭加载
                            if (res.data.isRegister) {
                                that.$confirm('您已完成注册，是否去登录？','提示',{
                                    confirmButtonText: '确定',
                                    cancelButtonText: '暂时不用',
                                    type: 'success'
                                }).then(() => {
                                    window.open('/login','_self');
                                }).catch(() => {
                                    //点击取消，清空所有内容
                                    that.formReset();
                                })
                            } else {
                                that.$confirm('该账号已被注册','提示',{
                                    confirmButtonText: '好的',
                                    showCancelButton: false,
                                    type: 'warning'
                                }).then( () => {
                                    that.formReset();
                                }).catch(() => {
                                    that.formReset();
                                })
                            }
                            
                            that.formReset(); //清空表单数据
                        })
                        .catch(function (err) {
                            window.console.log(err);
                        })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写符合规则的内容！'
                    });
                    return false;
                }
            });
        },
        //重置表单
        formReset () {
            this.$refs['ruleForm'].resetFields();
        },
        //获取验证码
        getValidateCode () {
            //发送请求，由后端进行生成
            this.code = '';
            this.isLoading = true;//开启loading
            this.buttonContent = '正在获取';
            var that = this;
            //请求验证码
            axios.get('/api/getcode')
                .then((res) => {
                    that.code = res.data.code;
                    this.$notify({
                        title: '验证码',
                        message: res.data.code,
                        type: 'success',
                        duration: 5000
                    })
                    that.isLoading = false; //取消加载loading
                    that.buttonContent = '获取验证码'; //更改按钮文字
                })
                .catch((err) => {
                    window.console.log(err);
                })
        }
        
    },
    

}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}
.form-container {
    margin: 0 auto;
    width: 400px;
    padding: 20px;
    border: 1px solid #000;

}
.code {
    width: 135px;
}
.btn {
    width: 150px;
    margin: 20px auto;
}
.link {
    margin-left: 10px;
    font-size: 12px;
    margin-top: 10px;
}
</style>