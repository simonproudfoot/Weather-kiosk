<template>
<div class="widget">
    <div class="widget__uv">
        <p>UV index</p>
        <div class="widget__box big">{{ summary }}</div>
        <div v-for="(box, i) in boxes" :key="i" :class="activeUv(box.values) ? 'active' : null" class="widget__box" :style="'color:' + box.color">
            {{ box.values[0] }} <span v-if="i != boxes.length - 1">-</span><span v-else>+</span>
            {{ i != boxes.length - 1 ? box.values[box.values.length - 1] : null }}
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "uv",
    data: function () {
        return {
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
            return val.includes(this.data.U) ? true : false;
        },
    },
    mounted() {
        this.data.U = 4;
    },
    computed: {
        summary() {
            var result = "";
            if (this.data.U) {
                if (this.boxes[0].values.includes(this.data.U)) {
                    result = "low";
                }
                if (this.boxes[1].values.includes(this.data.U)) {
                    result = "medium";
                }
                if (this.boxes[2].values.includes(this.data.U)) {
                    result = "High";
                }
                if (this.boxes[3].values.includes(this.data.U)) {
                    result = "Very high";
                }
                if (this.boxes[4].values.includes(this.data.U)) {
                    result = "Exremeley high";
                }
                return result;
            } else {
                return '??'
            }

        },
    },
};
</script>

<style lang="scss" scoped>
.widget {
    width: calc(100% - 80px);
    display: inline-block;
    left: 40px;
    position: absolute;
    padding: 2em 0;
    box-sizing: border-box;
    top: 1118px;
    border: 1px red dashed;

    &__box.big {
        font-size: 48px;
        height: 78.62px;
        line-height: 78.62px;
        width: 266.0248px;
        border-radius: 50px;
        vertical-align: middle;
    }

    &__box.active {
        border: 6px #eba725 solid;
    }

    &__box {
        padding-left: 5px;
        border-radius: 50px;
        vertical-align: middle;
        display: inline-block;
        line-height: 48px;
        min-width: 81px;
        background-color: #3f4a55;
        font-size: 22px;
        margin-right: 20px;
    }
}

.st0 {
    opacity: 0.1;
    fill: #ffffff;
}
</style>
