<template>
    <div>
        <TextEditor @changeData="changeData"/>
        <Dynamic/>
    </div>
</template>
<script>
import Dynamic from '@/components/Dynamic.vue'
import TextEditor from '@/components/TextEditor.vue'
import { setTimeout } from 'timers';
var sessionStorageUtil = require('../utils/sessionStorage.js');
export default {
    components: {
        Dynamic,
        TextEditor
    },
    data() {
        return {
            data: [],
            startNum: 0,
            fn1:'',
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
        //根据自己的账号去进行获取内容
        getDynamicData(start) {
            //开启加载loading
            this.$store.commit('changeLoading',true)
            this.axios.get('/api/getDynamicInfoByAccount',{params: {account: this.locationAccount,start: start,nums: this.limit}})
                .then((res) => {
                    if (res.data.type == 'success') {
                        
                        for (var m = 0; m < res.data.data.length; m++) {
                            this.data.push(res.data.data[m])
                        }
                        if (res.data.data.length < this.limit) {
                            this.$store.commit('changeShowNull',true)
                        }
                        //更改仓库中的数据
                        this.$store.commit('changeData',this.data)
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
                })
             
        },
        changeData(data) {
            this.data.unshift(data);
            this.$store.commit('changeData',this.data)
        }

    },
    created() {
        this.locationAccount = sessionStorageUtil.getSessionStorage('account');
        this.getDynamicData(this.startNum);
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
                that.startNum  = that.startNum + that.limit;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    that.getDynamicData(that.startNum)
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
