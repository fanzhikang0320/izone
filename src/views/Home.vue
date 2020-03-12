<template>
  <el-container class="container">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer class="footer">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
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
  min-height: 100%;
}
</style>