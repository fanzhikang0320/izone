<template>
    <div class="about-wrapper">
        <div class="echars-box">正在codeing...</div>

        <el-row :gutter="20" class="center">
            <el-col :span="12">
                <div class="desc-box">
                    <h3>网站简介</h3>
                    <div class="desc-text-box">
                        本网站于2020年2月10开始开发，2020年3月6日发布测试版，目的是建造一个属于分享心情的地方，每个人都是匿名，但是由于站长技术能力有限，本站不可避免会有一些Bug和不足，欢迎各位前来评价，站长会尽全力去进行解决，本站也会一直持续更新和完善。
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="desc-box">
                    <h3>站长简介</h3>
                    <div class="desc">
                        <img src="" alt="" class="desc-img">
                        <div class="desc-text-box desc-text">
                            一个前端小白，热爱前端，追求全栈发展
                        </div>
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
.about-wrapper {
    width: 1024px;
    min-width: 1024px;
    /* background-color: #fff; */
    margin: 0 auto;
}
.echars-box {
    width: 100%;
    height: 500px;
    background-color: #fef3dfc7;
    border: 1px solid #fdcfa1;
    border-radius: 8px;
}
.about-wrapper .center {
    margin-top: 25px;
}
.desc-box {
    border: 1px solid #d2c8e6;
    height: 200px;
    border-radius: 10px;
    padding: 0px 15px;
    background-color: #fef3dfc7;
    color: #d8663e;
}
.desc-box .desc-text-box{
    text-indent: 2em;
    font-size: 15px;
    line-height: 25px;
    display: inline-block;
}
.desc-box .desc {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.desc-box .desc .desc-img {
    display: inline-block;
    width: 75px;
    height: 75px;
    border: 1px solid #000;
    margin-right: 15px;
}
.desc-box .desc .desc-text-box.desc-text {
    width: calc(100% - 75px)
}
</style>
