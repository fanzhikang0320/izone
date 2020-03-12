<template>
    <div>
        <Dynamic :data="dynamicData"/>
    </div>
</template>
<script>
import Dynamic from '@/components/Dynamic.vue';
var sessionStorageUtils = require('../utils/sessionStorage.js');
export default {
    components: {
        Dynamic
    },
    data() {
        return {
            data: [],
            startNum: 0,
            limit: 12,
            locationAccount: ''
        }
    },
    computed: {
        dynamicData() {
            return this.data
        }
    },
    methods: {
        async getAttention(start) {
             //开启加载loading
            this.$store.commit('changeLoading',true)
            var res = await this.axios.get('/api/getAttention',{params: {account: this.locationAccount}});
            var account;
            if (res.data.type == 'success') {
                var d = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    account = res.data.data[i].targetAccount
                    var result = await this.axios.get('/api/getDynamicInfoByAccount',{params: {account: account,start: start,nums: this.limit}})
    
                    if (result.data.type == 'success') {
                        for (var k = 0; k < result.data.data.length; k++) {
                            d.push(result.data.data[k]);
                        }
                    }
                }
                //判断数据是否取空
                if (d.length < this.limit) {
                    this.$store.commit('changeShowNull',true)
                }
                this.data = d;
                //更改仓库中的数据
                this.$store.commit('changeData',this.data);
                //取消加载loading
                this.$store.commit('changeLoading',false)
            } else {
                //查找失败
                this.$store.commit('changeShowNull',true)
                //更改仓库中的数据
                this.$store.commit('changeData',this.data)
                    //取消加载loading
                this.$store.commit('changeLoading',false)
            }
            
        }
    },
    created() {
        //获取本地账号
        this.locationAccount = sessionStorageUtils.getSessionStorage('account');
        this.getAttention(this.startNum);
    },
    mounted() {
        var clientHeight;
        var scrollHeight;
        var top;
        var that = this;
        var body = document.getElementById('app');
        var timer;
        // 监听滚动条变化
        body.onscroll = function () {
            clientHeight = document.documentElement.clientHeight; //获取可视区域高度
            scrollHeight = document.documentElement.scrollHeight; //获取滚动条高度
            top = document.documentElement.scrollTop; //获取滚动条距离滚动区域顶部高度
            if (scrollHeight - clientHeight - top == 0) {
                that.startNum  = that.startNum + that.limit
                clearTimeout(timer);
                timer = setTimeout(function () {
                    that.getAttention(that.startNum)
                },500)
            }
        }
       
    },
    beforeDestroy() { 
         document.getElementById('app').onscroll =false;
        this.$store.commit('changeData',[]);
        this.$store.commit('changeLoading',true);
        this.$store.commit('changeShowNull',false)
    }

}
</script>
