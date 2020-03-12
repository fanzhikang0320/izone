<template>
  <el-input
    v-model="searchKeyWord"
    placeholder="请输入要查找的账号"
    clearable
    class="search-box"
    size="small"
        >
            <el-button type="primary" icon="el-icon-search" size="small" slot="append" @click="handleSearch">搜索</el-button>
  </el-input>
</template>

<script>
var  sessionStorageUtil = require('../utils/sessionStorage.js');
export default {
    data () {
        return {
            searchKeyWord: ''
        }
    },
    computed: {
        key() {
            return this.searchKeyWord;
        }
    },
    methods: {
        // //点击搜索按钮进行搜索,先去查找判断是否有该用户，在进行跳转
        handleSearch () {
            if (this.searchKeyWord.trim() == '') {
                this.$message({
                    type: 'warning',
                    message: '请输入要搜索的账号！'
                })
                return ;
            }
            sessionStorageUtil.setSessionStorage('searchKey',this.searchKeyWord);
            this.$router.push('/home/firstpage/search');
            window.location.reload();
        }
                       
    },
    mounted () {
        if (sessionStorageUtil.getSessionStorage('searchKey')) {
             this.searchKeyWord = sessionStorageUtil.getSessionStorage('searchKey')
        } else {
            this.searchKeyWord = '';
        }
       
    },
    

}
</script>

<style scoped>
.search-box {
    margin-top: 15px;
    width: 250px;
    font-size: 10px;
}
</style>