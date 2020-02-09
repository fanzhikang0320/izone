<template>
  <el-container class="container">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-main class="main">
      <Main></Main>
    </el-main>
    <el-footer class="footer">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Main from '@/components/Main.vue';
export default {
  data () {
    return {

    }
  },
  components: {
    Header,
    Footer,
    Main
  }
}
</script>

<style scoped>
.container {
  background-color: gray;
}
.header {
  background-color: red;
}
.main {
  background-color: blue;
}
.footer {
  background-color: yellow;
}
</style>