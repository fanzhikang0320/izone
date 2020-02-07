<template>
    <div class="cointainer">
        <div class="img-box">
            <img src="@/assets/img/404.gif" alt="" class="error">
            <el-button round @click="returnHome" class="btn">返回主页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        //返回主页
        returnHome () {
            window.open('/home','_self');
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
}
.img-box {
    width: 800px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

}
.error {
    width: 100%;
}
.btn {
    float: right;
    transform: translateY(-110%);
    background-color: transparent;
    color:#Fff; 

}
</style>