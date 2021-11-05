<template>
<div class="widget bottomBars">

    <div class="col-1">
        <p>Visibility</p>
    </div>
    <div class="col-2">
        <div class="widget__box big">
            <h2>{{ summary }} </h2>
            <p>{{distance}}</p>
        </div>
    </div>
    <div class="col-3">
        <div class="graph">
            <img :src="require('@/assets/vis.svg')">
            <span class="graph__bar" :style="'width:'+percent+'%'"></span>
        </div>
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
            percent: 0,
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


    mounted() {
        var result = this.data.V
        if (result == 'UN') {
            this.summary = 'Unknown'
            this.distance = ''
            this.percent = 0
        }
        if (result == 'VP') {
            this.summary = 'Very poor'
            this.distance = '0-1k'
            this.percent = 5
            this.distance = ''
        }
        if (result == 'PO') {
            this.summary = 'Poor'
            this.distance = '1-4'
            this.percent = 10
            this.distance = ''
        }
        if (result == 'MO') {
            this.summary = 'Moderate'
            this.distance = '4-10'
            this.percent = 24

        }
        if (result == 'GO') {
            this.summary = 'Good'
            this.distance = '10-20'
            this.percent = 37

        }
        if (result == 'VG') {
            this.summary = 'Very good'
            this.distance = '20-40'
            this.percent = 69

        }
        if (result == 'EX') {
            this.summary = 'Excellent'
            this.distance = '40+'
            this.percent = 100

        }
        // Visibility in metres or as a code:
        // UN Unknown

        // VG Very good - Between 20-40 km
        // EX Excellent - More than 40 km
    },
};
</script>

<style lang="scss" scoped>
.graph {
width: 428px;
display: inline-block;
vertical-align: middle;
position: relative;
height: 57px;
margin-left: 34px;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    &__bar {
        position: absolute;
        width: 10%;
        height: 10px;
        background-color: #eba725;
        top: 20px;
        left: 0;
                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
        border-radius: 10px;

    }
}

.widget {
    left: 0;
    position: absolute;
    padding: 4em 0 2em 0;
    box-sizing: border-box;
    top: 1200px;

    p {
        text-align: left;
    }

    hr {
        margin-top: 1em;
        left: 40px;
        width: calc(941px - 89px);
        margin-bottom: 1em;
    }

    &__box.big {
        line-height: 33.62px;
        width: 266.0248px;
        border-radius: 50px;
        vertical-align: middle;
        text-align: center;
        padding: 19px 0 0 0;

        h2 {
            font-size: 48px;
        }

        p {
            text-align: center;
        }
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
