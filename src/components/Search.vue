<template>
  <el-autocomplete 
    v-model="searchKeyWord"
    :fetch-suggestions="querySearch"
    @select="handleSelect"
    placeholder="请输入查找的用户名或ID"
    clearable
    class="search-box"
        >
        <el-button type="primary" slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </el-autocomplete>
</template>

<script>
export default {
    data () {
        return {
            hotKeyWord: [],
            searchKeyWord: ''
        }
    },
    methods: {
        querySearch (queryString,callback) {
            var hotKeyWord = this.hotKeyWord;
            var results = queryString ? hotKeyWord.filter(this.createFilter(queryString)) : hotKeyWord;
            callback(results);
        },
        createFilter (queryString) {
            return (item) => {
                return (item.value.indexOf(queryString) === 0);
            }
        },
        //点击推荐出来的搜索排行榜，进行搜索
        handleSelect (item) {
            window.console.log(item);
        },
        //点击搜索按钮进行搜索
        handleSearch () {
            window.console.log(this.searchKeyWord);
        }
    },
    mounted () {
        this.hotKeyWord = [
            {value: 'hha'},
            {value: '999'}
        ]
    }
}
</script>

<style scoped>
.search-box {
    margin-top: 10px;
}
</style>