<template>
  <div class="main-wrapper">
      <el-row>
          <el-col :span="17" class="main-left">center</el-col>
          <el-col :span="7" class="main-right">
              <UserInfo />
              <RankingList />
          </el-col>
      </el-row>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import RankingList from '@/components/RankingList.vue';
export default {
    data () {
        return {
            
        }
    },
    components: {
        UserInfo,
        RankingList
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
    background-color: #fff;
}
.main-left {
    background-color: pink;
}
.main-right {
    background-color: aqua;
}

</style>