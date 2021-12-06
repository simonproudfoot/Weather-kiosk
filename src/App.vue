<template>
<div id="app" :style="'background-color:#'+significantWeather[0].color">
    <video muted loop autoplay :src="require('@/assets/backgrounds/back_'+backgroundVideo)" class="gradient"></video>
    <div class="board">
        <div v-if="weatherDataReady && observationsReady" class="board__inner">
            <div class="date">
                <h1 class="bold">{{day}}</h1>
                <h2>{{month}}</h2>
            </div>
            <significantWeather v-if="significantWeather[0]!==undefined" :data="significantWeather" />
            <temperature v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <temperatureThermometer v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <precipitationProbability v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <windSpeed v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <humidity v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <uv v-if="dateInfo!==undefined" :data="dateInfo[0]" />
            <visability v-if="dateInfo!==undefined" :data="dateInfo[0]" />
        </div>
        <div v-else class="board__inner" style="text-align: left">
            <h1>Loading</h1>
        </div>
    </div>
    <!-- <span class="stand"><span class="stand__shadow"></span><span class="stand__shadowTop"></span></span> -->
</div>
</template>

<script>
import temperature from './components/temperature.vue';
import temperatureThermometer from './components/temperatureThermometer.vue';
import significantWeather from './components/significantWeather.vue'
import PrecipitationProbability from './components/precipitationProbability.vue';
import windSpeed from './components/windSpeed.vue';
import humidity from './components/humidity.vue';
import visability from './components/visability.vue';
import uv from './components/uv.vue';
export default {
    components: {
        significantWeather,
        temperature,
        temperatureThermometer,
        PrecipitationProbability,
        windSpeed,
        humidity,
        visability,
        uv
    },
    name: "App",
    data: function () {
        return {
            timer: '',
            observationsReady: false,
            weatherDataReady: false,
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
        getAllData() {
            this.weatherDataReady = false
            this.getWeatherData(); // load the function when the app loads
            this.getObservations(); // load the function when the app loads
            var today = new Date().toISOString().split('T')[0] + 'Z';
            this.dateSelected = today
        },
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
            }).then(() => {
                this.weatherDataReady = true
            });
        },
        getObservations() {
            let api =
                "http://datapoint.metoffice.gov.uk/public/data/layer/wxobs/all/json/capabilities?key=" +
                this.key;
            this.axios.get(api).then((response) => {
                this.$set(this.observations, "info", response.data);
            }).then(() => {
                this.observationsReady = true
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

        backgroundVideo() {
            const windspeed = this.dateInfo[0].S
            const currentTemp = this.dateInfo[0].T
            const condition = this.significantWeather[0].image
            let video = ''

            // SUN 
            if (currentTemp < 5 && condition == 'sunny') {
                video = 'cold_bright'
            } else if (condition == 'sunny' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_bright'
            } else if (condition == 'sunny' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_bright'
            } else if (condition == 'sunny' >= 25) {
                video = 'hot_bright'
            }

            // PARTLY CLOUDY
            else if (currentTemp < 5 && condition == 'partly_cloudy') {
                video = 'cold_bright'
            } else if (condition == 'partly_cloudy' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_bright'
            } else if (condition == 'partly_cloudy' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_bright'
            } else if (condition == 'partly_cloudy' >= 25) {
                video = 'hot_bright'
            }

            // MIST
            else if (currentTemp < 5 && condition == 'mist') {
                video = 'cold_medium'
            } else if (condition == 'mist' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_medium'
            } else if (condition == 'mist' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_medium'
            }

            // FOG
            else if (currentTemp < 5 && condition == 'fog') {
                video = 'cold_dark'
            } else if (condition == 'fog' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_dark'
            } else if (condition == 'fog' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_dark'
            }

            // CLOUDY
            else if (currentTemp < 5 && condition == 'cloudy') {
                video = 'cold_medium'
            } else if (condition == 'cloudy' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_medium'
            } else if (condition == 'cloudy' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_medium'
            } else if (condition == 'cloudy' >= 25) {
                video = 'hot_medium'
            }

            // OVERCAST
            else if (currentTemp < 5 && condition == 'overcast') {
                video = 'cold_medium'
            } else if (condition == 'overcast' && currentTemp >= 5 && currentTemp < 24) {
                video = 'generic_medium'
            } else if (condition == 'overcast' && currentTemp >= 5 && currentTemp < 24 && windspeed > 13) {
                video = 'wind_medium'
            } else if (condition == 'overcast' >= 25) {
                video = 'hot_medium'
            }

            // OTHERS
            else if (condition == 'drizzle') {
                video = 'drizzle_medium'
            } else if (condition == 'light_rain') {
                video = 'light_rain'
            } else if (condition == 'heavy_rain') {
                video = 'heavy_rain_dark'
            } else if (condition == 'sleet') {
                video = 'sleet_dark'
            } else if (condition == 'hail') {
                video = 'hail_dark'
            } else if (condition == 'light_snow') {
                video = 'light_snow_medium'
            } else if (condition == 'heavy_snow') {
                video = 'heavy_snow_dark'
            } else if (condition == 'thunder') {
                video = 'heavy_rain_dark'
            }

            return video + '.mp4'
        },

        significantWeather() {
            var arr = [];
            this.dateInfo.forEach((x) => {
                if (x.W === "0") {
                    arr.push({ title: "Clear night", image: '', color: '1b637f' });
                }
                if (x.W === "1") {
                    arr.push({ title: "Sunny day", image: 'sunny', color: '3cabe2' });
                }
                if (x.W === "2") {
                    arr.push({ title: "Partly cloudy", image: 'partly_cloudy', color: '86b4cc' });
                }
                if (x.W === "3") {
                    arr.push({ title: "Partly cloudy(day)", image: 'partly_cloudy', color: '86b4cc' });
                }
                if (x.W === "4") {
                    arr.push({ title: "N/A", image: '', color: '' });
                }
                if (x.W === "5") {
                    arr.push({ title: "Mist", image: 'mist', color: '667f8f' });
                }
                if (x.W === "6") {
                    arr.push({ title: "Fog", image: 'fog', color: '667f8f' });
                }
                if (x.W === "7") {
                    arr.push({ title: "Cloudy", image: 'cloudy', color: '86b4cc' });
                }
                if (x.W === "8") {
                    arr.push({ title: "Overcast", image: 'overcast', color: '86b4cc' });
                }
                if (x.W === "9") {
                    arr.push({ title: "Light rain shower(night)", image: 'light_rain', color: '86b4cc' });
                }
                if (x.W === "10") {
                    arr.push({ title: "Light rain shower(day)", image: 'light_rain', color: '86b4cc' });
                }
                if (x.W === "11") {
                    arr.push({ title: "Drizzle", image: 'drizzle', color: '83b3cb' });
                }
                if (x.W === "12") {
                    arr.push({ title: "Light rain", image: 'light_rain', color: '83b3cb' });
                }
                if (x.W === "13") {
                    arr.push({ title: "Heavy rain shower(night)", image: 'heavy_rain', color: '667f8f' });
                }
                if (x.W === "14") {
                    arr.push({ title: "Heavy rain shower(day)", image: '', color: '667f8f' });
                }
                if (x.W === "15") {
                    arr.push({ title: "Heavy rain", image: 'heavy_rain', color: '667f8f' });
                }
                if (x.W === "16") {
                    arr.push({ title: "Sleet shower(night)", image: 'sleet', color: '667f8f' });
                }
                if (x.W === "17") {
                    arr.push({ title: "Sleet shower(day)", image: 'sleet', color: '667f8f' });
                }
                if (x.W === "18") {
                    arr.push({ title: "Sleet", image: 'sleet', color: '667f8f' });
                }
                if (x.W === "19") {
                    arr.push({ title: "Hail shower(night)", image: 'hail', color: '667f8f' });
                }
                if (x.W === "20") {
                    arr.push({ title: "Hail shower(day)", image: 'hail', color: '667f8f' });
                }
                if (x.W === "21") {
                    arr.push({ title: "Hail", image: 'hail', color: '667f8f' });
                }
                if (x.W === "22") {
                    arr.push({ title: "Light snow shower(night)", image: 'light_snow', color: '83b3cb' });
                }
                if (x.W === "23") {
                    arr.push({ title: "Light snow shower(day)", image: 'light_snow', color: '83b3cb' });
                }
                if (x.W === "24") {
                    arr.push({ title: "Light snow", image: 'light_snow', color: '83b3cb' });
                }
                if (x.W === "25") {
                    arr.push({ title: "Heavy snow shower(night)", image: 'heavy_snow', color: '657e8e' });
                }
                if (x.W === "26") {
                    arr.push({ title: "Heavy snow shower(day)", image: 'heavy_snow', color: '657e8e' });
                }
                if (x.W === "27") {
                    arr.push({ title: "Heavy snow shower", image: 'heavy_snow', color: '657e8e' });
                }
                if (x.W === "28") {
                    arr.push({ title: "Heavy snow shower", image: 'heavy_snow', color: '657e8e' });
                }
                if (x.W === "29") {
                    arr.push({ title: "Heavy snow shower", image: 'heavy_snow', color: '657e8e' });
                }
                if (x.W === "30") {
                    arr.push({ title: "Heavy snow shower", image: 'heavy_snow', color: '657e8e' });
                }
            });
            return arr;
        },
    },

    created() {
        this.getAllData();
        setInterval(this.getAllData, 500000);
    },
}
</script>

<style lang="scss">
$darkgrey: '#303e49';
$lightgrey: '#5b6872';

@font-face {
    font-family: 'Gilroy-Bold';
    font-style: normal;
    font-weight: initial;
    src: local('Gilroy-Bold'), url('./fonts/Gilroy-Bold.woff') format('woff');
}

@font-face {
    font-family: 'Gilroy-Heavy';
    font-style: normal;
    font-weight: initial;
    src: local('Gilroy-Heavy'), url('./fonts/Gilroy-Heavy.woff') format('woff');
}

@font-face {
    font-family: 'Gilroy-Light';
    font-style: normal;
    font-weight: initial;
    src: local('Gilroy-Light'), url('./fonts/Gilroy-Light.woff') format('woff');
}

@font-face {
    font-family: 'Gilroy-Medium';
    font-style: normal;
    font-weight: initial;
    src: local('Gilroy-Medium'), url('./fonts/Gilroy-Medium.woff') format('woff');
}

@font-face {
    font-family: 'Gilroy-Regular';
    font-style: normal;
    font-weight: initial;
    src: local('Gilroy-Regular'), url('./fonts/Gilroy-Regular.woff') format('woff');
}

body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #000;
    line-height: 75px;
    font-family: "Gilroy-Medium";
}

body * {
    font-weight: initial;
}

.bold {
    font-family: "Gilroy-Bold";
}

.thin {
    font-family: "Gilroy-Regular";
}

#app {

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 1920px;
    width: 1080px;
    position: relative;

}

.gradient {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5704481621750263) 10%);
}

p {
    font-size: 21px;
    margin: 0;
    letter-spacing: 0.5px;
    line-height: 40px;
}

hr {
    background-color: #eee;
    border: 0 none;
    color: #eee;
    height: 3px;
}

h1 {
    padding: 0;
    font-size: 72px;
    margin: 0;
    letter-spacing: 2px;

}

h2 {
    padding: 0;
    margin: 0;
    font-size: 48px;
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
    color: #839098;
}

.date {
    text-align: left;
}

.bottomBars {

    height: 100px;
    width: 869px;
    display: flex !important;
    left: 40px !important;
    // justify-content: space-between;
    align-items: center;

    .col-1 {

        width: 98px;
    }

    .col-2 {
        width: 266px
    }

    .col-3 {
        width: 503px
    }

}

.stand {
    position: absolute;
    width: 100px;
    background-color: #888889;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1596px;
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
    bottom: 126px;
    display: block;

    height: 1400px;
    //  background-color: #fff;
    border-radius: 60px;
    box-sizing: border-box;
    padding: 25px;

    &__inner {
        // -webkit-box-shadow: inset 10px 10px 1px 5px #28333b;
        // box-shadow: inset 10px 10px 1px 5px #28333b;
        color: #fff;
        object-fit: contain;
        padding: 20px;
        border-radius: 40px;
        padding: 50px;
        //  background-color: #303e49;
        height: 1250px;
        position: relative;

        &__widget {
            border-radius: 60px;
        }

    }

}

.sectionLabel {
    margin-bottom: 11px;
}
</style>
