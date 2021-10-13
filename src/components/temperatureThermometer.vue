<template>
<div class="widget">

    <div class="widget__temp">
        <!-- {{data.T}} -->
        <div class="widget__temp__lines">
            <span v-for="index in 9" :key="index">-</span>
        </div>
        <span v-if="data" class="widget__temp__therm"><span class="widget__temp__therm__bottom"></span>
            <div class="widget__temp__therm__result" :style="{ height: 'calc(' + percentage + '% - 80px)' }"></div>
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
            // height: calc(32.5- 80px)

            //
            return (this.data.T * 100) / 40

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
    width: 159px;
    display: inline-block;
    right: 50px;
    position: absolute;
    padding: 2em 0;
    box-sizing: border-box;

    &__temp {
        margin: 1em 0;
        height: 655px;
        background-color: #3f4a55;
        border-radius: 100px;
        box-sizing: border-box;

        &__lines {
            position: absolute;
            height: 100%;
            width: 80%;
            left: 50%;
            transform: translateX(-50%);

            span {
                //   position: absolute;
                width: 100%;
                background-color: #303e49;
                display: block;
                height: 8px;
                margin: 56px 0;
            }
        }

        &__therm {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 40px;
            background-color: #303e49;
            height: 78%;
            width: 70px;
            display: block;

            &__result {
                width: 20px;
                border-radius: 20px;
                //  height: calc(32.5% - 80px);
                display: block;
                position: absolute;
                bottom: 56px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #e9b235;
            }

            &__bottom {
                width: 40px;
                border-radius: 100%;
                height: 40px;
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                border: 13px #e9b235 solid;

            }
        }
    }
}
</style>
