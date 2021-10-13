<template>
<div class="widget">
    <p>Wind</p>

    <hr>
    <div class="widget__temp">
        <h1 v-if="data" style="font-weight: 900; display: inline-block; margin-right: 20px">{{data.S}}</h1>
        <h2 class="light-text" style="font-weight: 100; display: inline-block"> mph</h2>
        <hr>
        <br>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.45 90.45" style="width: 100px">
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M75.15,43.14H88.3a2.13,2.13,0,0,0,2.14-2.32A44.91,44.91,0,0,0,80.31,16.37a2.14,2.14,0,0,0-3.15-.14l-9.31,9.31a2.16,2.16,0,0,0-.18,2.81A27.62,27.62,0,0,1,73,41.29,2.14,2.14,0,0,0,75.15,43.14Z" fill="#fff" opacity="0.1" />
                    <path d="M64.91,22.59l9.31-9.3a2.14,2.14,0,0,0-.14-3.15A44.91,44.91,0,0,0,49.63,0,2.14,2.14,0,0,0,47.3,2.14V15.3a2.15,2.15,0,0,0,1.86,2.12A27.62,27.62,0,0,1,62.1,22.78,2.15,2.15,0,0,0,64.91,22.59Z" fill="#fff" opacity="0.1" />
                    <path d="M22.59,25.54l-9.3-9.31a2.14,2.14,0,0,0-3.15.14A44.91,44.91,0,0,0,0,40.82a2.13,2.13,0,0,0,2.13,2.32H15.3a2.14,2.14,0,0,0,2.12-1.85,27.62,27.62,0,0,1,5.36-12.94A2.15,2.15,0,0,0,22.59,25.54Z" fill="#fff" opacity="0.1" />
                    <path d="M43.14,15.3V2.14A2.13,2.13,0,0,0,40.82,0,44.91,44.91,0,0,0,16.37,10.14a2.14,2.14,0,0,0-.14,3.15l9.31,9.3a2.15,2.15,0,0,0,2.81.19,27.62,27.62,0,0,1,12.94-5.36A2.14,2.14,0,0,0,43.14,15.3Z" fill="#fff" opacity="0.1" />
                    <path d="M47.3,75.15V88.3a2.14,2.14,0,0,0,2.33,2.14A44.91,44.91,0,0,0,74.08,80.31a2.14,2.14,0,0,0,.14-3.15l-9.31-9.31a2.16,2.16,0,0,0-2.81-.18A27.62,27.62,0,0,1,49.16,73,2.15,2.15,0,0,0,47.3,75.15Z" fill="#fff" opacity="0.1" />
                    <path d="M15.3,47.3H2.14A2.14,2.14,0,0,0,0,49.63,44.91,44.91,0,0,0,10.14,74.08a2.14,2.14,0,0,0,3.15.14l9.3-9.31a2.15,2.15,0,0,0,.19-2.81,27.62,27.62,0,0,1-5.36-12.94A2.15,2.15,0,0,0,15.3,47.3Z" fill="#fff" opacity="0.1" />
                    <path d="M73,49.16A27.62,27.62,0,0,1,67.67,62.1a2.16,2.16,0,0,0,.18,2.81l9.31,9.31a2.14,2.14,0,0,0,3.15-.14A44.91,44.91,0,0,0,90.44,49.63,2.14,2.14,0,0,0,88.3,47.3H75.15A2.15,2.15,0,0,0,73,49.16Z" fill="#fff" opacity="0.1" />
                    <path d="M25.54,67.85l-9.31,9.31a2.14,2.14,0,0,0,.14,3.15A44.91,44.91,0,0,0,40.82,90.44a2.13,2.13,0,0,0,2.32-2.14V75.15A2.14,2.14,0,0,0,41.29,73a27.62,27.62,0,0,1-12.94-5.36A2.16,2.16,0,0,0,25.54,67.85Z" fill="#fff" opacity="0.1" />
                    <path class="compass" :style="rotation" d="M43.66,15.44,30,73.38a1.82,1.82,0,0,0,2.63,2l12-6.43a1.81,1.81,0,0,1,1.72,0l12,6.43a1.82,1.82,0,0,0,2.63-2L47.19,15.44A1.81,1.81,0,0,0,43.66,15.44Z" fill="#eba725" />
                </g>
            </g>
        </svg>
    </div>

</div>
</template>

<script>
export default {
    props: ['data'],
    name: "windSpeed",
    methods: {

    },

    computed: {

        rotation() {
            var x = this.data ? Object.values(this.direction).filter(x => x.name == this.data.D)[0].angle : 0
            return { transform: 'rotate(' + x + 'deg)' }
        },

        direction() {
            var angle = -22.5
            var names = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NN'] // 16
            var deg = []
            names.forEach((directon, i) => {
                deg.push({ angle: angle += 22.5, name: names[i] })
            })
            return deg
        }
    }

}
</script>

<style lang="scss" scoped>
.compass {
    transform-origin: center;
    //transform: rotate(20deg);
}

.c {
    font-size: 20px;
    vertical-align: text-top;
}

.widget {
    width: 33.33%;
    display: inline-block;
    left: 400px;
    top: 750px;
    position: absolute;
    padding: 2em 0;

    &__temp {
        margin: 1em 0;
        height: 400px;
        //    background-color: #3f4a55;
        border-radius: 30px;
        padding: 3em 0;
        box-sizing: border-box;

    }
}
</style>
