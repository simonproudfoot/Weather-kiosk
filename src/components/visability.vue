<template>
<div class="widget">
   
    <div class="widget__uv" v-if="data">
        <p style="display: inline-block; vertical-align: middle; margin-right: 1em;">Visibility</p>
        <div class="widget__box big">{{ summary }}</div>
        <div v-for="(box, i) in boxes" :key="i" :class="distance == box ? 'active' : null" class="widget__box">
            {{box}}
        </div>
        <div class="widget__box">km</div>
    </div>
</div>
</template>
<script>
export default {
    props: ["data"],
    name: "visability",
    data: function () {
        return {
            summary: '',
            distance: 0,
            boxes: ['0-1', '1-4',
                '4-10',
                '10-12',
                '10-20',
                '20-40',
                '40+',
            ],
        };
    },
    methods: {
        activeUv(val) {
            return val.includes(this.uvData) ? true : false;
        },
    },
    mounted() {
        var result = this.data.V
        if (result == 'UN') {
            this.summary = 'Unknown'

        }
        if (result == 'VP') {
            this.summary = 'Very poor'
            this.distance = '0-1'
        }
        if (result == 'PO') {
            this.summary = 'Poor'
            this.distance = '1-4'
        }
        if (result == 'MO') {
            this.summary = 'Moderate'
            this.distance = '4-10'
        }
        if (result == 'GO') {
            this.summary = 'Good'
            this.distance = '10-20'
        }
        if (result == 'VG') {
            this.summary = 'Very good'
            this.distance = '20-40'
        }
        if (result == 'EX') {
            this.summary = 'Excellent'
            this.distance = '40+'
        }
        // Visibility in metres or as a code:
        // UN Unknown

        // VG Very good - Between 20-40 km
        // EX Excellent - More than 40 km
    },
};
</script>

<style lang="scss" scoped>
.widget {
    width: 100%;
    display: inline-block;
    left: 0;
    position: absolute;
    padding: 2em 0;
    box-sizing: border-box;
    top: 1200px;

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
        border-radius: 24px;
        vertical-align: middle;
        display: inline-block;
        line-height: 48px;
        min-width: 51px;
        background-color: #3f4a55;
        font-size: 17px;
        margin-right: 6px;
    }
}

.st0 {
    opacity: 0.1;
    fill: #ffffff;
}
</style>
