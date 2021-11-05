<template>
<div class="widget">
    <p>Temperature</p>
    <hr>
    <div class="widget__temp">
        <h1 style="font-size: 113px; margin-bottom: 10px;" v-if="data">{{data.T}}<span class="c">&#8451;</span></h1>
        <p style="padding: 1.5em 0">Feels like</p>
        <h1 v-if="data" class="light-text" style="font-size:4.5em">{{data.F}}<span class="c">&#8451;</span></h1>
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
}
.widget {
    width: 217px;
    display: inline-block;
    left: 478px;
    position: absolute;
padding: 33px 0px;
    box-sizing: border-box;

    &__temp {
        margin: 1em 0;
      height: 383px;
        background-color: #3f4a55;
        border-radius: 30px;
        padding: 30px 0;
        box-sizing: border-box;

    }
}
</style>
