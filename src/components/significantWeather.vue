<template>
<div class="widget">
    <p class="sectionLabel" style="line-height: 29px;">Current condition</p>
    <hr>
    
    <div class="widget__significant">
        <h2>{{data[0].title}}</h2>
        <video class="widget__significant__icon" autoplay muted loop v-if="data[0].image" :src="require('@/assets/icons/'+data[0].image+'.mp4')" />
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
        height: 384px;
        //  background-color: #5b6872;
        border-radius: 50px;
        background: #5b6872;

        h2 {
            position: absolute;
            text-align: center;
            width: 100%;
            top: 128px;
            font-size: 54px;
            z-index: 1;
        }

        &__icon {
            width: 100%
        }

        video {
            width: 300px;
            height: 300px;
            top: 160px;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
}
</style>
