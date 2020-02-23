<template>
  <div class="main-wrapper">
      <el-row>
          <!-- 左边区域 -->
          <el-col :span="5" class="main-left">left</el-col>
          <!-- 中间区域 -->
          <el-col :span="12" class="main-center">
              <TextEditor />
              <Dynamic/>
          </el-col>
          <!-- 右边区域 -->
          <el-col :span="7" class="main-right">
              <UserInfo/>
              <RankingList/>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import RankingList from '@/components/RankingList.vue';
import Dynamic from '@/components/Dynamic.vue';
import TextEditor from '@/components/TextEditor.vue';
export default {
    data () {
        return {
            func: ''
        }
    },
    components: {
        Dynamic,
        UserInfo,
        RankingList,
        TextEditor
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
.main-center {
}
.main-left {
    background-color: pink;
}
.main-right {
    background-color: aqua;
}

</style>