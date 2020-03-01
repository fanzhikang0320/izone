<template>
  <div class="diary-wrapper">

    <el-row :gutter="20">
      <el-col :span="17">
        <el-timeline
          reverse
        >
          <el-timeline-item
            timestamp="2020/02/27"
            placement="top"
          >
            <el-card>
              啦啦啦
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="2020/02/26"
            placement="top"
          >
            <el-card>
              啦啦啦
            </el-card>
          </el-timeline-item>

        </el-timeline>
      </el-col>
      <el-col :span="7">
          <div class="diary-right">
            <div class="top-right-ad">
              <el-carousel
                indicator-position="none"
              >
                <el-carousel-item>
                  这里是第一
                </el-carousel-item>
                <el-carousel-item>
                  这里是第2
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
      </el-col>
    </el-row>
   
  </div>  
</template>
<script>
export default {
    
}
</script>
<style scoped>
.diary-wrapper{
  width: 1024px;
  min-width: 1024px;
  max-width: 1024px;
  margin: 0 auto;
  background-color: rgb(92, 226, 92);
}
.diary-right {
  background-color: pink;
  padding: 0px 0px 0px 15px;
}
.top-right-ad {
  height: 350px;
  background-color: #fff;
}
</style>

