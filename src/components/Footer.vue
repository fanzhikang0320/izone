<template>
  <div class="footer-wrapper">
    <div class="footer-left">
      <p class="copyright">
       Copyright © 2020 www.fanzhikang.com All rights reserved
      </p>
      <div class="footer-bottom">
        <i class="el-icon-info"></i>
        <p class="descInfo">本网站仅作为案例使用，未经授权禁止用于商业目的！</p>
      </div>
    </div>
    <div class="footer-right">
      联系站长：
      <el-tooltip effect="light">
        <img src="@/assets/img/wechatcode.jpg" alt="微信二维码" slot="content" style="width:100px;height:100px;">
        <img src="@/assets/img/wechat.png" alt="wechat" title="站长微信">
      </el-tooltip>
      <el-tooltip effect="light">
        <img src="@/assets/img/qqcode.jpg" alt="qq二维码" slot="content" style="width:100px;height:100px;">
        <img src="@/assets/img/qq.png" alt="qq" title="站长QQ">
      </el-tooltip>
      邮箱：zhikangfan@qq.com
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.footer-wrapper {
  width: 1024px;
  min-width: 1024px;
  height: 60px;
  background-color: #fff;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  

}
.footer-right {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
}
.footer-right img {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.footer-bottom {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.footer-bottom .descInfo {
  margin: 8px 0;
  font-size: 13px;
}
.copyright {
  font-size: 12px;
  margin: 8px 0 0 0;
  margin-left: 15px;
}
.footer-left {
  display: flex;
  flex-direction: column;

}
</style>
