<template>
    <div class="adWrapper">
        codeing...
        <span class="text-ad">AD</span>
    </div>
</template>
<style scoped>
.adWrapper {
    position: relative;
    height: 100px;
    width: 260px;
    float: right;
    margin-bottom: 20px;
    background-color: #fef3dfc7;
    border: 1px solid #fdcfa1;
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
    background-color: #ffb672;
    color: #fff;
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
