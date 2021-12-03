<template>
<div class="widget">
    <p class="sectionLabel" style="line-height: 29px;">Temperature</p>
    <hr>
    <div class="widget__temp">
        <h1 style="font-size: 113px; line-height: 86px;" class="top" v-if="data">{{data.T}}<span class="c">&#8451;</span></h1>
        <p class="centerText">Feels like</p>
        <h1 v-if="data" class="light-text feels" style="">{{data.F}}<span class="c" style="padding-bottom: 46px">&#8451;</span></h1>
    </div>
</div>
</template>

<script>
export default {
    props: ['data'],
    name: "temperature"

}
</script>

<style lang="scss" scoped>
.c {
    font-size: 20px;
    vertical-align: text-top;
    font-family: helvetica;
    padding-bottom: 78px;
    vertical-align: middle;
}

.widget {
    width: 217px;
    display: inline-block;
    left: 478px;
    position: absolute;
    padding: 33px 0px;
    box-sizing: border-box;

    .centerText {
        position: absolute;
        width: 100%;
        top: 51%;
    }

    .top {
        font-size: 113px;
        line-height: 86px;
        position: absolute;
        width: 100%;
        bottom: 281px;
    }

    .feels {
        font-size: 86px;
        position: absolute;
        bottom: 109px;
        width: 100%;
    }

    &__temp {
        margin: 22px 0;
        height: 383px;
        background-color: #5b6872;
        border-radius: 50px;
        //  padding: 79px 0;
        padding-top: 79px;
        box-sizing: border-box;

    }
}
</style>
