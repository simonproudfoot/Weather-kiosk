<template>
<div class="widget">
    <p>Chance of precipitation</p>
    <hr>
    <div class="widget__precipitation">
        <h2 v-if="data">{{data.Pp}}<span>%</span></h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.12 38.9">
            <g id="Layer_2" data-name="Layer 2" style="position: relative">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M17.5,38.9c-5.46,0-7.91-3.7-7.91-7.36v-8H4.47A4.47,4.47,0,0,1,0,19.06a19.06,19.06,0,0,1,38.12,0,4.47,4.47,0,0,1-4.47,4.47H25.37v8C25.37,35.74,22,38.9,17.5,38.9Z" fill="#4a5461" />
                    <circle cx="31.16" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="28.47" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="25.78" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="23.09" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="20.4" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="17.71" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="15.02" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="12.33" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="9.64" cy="19.26" r="0.62" fill="#fff" />
                    <circle cx="6.95" cy="19.26" r="0.62" fill="#fff" />
                    <line id="percentage" x1="5.47" y1="19.26" :x2="percentage" y2="19.26" fill="none" stroke="#dda22a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.3" />
                    <path d="M5.18,19.26a13.88,13.88,0,1,1,27.76,0" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.3" />
                    <path d="M20.06,22.38v9.39a2.75,2.75,0,0,1-2.75,2.75h0a2.76,2.76,0,0,1-2.76-2.75V29.94" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.3" />
                </g>
            </g>
        </svg>
    </div>
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "precipitationProbability",
    computed: {
        percentage() {
            var value = this.data ? this.data.Pp : 0
            return 32 * (value / 115) + 5
        }
    }
};
</script>

<style lang="scss" scoped>
.widget {
    width: 33.33%;
    display: inline-block;
    left: 50px;
    top: 750px;
    position: absolute;
    padding: 2em 0;

    h2 {
        position: absolute;
        font-weight: 900;
        top: 0;
        left: 50%;
        transform: translate(-50%, 179px);

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
