<template>
<div class="widget">
    <p class="sectionLabel" style="line-height: 29px;">Current condition</p>
    <hr>
    <div class="widget__significant">
        <img v-if="data[0].image" :src="require('@/assets/icons/'+data[0].image+'.svg')">
        <!-- {{data[0]}} -->
    </div>
</div>
</template>

<script>
export default {
    props: ['data'],
    name: "significantWeather"
}
</script>

<style lang="scss" scoped>
.widget {
    width: 392px;
    display: inline-block;
    left: 35px;
    position: absolute;
    padding: 2em 0;

    &__significant {
     margin: 22px 0;
        height: 400px;
      //  background-color: #3f4a55;
        border-radius: 30px;

    }
}
</style>
