<template>
  <div class="ranking-wrapper">
      <div class="title-box">
        <h3 class="title">TOP排行榜</h3>
        <p class="line"></p>
      </div>

      <div class="ranking-box">
            <div class="ranking" v-for="(item,index) in rankingList" :key="index">
                <el-tooltip
                    placement="right-end"
                    effect="light"
                >
                    <div class="ranking-top">
                        <img :src="'http://127.0.0.1:8081/api/getImgData?path=' + item.imgpath"  alt="" class="headImg">
                        <div class="user-item">
                            <span class="nickname">{{item.nickname}}</span>
                            <img v-if="start == 0 && (index == 0 || index == 1 || index == 2)" :src="require('@/assets/img/'+ index +'.png')" alt="" class="cup">
                        </div>
                    </div>
                    <div slot="content" class="user-item-info">
                        <p>
                            <span>昵称：{{item.nickname}}</span>
                        </p>
                        <p>
                            <span>园龄：{{item.ctime}}</span>
                        </p>
                        <p>
                            <span>性别：{{item.sex == 1 ? '男' : '女'}}</span>
                        </p>
                        <p>
                            <span>地址：{{item.region}}·{{item.city}}</span>
                        </p>
                        <p>
                            <span>粉丝人数：{{item.fans}}</span>
                        </p>
                    </div>
                </el-tooltip>
                <div class="ranking-bottom">
                    <img src="../assets/img/moods.png" alt="">
                    <span class="fans">{{item.fans}}</span>
                </div>
            </div>
      </div>
      <div class="btn-box">
          <el-button type="text" class="btn" :disabled="prevDis" @click="prev">
              <i class="el-icon-arrow-left"></i>
          </el-button>
          <el-button type="text" class="btn" :disabled="nextDis" @click="next">
              <i class="el-icon-arrow-right"></i>
          </el-button>
          <el-button type="text" class="btn" @click="more">
              <i class="el-icon-more"></i>
          </el-button>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            start: 0, //请求时的起始位置
            limit: 9,
            rankingList: [], //最终呈现要用的数据
            data: [],
            prevDis: false,
            nextDis: false
        }
    },
    methods: {
        //当用户点击某个排行榜当中的人物时，跳转至他的个人信息页
        handleInfo () {
            this.$message({
                type: 'warning',
                message: '抱歉，暂不可以访问他人空间！'
            })
        },
        async getData(start) {
            //如果当前请求的是第一轮数据
            if (start == 0) {
                this.prevDis = true;
            } else {
                this.prevDis =false
            }
            var res = await this.axios.get('/api/getRankingList',{params: {start: start,limit: this.limit}});
            if (res.data.type == 'success') {
                this.rankingList = res.data.data;

                //判断请求回来的数据是否已经不满足规定的个数则表示没有更多数据了
                if (res.data.data.length < this.limit) {
                    this.nextDis = true;
                } else {
                    this.nextDis = false;
                }
            }
        },
        // 点击下一页
        next() {
            this.start = this.start + this.limit;
            this.getData(this.start)
        },
        //点击上一页
        prev() {
            this.start = this.start - this.limit;
            //临界值判断
            if (this.start < 0) {
                this.start = 0;
            }
            this.getData(this.start);
        },
        //展开更多时
        more() {
            this.$message({
                type: 'warning',
                message: '抱歉，暂不支持该功能'
            })
        }
    },
    created() {
        this.getData(this.start);
    }
    
}
</script>

<style scoped>
.ranking-wrapper  {
    float: right;
    margin: 20px auto;
    width: 260px;
    background-color: #fef3dfc7;
    /* background-color: #faf8ff; */
    overflow: hidden;
    border: 1px solid #fdcfa1;
    border-radius: 4px;
}
.ranking-wrapper .title-box {
    position: relative;
    height: 60px;
    text-align: center;
}
.ranking-wrapper .title-box .title{
    position: absolute;
    width: 100px;
    padding: 0 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #fef2dd;
    color: #f66c3b;
    margin: 0;
    z-index: 1;
}
.ranking-wrapper .title-box .line {
    margin: 0;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #d2c8e6;
    top: 50%;
    transform: translateY(-50%);
}

.ranking-wrapper .ranking-box {
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; */
    padding-left: 9px;
    padding-top: 5px;
    padding-bottom: 1px;
    min-height: 294px;
}
.ranking {
    cursor: pointer;
    display: inline-block;
    margin: 3px 5px;

    
}
.ranking-top {
    width: 68px;
    height: 68px;
    border: 1px solid #d2c8e6;
    position: relative;
    border-radius: 5px;
}
.ranking-wrapper .ranking-box .user-item-info {
    background-color: #d2c8e6;
}
.ranking-top .user-item {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 22px;
    background-image: linear-gradient(to bottom,transparent,rgba(0,0,0,.7));
    color: #fff;
    text-align: center;
}
.ranking-top .user-item .nickname {
    display: inline-block;
    font-size: 12px;
    width: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ranking-top .user-item .cup {
    display: inline-block;
    width: 20px;
    height: 20px;
}
.ranking .headImg {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 5px;
    /* background-color: rgb(177, 164, 160); */
}

.ranking-bottom {
    width: 100%;
    text-align: center;
    font-size: 12px;
    height: 20px;
    margin-top: 2px;
    line-height: 20px;
    color: #2f2e33
}
.ranking-bottom img {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

.btn-box {
    height: 25px;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.btn-box .btn {
    padding: 3px;
    font-size: 15px;
    color: #857a99;
    cursor: pointer;
}
.btn-box .btn:hover {
    background-color: #ede9f5;
}
</style>