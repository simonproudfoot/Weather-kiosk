<template>
<div id="app">
    <div class="board">
        <div class="board__inner">
            <div class="date">
                <h1>{{day}}</h1>
                <h2>{{month}}</h2>
            </div>
            <significantWeather v-if="significantWeather" :data="significantWeather[0]" />
            <temperature v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <temperatureThermometer v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <precipitationProbability v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <windSpeed v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <humidity v-if="dateInfo!==undefined" :data="dateInfo[0]" />
         <!--   <visability v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <uv v-if="dateInfo!==undefined" :data="dateInfo[0]" /> -->
        </div>
    </div>
    <span class="stand"> <span class="stand__shadow"></span> <span class="stand__shadowTop"></span></span>
</div>
</template>

<script>
import temperature from './components/temperature.vue';
import temperatureThermometer from './components/temperatureThermometer.vue';
import significantWeather from './components/significantWeather.vue'
import PrecipitationProbability from './components/precipitationProbability.vue';
import windSpeed from './components/windSpeed.vue';
import humidity from './components/humidity.vue';
// import visability from './components/visability.vue';
// import uv from './components/uv.vue';
export default {
    components: {
        significantWeather,
        temperature,
        temperatureThermometer,
        PrecipitationProbability,
        windSpeed,
         humidity,
        // visability,
        // uv
    },
    name: "App",
    data: function () {
        return {
            key: "1acb56e9-c15e-4547-a783-d93aa5a9ef81",

            observations: {
                info: [],
            },
            weatherData: {
                info: {},
                weatherParams: [],
            },
            dateSelected: "",
            current: "",
            condition: {
                sunny: false,
                wind: false,
                clouds: false,
                lighting: false,
                snow: false,
                fog: false,
                rain: false,
            },
            overlay: "",
            showWarning: false
        };
    },
    methods: {
        // function to connect to API
        getWeatherData() {
            let api =
                "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/310012?res=3hourly&key=" +
                this.key;
            this.axios.get(api).then((response) => {
                this.$set(this.weatherData, "info", response.data["SiteRep"]["DV"]);
                this.$set(
                    this.weatherData,
                    "weatherParams",
                    response.data["SiteRep"]["Wx"]["Param"]
                );
            });
        },
        getObservations() {
            let api =
                "http://datapoint.metoffice.gov.uk/public/data/layer/wxobs/all/json/capabilities?key=" +
                this.key;
            this.axios.get(api).then((response) => {
                this.$set(this.observations, "info", response.data);
            });
        },
    },
    computed: {

        month() {
            const event = new Date();
            return event.getDate() + ' ' + event.toLocaleDateString(undefined, { month: 'long' })

        },

        day() {
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            return weekday[d.getDay()];
        },
        weatherWarning() {
            var obj = Object.values(this.condition)
            const count = obj.filter(Boolean).length;
            return count
        },
        overlayColor() {
            if (this.condition.snow && this.condition.fog) {
                return 'colourCold'
            } else if (!this.condition.snow && this.condition.rain && !this.condition.fog) {
                return 'colourGrey'
            } else if (this.condition.sunny) {
                return 'colourSunny'
            } else {
                return ''
            }
        },
        dateInfo() {
            if (this.weatherData.info.Location != undefined) {
                var arr = Object.values(this.weatherData.info.Location.Period).find(
                    (x) => x.value === this.dateSelected
                );
                return arr ? arr["Rep"] : [];
            } else {
                return []
            }
        },

        significantWeather() {
            var arr = [];
            this.dateInfo.forEach((x) => {
                if (x.W === "0") {
                    arr.push("Clear night");
                }
                if (x.W === "1") {
                    arr.push("Sunny day");
                }
                if (x.W === "2") {
                    arr.push("Partly cloudy");
                }
                if (x.W === "3") {
                    arr.push("Partly cloudy(day)");
                }
                if (x.W === "4") {
                    arr.push("N/A");
                }
                if (x.W === "5") {
                    arr.push("Mist");
                }
                if (x.W === "6") {
                    arr.push("Fog");
                }
                if (x.W === "7") {
                    arr.push("Cloudy");
                }
                if (x.W === "8") {
                    arr.push("Overcast");
                }
                if (x.W === "9") {
                    arr.push("Light rain shower(night)");
                }
                if (x.W === "10") {
                    arr.push("Light rain shower(day)");
                }
                if (x.W === "11") {
                    arr.push("Drizzle");
                }
                if (x.W === "12") {
                    arr.push("Light rain");
                }
                if (x.W === "13") {
                    arr.push("Heavy rain shower(night)");
                }
                if (x.W === "14") {
                    arr.push("Heavy rain shower(day)");
                }
                if (x.W === "15") {
                    arr.push("Heavy rain");
                }
                if (x.W === "16") {
                    arr.push("Sleet shower(night)");
                }
                if (x.W === "17") {
                    arr.push("Sleet shower(day)");
                }
                if (x.W === "18") {
                    arr.push("Sleet");
                }
                if (x.W === "19") {
                    arr.push("Hail shower(night)");
                }
                if (x.W === "20") {
                    arr.push("Hail shower(day)");
                }
                if (x.W === "21") {
                    arr.push("Hail");
                }
                if (x.W === "22") {
                    arr.push("Light snow shower(night)");
                }
                if (x.W === "23") {
                    arr.push("Light snow shower(day)");
                }
                if (x.W === "24") {
                    arr.push("Light snow");
                }
                if (x.W === "25") {
                    arr.push("Heavy snow shower(night)");
                }
                if (x.W === "26") {
                    arr.push("Heavy snow shower(day)");
                }
                if (x.W === "27") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "28") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "29") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "30") {
                    arr.push("Heavy snow shower");
                }
            });
            return arr;
        },
    },
    watch: {
        weatherWarning() {
            !this.showWarning ? this.showWarning = true : null
            setTimeout(() => {
                this.showWarning ? this.showWarning = false : null
            }, 5000);
        },
        condition: {
            deep: true,
            handler(val) {
                if (val.sunny) {
                    val.rain = false
                    val.snow = false
                    val.fog = false
                    val.lighting = false
                    val.clouds = false
                    val.wind = false
                } else {
                    val.sunny = false
                }
            }
        },
        wind(val) {
            if (val) {
                this.$refs['clouds'].playbackRate = 3;
                this.$refs['rain'].playbackRate = 3;
                this.$refs['snow'].playbackRate = 3;
            } else {
                this.$refs['clouds'].playbackRate = 1;
                this.$refs['rain'].playbackRate = 1;
                this.$refs['snow'].playbackRate = 1;
            }
        },
    },
    created() {
        this.getWeatherData(); // load the function when the app loads
        this.getObservations(); // load the function when the app loads
        var today = new Date().toISOString().split('T')[0] + 'Z';
        // var str = new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', }).format(today);
        this.dateSelected = today

    },
}
</script>

<style lang="scss">
$darkgrey: '#303e49';
$lightgrey: '#3f4a55';
body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #000;
    line-height: 75px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 1920px;
    width: 1080px;
    background: #afc4d6;
    position: relative;

}

p {
    font-size: 21px;
    margin: 0;
    line-height: 40px;
}

h1 {
    padding: 0;
    margin: 0;
    font-size: 5em;
}

h2 {
    padding: 0;
    margin: 0;
    font-size: 3em;
    font-weight: 100;
}

h3 {
    padding: 0;
    margin: 0;
    font-size: 2.5em;
    font-weight: 100;
}

h4 {
    padding: 0;
    margin: 0;
    font-size: 2em;
    font-weight: 100;
}

.light-text {
    color: #686c76;
}

.date {
    text-align: left;
}

.stand {
    position: absolute;
    width: 100px;
    background-color: #888889;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1636px;
    z-index: 0;

    &__shadow {
        position: absolute;
        width: 100px;
        height: 50px;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);

        background-color: #6c6c6d;
    }

    &__shadowTop {
        position: absolute;
        width: 100px;
        height: 25px;
        top: -12px;
        left: 50%;
        border-radius: 100%;
        transform: translateX(-50%);
        background-color: #a4a4a5;
    }
}

.board {
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 991px;
    bottom: 150px;
    display: block;
    height: 1400px;
    background-color: #fff;
    border-radius: 60px;
    box-sizing: border-box;
    padding: 25px;

    &__inner {
        -webkit-box-shadow: inset 10px 10px 1px 5px #28333b;
        box-shadow: inset 10px 10px 1px 5px #28333b;
        color: #fff;
        object-fit: contain;
        padding: 20px;
        border-radius: 40px;
        padding: 50px;
        background-color: #303e49;
        height: 1250px;
        position: relative;

        &__widget {
            border-radius: 60px;
        }

    }

}
</style>
