<template>
<div class="widget">
    <p>Current condition</p>
    <hr>
    <div class="widget__significant">
        <h2>{{data}}</h2>
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
    width: 400px;
    display: inline-block;
    left: 50px;
    position: absolute;
    padding: 2em 0;
    &__significant {
        margin: 1em 0;
        height: 400px;
        background-color: #3f4a55;
        border-radius: 30px;

    }
}
</style>
