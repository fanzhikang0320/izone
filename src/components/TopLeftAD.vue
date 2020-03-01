<template>
    <div class="adWrapper">
        这是广告
        <span class="text-ad">广告</span>
    </div>
</template>
<style scoped>
.adWrapper {
    position: relative;
    height: 100px;
    width: 260px;
    float: right;
    margin-bottom: 20px;
    background-color: rgb(45, 223, 113);
}
.text-ad {
    position: absolute;
    z-index: 2;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    font-size: 6px;
    background-color: #fff;
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
