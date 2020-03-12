<template>
  <div class="diary-wrapper">

    <el-row :gutter="20">
      <el-col :span="17" v-loading="isLoading">
        <div v-if="diaryData.length != 0">
          <el-timeline
            reverse
          >
            <el-timeline-item
              :timestamp="getTime(item.ctime)"
              placement="top"
              v-for="(item,index) in diaryData"
              :key="index"
            >
              <el-card>
                {{item.content}}
              </el-card>
            </el-timeline-item>

          </el-timeline>
        </div>
        <div class="nomore" v-else>
          {{isLoading ? '正在获取中...' : '人家也是有底线的嘛  o(╥﹏╥)o'}}
        </div>
      </el-col>
      <el-col :span="7">
          <div class="diary-right">
            <div class="weather-box">
              <Weather />
            </div>
            
            <div class="top-right-ad">
              <el-carousel
                indicator-position="none"
              >
                <el-carousel-item>
                 codeing...
                </el-carousel-item>
                <el-carousel-item>
                  codeing...
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
      </el-col>
    </el-row>
   
  </div>  
</template>
<script>
import Weather from '@/components/Weather.vue';
export default {
    data() {
      return {
        diaryData: [],
        isLoading: false
      }
    },
    components: {
      Weather
    },
    methods: {
      getDiaryData() {
        this.isLoading = true;
        this.axios.get('/api/getDiary')
          .then((res) => {
            if (res.data.type == 'success') {
              for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].ctime = parseInt(res.data.data[i].ctime);
              }
              this.diaryData = res.data.data;
              this.isLoading = false;
            }
          })  
      },
      //处理时间
      getTime(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return `${year}年${month < 10 ? '0' + month : month}月${day < 10 ? '0' + day : day}日`
      }
    },
    mounted() {
      this.getDiaryData();
    }
}
</script>
<style scoped>
.diary-wrapper{
  width: 1024px;
  min-width: 1024px;
  max-width: 1024px;
  margin: 0 auto;
  /* background-color: green; */
}
.diary-right {
  padding: 0px 0px 0px 15px;
}
.top-right-ad {
  height: 350px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.weather-box {
  margin-bottom: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #fff;
}
.nomore {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #fff;
  font-size: 15px;
}
</style>

