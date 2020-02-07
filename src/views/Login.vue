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
        formSubmit () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    //校验成功,开启loading，发送请求，成功关闭loading，跳转，失败关闭loading，弹框
                    window.console.log(this.ruleForm);
                    this.isLoading = true;
                    this.btnContent = '登录中...'
                    setTimeout(() => {
                        this.isLoading = false;
                        this.btnContent = '立即登录';
                        window.open('/home','_self');
                    },3000);


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