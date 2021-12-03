<template>
<div class="widget">
    <p class="sectionLabel" style="line-height: 29px;">Wind</p>
    <hr>
    <div class="widget__temp">
        <h1 v-if="data" style="font-weight: 900; display: inline-block; margin-right: 20px; font-size: 57px;" class="bold">{{data.S}}</h1>
        <h2 style="font-weight: 100; display: inline-block; font-size: 46px; color: #5b6872"> mph</h2>
        <hr style="opacity: 10%">
        <div style="margin-top: 20px;">
            <h1 ref="windDirection" class="bold" style="font-size: 57px; display: inline-block; vertical-align: middle; font-size: 57px;">{{data.D}}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.45 90.45" style="width: 100px; margin-left: 14px; vertical-align: middle;">
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path d="M75.15,43.14H88.3a2.13,2.13,0,0,0,2.14-2.32A44.91,44.91,0,0,0,80.31,16.37a2.14,2.14,0,0,0-3.15-.14l-9.31,9.31a2.16,2.16,0,0,0-.18,2.81A27.62,27.62,0,0,1,73,41.29,2.14,2.14,0,0,0,75.15,43.14Z" fill="#5b6872"  />
                        <path d="M64.91,22.59l9.31-9.3a2.14,2.14,0,0,0-.14-3.15A44.91,44.91,0,0,0,49.63,0,2.14,2.14,0,0,0,47.3,2.14V15.3a2.15,2.15,0,0,0,1.86,2.12A27.62,27.62,0,0,1,62.1,22.78,2.15,2.15,0,0,0,64.91,22.59Z" fill="#5b6872"  />
                        <path d="M22.59,25.54l-9.3-9.31a2.14,2.14,0,0,0-3.15.14A44.91,44.91,0,0,0,0,40.82a2.13,2.13,0,0,0,2.13,2.32H15.3a2.14,2.14,0,0,0,2.12-1.85,27.62,27.62,0,0,1,5.36-12.94A2.15,2.15,0,0,0,22.59,25.54Z" fill="#5b6872"  />
                        <path d="M43.14,15.3V2.14A2.13,2.13,0,0,0,40.82,0,44.91,44.91,0,0,0,16.37,10.14a2.14,2.14,0,0,0-.14,3.15l9.31,9.3a2.15,2.15,0,0,0,2.81.19,27.62,27.62,0,0,1,12.94-5.36A2.14,2.14,0,0,0,43.14,15.3Z" fill="#5b6872"  />
                        <path d="M47.3,75.15V88.3a2.14,2.14,0,0,0,2.33,2.14A44.91,44.91,0,0,0,74.08,80.31a2.14,2.14,0,0,0,.14-3.15l-9.31-9.31a2.16,2.16,0,0,0-2.81-.18A27.62,27.62,0,0,1,49.16,73,2.15,2.15,0,0,0,47.3,75.15Z" fill="#5b6872"  />
                        <path d="M15.3,47.3H2.14A2.14,2.14,0,0,0,0,49.63,44.91,44.91,0,0,0,10.14,74.08a2.14,2.14,0,0,0,3.15.14l9.3-9.31a2.15,2.15,0,0,0,.19-2.81,27.62,27.62,0,0,1-5.36-12.94A2.15,2.15,0,0,0,15.3,47.3Z" fill="#5b6872"  />
                        <path d="M73,49.16A27.62,27.62,0,0,1,67.67,62.1a2.16,2.16,0,0,0,.18,2.81l9.31,9.31a2.14,2.14,0,0,0,3.15-.14A44.91,44.91,0,0,0,90.44,49.63,2.14,2.14,0,0,0,88.3,47.3H75.15A2.15,2.15,0,0,0,73,49.16Z" fill="#5b6872"  />
                        <path d="M25.54,67.85l-9.31,9.31a2.14,2.14,0,0,0,.14,3.15A44.91,44.91,0,0,0,40.82,90.44a2.13,2.13,0,0,0,2.32-2.14V75.15A2.14,2.14,0,0,0,41.29,73a27.62,27.62,0,0,1-12.94-5.36A2.16,2.16,0,0,0,25.54,67.85Z" fill="#5b6872"  />
                        <path class="compass" :style="rotation" d="M43.66,15.44,30,73.38a1.82,1.82,0,0,0,2.63,2l12-6.43a1.81,1.81,0,0,1,1.72,0l12,6.43a1.82,1.82,0,0,0,2.63-2L47.19,15.44A1.81,1.81,0,0,0,43.66,15.44Z" fill="#eba725" />
                    </g>
                </g>
            </svg>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['data'],
    name: "windSpeed",
    data: function () {
        return {
            direction: []
        }
    },
    computed: {
        rotation() {
            var x = 0
            if (this.data.D) {
                this.direction.forEach((direction) => {
                    if (direction.name == this.data.D) {
                        x = direction.angle
                    }
                });
                return { transform: 'rotate(' + x + 'deg)' }
            } else {
                return 0
            }
        },
    },
    mounted() {
        this.$refs['windDirection'].style.fontSize = this.data.D.length > 2 ? '47px' : '57px'

        var angle = -22.5
        var names = ['N', 'NNE', 'NY', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'NWN', 'NW', 'NNW'] // 16
        names.forEach((directon, i) => {
            this.direction.push({ angle: angle += 22.5, name: names[i] })
        })

    }
}
</script>

<style lang="scss" scoped>
.compass {
    transform-origin: center;
    -webkit-filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.7));
    //transform: rotate(20deg);
}

.c {
    font-size: 20px;
    vertical-align: text-top;
}

.widget {
    width: 253px;
    display: inline-block;
    left: 346px;
    top: 720px;
    ;
    position: absolute;
    padding: 1em 0;

    &__temp {
        margin: 1em 0;
        height: 400px;
        border-radius: 30px;
        padding-top: 23px;
        box-sizing: border-box;
    }
}
</style>
