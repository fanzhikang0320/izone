<template>
    <div class="bulletin-wrapper">
        <p class="title">网站公告</p>
        <div class="bulletin-box">
            <div v-if="msgData.length != 0"></div>
            <div v-else class="no-more">
                <span v-if="isLoadingMsgData">加载中... (◉ω◉υ)⁼³₌₃<i class="el-icon-loading"></i></span>
                <span v-else>sorry！ 人家也是有底线的嘛~ ≦(._.)≧</span>
            </div>
        </div>
        <div class="btn-box">
          <span>
              <i class="el-icon-arrow-left"></i>
          </span>
          <span>
              <i class="el-icon-arrow-right"></i>
          </span>
          <span>
              <i class="el-icon-more"></i>
          </span>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msgData: [],
            isLoadingMsgData: true
        }
    }
}
</script>
<style scoped>
.bulletin-wrapper {
    width: 190px;
    height: 350px;
    min-height: 350px;
    border: 1px solid #fdcfa1;
    background-color: #fef3dfc7;
    border-radius: 5px;
    overflow: hidden;
}
.bulletin-wrapper .title {
    padding: 5px 0px 5px 0px;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #ff8c5f;
    letter-spacing: 2px;

}
/* 公告内容区------------- */
.bulletin-wrapper .bulletin-box {
    background-color: #fef3dfc7;
    height: 284px;
}
.bulletin-wrapper .bulletin-box .no-more {
    width: 100%;
    height: 350px;
    line-height: 350px;
    text-align: center;
    font-size: 14px;
    color: #f76f3f;
}
/* 公告底部区域----------- */
.btn-box {
    height: 25px;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.btn-box span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 3px 8px 0px 8px;
    text-align: center;
    line-height: 20px;
    font-weight: bolder;
    font-size: 15px;
    color: #857a99;
    cursor: pointer;
}
.btn-box span:hover {
    background-color: #ede9f5;
}
</style>

