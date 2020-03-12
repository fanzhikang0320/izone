<template>
<div class="wrapper">
    <el-row>
        <el-col :span="5" style="display: flex;alignItems:center;justifyContent: center;height: 60px;background-color:#fff;">
            <img style="height: 45px;" :src="require('@/assets/img/izone.jpg')" alt="www.izone.life">
        </el-col>
        <el-col :span="12">
            <el-menu
            :default-active="active"
            mode="horizontal"
            class="nav-box"
            background-color="#ff8c5f"
            text-color="#fff"
            active-text-color="#fff"
        >
                <el-menu-item index="home" @click="gotoFirstpage">首页</el-menu-item>
                <el-menu-item index="diary" @click="gotoDiarypage">成长日记</el-menu-item>
                <el-menu-item index="other" @click="gotoOtherpage">其它案例</el-menu-item>
                <el-menu-item index="personCenter" @click="gotoPersonCenter">个人中心</el-menu-item> 
                <el-menu-item index="about" @click="gotoAboutpage">关于本站</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="7">
            <Search />
        </el-col>
    </el-row>

</div>
</template>

<script>

import Search from '@/components/Search.vue';
export default {
    data () {
        return {
            active: 'home'
        }
    },
    components: {
        Search
    },
    methods: {
        //前往主页面
        gotoFirstpage () {
            this.active = 'home'
            this.$router.push('/home/firstpage');
        },
        // 前往成长日记页面
        gotoDiarypage () {
            this.active = 'diary'
            this.$router.push('/home/diarypage');
        },
        // 前往其它案例页面
        gotoOtherpage () {
             this.active = 'other' 
            this.$router.push('/home/otherpage');
        },
        //前往关于本站页面
        gotoAboutpage () {
            this.active = 'about'
            this.$router.push('/home/aboutpage');
        },
        //前往个人中心
        gotoPersonCenter() {
            this.active = 'personCenter'
            this.$router.push('/home/personCenter');
        },
        settingActive() {
            var link = this.$route.matched;
            for (var i = 0; i < link.length; i++) {
                if (link[i].path.indexOf('firstpage') != -1) {
                    this.active = 'home'
                } else if (link[i].path.indexOf('diarypage') != -1) {
                    this.active = 'diary'
                } else if (link[i].path.indexOf('otherpage') != -1) {
                    this.active = 'other' 
                } else if (link[i].path.indexOf('aboutpage') != -1) {
                    this.active = 'about'
                } else if (link[i].path.indexOf('personCenter') != -1) {
                    this.active = 'personCenter'
                }
            }
        }
    },
    created() {
        this.settingActive();
        
    }
}
</script>   

<style scoped>
.wrapper {
    width: 1024px;
    min-width: 1024px;
    margin: 0 auto;
    background-color: #ff8c5f;
    border-radius: 5px;
    overflow: hidden;
}
.nav-box {
    padding-left: 30px;
    font-weight: bold;
}

</style>