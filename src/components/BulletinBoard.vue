<template>
    <div class="bulletin-wrapper">
        <p class="title">网站公告</p>
        <div class="bulletin-box">

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
<style scoped>
.bulletin-wrapper {
    width: 190px;
    height: 350px;
    background-color: #fff;
    border: 1px solid #d2c8e6;
    border-radius: 6px;
}
.bulletin-wrapper .title {
    padding: 5px 0px 5px 0px;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #28c1f0;

}
/* 公告内容区------------- */
.bulletin-wrapper .bulletin-box {
    background-color: #7df06e;
    height: 284px;
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
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
