<template>
<div class="widget bottomBars">
    <div class="col-1">
        <p>UV index</p>
    </div>
    <div class="col-2">
        <div class="widget__box big" style="margin: 0" :style="uvData >= 11 ?'font-size: 30px' : null">{{ summary }}</div>
    </div>
    <div class="col-3">
        <div v-for="(box, i) in boxes" :key="i" :class="activeUv(box.values) ? 'active' : null" class="widget__box" :style="'color:' + box.color">
            {{ box.values[0] }} <span v-if="i != boxes.length - 1">-</span><span v-else>+</span>
            {{ i != boxes.length - 1 ? box.values[box.values.length - 1] : null }}
        </div>
    </div>
    <!-- <div class="widget__uv" v-if="data">
        <div class="widget__box big" :style="uvData >= 11 ?'font-size: 30px' : null">{{ summary }}</div>
    </div> -->
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "uv",
    data: function () {
        return {
            uvData: 1,
            boxes: [{
                    values: [1, 2],
                    color: "#76bc21",
                },
                {
                    values: [3, 4, 5],
                    color: "#eba725",
                },
                {
                    values: [6, 7],
                    color: "#ea7628",
                },
                {
                    values: [8, 9, 10],
                    color: "#f93535",
                },
                {
                    values: [11],
                    color: "#cc66ff",
                },
            ],
        };
    },
    methods: {
        activeUv(val) {
            return val.includes(this.uvData) ? true : false;
        },
    },
    mounted() {
        this.uvData = parseInt(this.data.U);
    },
    computed: {
        summary() {
            var result = "";
            //  if (this.uvData) {

            if (this.uvData == 0) {
                result = "Low";
            }
            if (this.boxes[0].values.includes(this.uvData)) {
                result = "Low";
            }
            if (this.boxes[1].values.includes(this.uvData)) {
                result = "Medium";
            }
            if (this.boxes[2].values.includes(this.uvData)) {
                result = "High";
            }
            if (this.boxes[3].values.includes(this.uvData)) {
                result = "Very high";
            }
            if (this.uvData >= 11) {
                result = "Exremeley high";
            }
            return result;

        },
    },
};
</script>

<style lang="scss" scoped>
.widget {
    position: absolute;
    padding: 2em 0 4em 0;
    box-sizing: border-box;
    top: 1100px;
    border-bottom: 2px #fff solid;

    p {
        text-align: left;
    }

    &__box.big {
        font-size: 40px;
        height: 78.62px;
        line-height: 78.62px;
        width: 266.0248px;
        border-radius: 50px;
        vertical-align: middle;
    }

    &__box.active {
        border: 8px #eba725 solid;
    }

    &__box:last-of-type {
        margin-right: 0;
    }

    &__box:first-of-type {
        margin-left: 0;
    }

    &__box {
        border-radius: 50px;
        vertical-align: middle;
        display: inline-block;
        line-height: 48px;
        min-width: 73px;
        background-color: #44525a;
        font-size: 22px;
        margin: 0 9px;
    }
}

.st0 {
    opacity: 0.1;
    fill: #ffffff;
}
</style>
