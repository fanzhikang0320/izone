<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html,body {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
  min-height: 100%;
  /* background-color: rgb(233,233,233); */
 
}
#app {
  height: 100%;
  background-image: url('./assets/img/bg.jpg');
  overflow: auto;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
