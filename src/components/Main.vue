<template>
  <div class="main-wrapper">
      <el-row>
          <!-- 左边区域 -->
          <el-col :span="5" class="main-left">
              <BulletinBoard />
          </el-col>
          <!-- 中间区域 -->
          <el-col :span="12" class="main-center">
              <TopAD/>
              <router-view></router-view>
          </el-col>
          <!-- 右边区域 -->
          <el-col :span="7" class="main-right">
              <TopLeftAD/>
              <UserInfo/>
              <RankingList/>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import RankingList from '@/components/RankingList.vue';
import TopLeftAD from '@/components/TopLeftAD.vue';
import BulletinBoard from '@/components/BulletinBoard.vue';
import TopAD from '@/components/TopAD.vue';
export default {
    data () {
        return {
            func: ''
        }
    },
    components: {
        UserInfo,
        RankingList,
        TopLeftAD,
        TopAD,
        BulletinBoard
    },
    methods: {
       
    }

}
</script>

<style scoped>
.main-wrapper {
    width: 1024px;
    height: 100px;
    margin: 0 auto;
    min-width: 1024px;
    /* background-color: #fff; */
}



</style>