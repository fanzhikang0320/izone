<template>
    <div class="topAD-wrapper"  v-if="isShow">
        <!-- 轮播 -->
        <el-carousel height="60px" direction="vertical" autoplay indicator-position="none">
            <el-carousel-item>
                codeing... ヽ(o_ _)o
            </el-carousel-item>
            <el-carousel-item>
                codeing... ヽ(o_ _)o
            </el-carousel-item>
            <el-carousel-item>
                codeing... ヽ(o_ _)o
            </el-carousel-item>
            
        </el-carousel>
        <span class="circle-close" @click="changeShow">
            <i class="el-icon-circle-close"></i>
        </span>
    </div>
</template>
<style scoped>
.topAD-wrapper {
    position: relative;
    height: 60px;
    background-color: #fef3dfc7;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #fdcfa1;
    cursor: pointer;
}
.topAD-wrapper a{
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
}
.topAD-wrapper img {
    width: 100%;
    height: 100%;
}
.circle-close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
    color: #fdcfa1;
    cursor: pointer;
}
</style>
<script>
export default {
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        changeShow() {
            this.isShow = false;
        }
    }

}
</script>
