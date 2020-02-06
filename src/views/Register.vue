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
                    <el-radio-group v-model="sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
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
        return {
            formData: {
                nickname: '',
                account: '',
                password: '',
                confirmPassword: '',
                validateCode: ''
            },
            rules: {
                nickname: [{validator: validateName}],
                account: [{validator: validateAccount}],
                password: [{validator: validatePassword}],
                confirmPassword: [{validator: validateConfirm}],
                validateCode: [{validator: validateVCode}]
            },
            sex: 1,
            buttonContent: '获取验证码',
            isLoading: false, //控制验证码的loading
            code: 1234 //验证码
        };
    },
    methods: {
        //提交表单
        formSubmit () {
            this.$refs['ruleForm'].validate((valid,error) => {
                if (valid) {
                    //加载loading
                    const loading = this.$loading({
                        lock: true,
                        text: '正在提交中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0,0,0,0.7)'
                    });
                    //向服务器发送表单数据,验证账号是否已被注册
                    //......
                    //取消loading，弹框，跳转
                    setTimeout(() => {
                        loading.close(); //关闭全局loading
                        this.$confirm('您已完成注册，是否去登录？','提示',{
                            confirmButtonText: '确定',
                            cancelButtonText: '暂时不用',
                            type: 'success'
                        }).then(() => {
                            //点击确定,跳转至登录页面
                            window.open('/login','_self');

                        }).catch(() => {
                            //点击取消，清空所有内容
                            this.formReset();
                        })
                        this.formReset();
                    },2000)
                } else {
                    window.console.log(error); //打印不符合验证规则的字段
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
            this.isLoading = true;
            this.buttonContent = '正在获取';
            // 。。。。
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