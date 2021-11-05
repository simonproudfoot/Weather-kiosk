<template>
<div class="widget">
     <p style="line-height: 29px;">Chance of precipitation</p>
    <hr>
    <div class="widget__precipitation">
        <h2  style="font-size: 57px; letter-spacing: 3px;" class="bold" v-if="data != undefined">{{data.Pp}}<span class="thin">%</span></h2>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215.63 221.85">
            <path d="M948.21,650.88a49.06,49.06,0,0,1-49-49V591.26a33.35,33.35,0,0,1,1.89-11.09,10,10,0,0,0-9.43-13.32h-9.84a30,30,0,0,1-30-30,107.82,107.82,0,1,1,215.63,0,30,30,0,0,1-30,30h-30.23a10,10,0,0,0-10,10v25A49.06,49.06,0,0,1,948.21,650.88Z" transform="translate(-851.82 -429.03)" fill="#fff" opacity="0.1" />
            <line x1="177.65" y1="107.82" x2="30" y2="107.82" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" stroke-dasharray="0 15" />
            <path d="M968.55,545.46v56.41a19,19,0,0,1-38,0V591.26a3.5,3.5,0,0,1,7,0v10.61a12,12,0,0,0,24,0V545.46" transform="translate(-851.82 -429.03)" fill="#fff" />
            <path d="M883.15,536.85a77.82,77.82,0,1,1,155.63,0" transform="translate(-851.82 -429.03)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" stroke-dasharray="0 15" />
            <path d="M966.93,459.43a77.83,77.83,0,0,1,71.6,77.57H882.9a77.81,77.81,0,0,1,77.82-77.81" transform="translate(-851.82 -429.03)" fill="none" stroke="#eba725" :stroke-dashoffset="strokeOffset" stroke-dasharray="822" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" class="shadow"/></svg>
    </div>
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "precipitationProbability",
    computed: {
        strokeOffset() {
            var percentage = 820 - this.data.Pp * 3.8
            return percentage

        },
        percentage() {
            var value = this.data ? this.data.Pp : 0
            return 32 * (value / 115) + 5
        }
    }
};
</script>

<style lang="scss" scoped>

.shadow{
      -webkit-filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.7));
}
.widget {
    width: 253px;
    display: inline-block;
    left: 40px;
    top: 720px;;
    position: absolute;
    padding: 1em 0;

    h2 {
        position: absolute;
        font-weight: 900;
        top: 0;
        left: 50%;
        transform: translate(-47%, 130px);

        span {
            font-size: 0.5em;
        }
    }

    &__precipitation {
        margin: 1em 0;
        height: 400px;
        border-radius: 30px;
        padding: 20px;

    }
}
</style>
