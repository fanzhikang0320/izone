<template>
<div class="wrapper">
    <el-row>
        <el-col :span="6">
            <Weather></Weather>
        </el-col>
        <el-col :span="11">
            <el-menu
            :default-active="active"
            mode="horizontal"
            class="nav-box"
        >
                <el-menu-item index="home" @click="gotoFirstpage">首页</el-menu-item>
                <el-menu-item index="diary" @click="gotoDiarypage">成长日记</el-menu-item>
                <el-menu-item index="other" @click="gotoOtherpage">其它案例</el-menu-item> 
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
import Weather from '@/components/Weather.vue';
import Search from '@/components/Search.vue';
export default {
    data () {
        return {
            active: 'home'
        }
    },
    components: {
        Weather,
        Search
    },
    methods: {
        //前往主页面
        gotoFirstpage () {
            this.$router.push('/home/firstpage');
        },
        // 前往成长日记页面
        gotoDiarypage () {
            this.$router.push('/home/diarypage');
        },
        // 前往其它案例页面
        gotoOtherpage () {
            this.$router.push('/home/otherpage');
        },
        //前往关于本站页面
        gotoAboutpage () {
            this.$router.push('/home/aboutpage');
        }
    },
    mounted () {

    }
}
</script>   

<style scoped>
.wrapper {
    width: 1024px;
    min-width: 1024px;
    margin: 0 auto;
    background-color: #ffffff;
}
.nav-box {
    padding-left: 30px;
    font-weight: bold;
}

</style>