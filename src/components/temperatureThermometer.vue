<template>
<div class="widget">
    <div class="widget__temp">
        <div class="widget__temp__lines">
            <span v-for="index in 9" :key="index"></span>
        </div>
        <span v-if="data" class="widget__temp__therm"><span class="widget__temp__therm__bottom"></span>
            <div class="widget__temp__therm__result" :style="'height:'+percentage+'px'"></div>
        </span>
    </div>
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "temperature",
    computed: {
        percentage() {
            return (this.data.T * 100) / 10

        }
    }
};
</script>

<style lang="scss" scoped>
.c {
    font-size: 20px;
    vertical-align: text-top;
}

.light-text {
    color: #686c76;
}

.widget {
    top: 0;
    width: 132px;
    display: inline-block;
    right: 50px;
    position: absolute;
    padding: 2em 0;
    box-sizing: border-box;
    left: 727px;

    &__temp {
        margin: 1em auto;
        height: 634px;
        background-color: #5b6872;
        border-radius: 100px;
        box-sizing: border-box;

        &__lines {
            position: absolute;
            height: 100%;
            width: 80%;
            left: 50%;
            transform: translateX(-50%);

            span {
                width: 90px;
                background-color: #354651;
                display: block;
                height: 8px;
                margin: 56px auto;
                border-radius: 20px;
            }
        }

        &__therm {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 40px;
            background-color: #354651;
            height: 78%;
            width: 49px;
            display: block;

            &__result {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
                width: 17px;
                border-radius: 20px 20px 0 0;
                display: block;
                position: absolute;
                bottom: 48px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #e9b235;
            }

            &__bottom {
                width: 34px;
                border-radius: 100%;
                height: 34px;
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                z-index: 2;
                transform: translateX(-50%);
                border: 8.5px #e9b235 solid;
            }
        }
    }
}
</style>
