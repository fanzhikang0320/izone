<template>
  <el-container class="container">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
      <!-- <Main></Main> -->
    </el-main>
    <el-footer class="footer">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
// import Main from '@/components/Main.vue';
export default {
  data () {
    return {

    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.container {
  /* background-color: gray; */
  background-color: rgb(233,233,233);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.header {
  /* background-color: red; */
}
.main {
  /* background-color: blue; */
}
.footer {
  /* background-color: yellow; */
}
</style>