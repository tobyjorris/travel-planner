const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config');
const convertCeltoFahr = require('../client/js/celsiusToFahrenheit')
const pixabayAPI = require('./APIs/pixabayAPI');
const geonamesAPI = require('./APIs/geonamesAPI');
const weatherAPI = require('./APIs/weatherAPI');

const app = express()

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8010;
const listening = port => {
    console.log('listening on port 8010', port)
}

app.post('/bookTrip', async function (req, res) {
    const tripDetails = {
        cityName: req.body.city,
        departureDate: req.body.date,
    };

    // get latitude & longitude of trip destination from Geonames API - needed to retrieve weather from Weatherbit
    await geonamesAPI.getGeonamesData(tripDetails.cityName).then(geonamesData => {
        tripDetails.lat = Number(geonamesData.geonames[0].lat);
        tripDetails.lon = Number(geonamesData.geonames[0].lng);
        tripDetails.state = geonamesData.geonames[0].adminName1;
        tripDetails.country = geonamesData.geonames[0].countryName;
    }).catch(error => console.log('Geonames Error:', error))

    // uses lat & lon of destination to retrieve forecast of trip destination, departure date to determine which forecast to return
    await weatherAPI.getWeatherbitData(tripDetails.lat, tripDetails.lon, tripDetails.departureDate).then(weatherData => {
        weatherData.response.then(weather => {
            // console.log('weather', weather)
            tripDetails.weather = [];
            if (weatherData.daysTillDeparture <= 7) {
                tripDetails.weatherMessage = `The weather for the next week in ${tripDetails.cityName} is:`
                for (const day of weather.data) {
                    tripDetails.weather.push({
                        date: day.valid_date,
                        low: convertCeltoFahr.convertCelsiusToFahrenheit(day.low_temp),
                        high: convertCeltoFahr.convertCelsiusToFahrenheit(day.high_temp),
                    })
                }
            } else if (weatherData.daysTillDeparture > 7 && weatherData.daysTillDeparture <=16) {
                tripDetails.weatherMessage = `The weather forecast & average temperatures for ${tripDetails.cityName} on ${tripDetails.departureDate} is:`
                console.log(weather.data[weatherData.daysTillDeparture])
                    tripDetails.weather.push({
                        date: weather.data[weatherData.daysTillDeparture].valid_date,
                        low: convertCeltoFahr.convertCelsiusToFahrenheit(weather.data[weatherData.daysTillDeparture].low_temp),
                        high: convertCeltoFahr.convertCelsiusToFahrenheit(weather.data[weatherData.daysTillDeparture].high_temp),
                        avgLow: convertCeltoFahr.convertCelsiusToFahrenheit(weather.data[weatherData.daysTillDeparture].min_temp),
                        avgHigh: convertCeltoFahr.convertCelsiusToFahrenheit(weather.data[weatherData.daysTillDeparture].max_temp)
                    })
            } else if (weatherData.daysTillDeparture > 16) {
                tripDetails.weatherMessage = `Weather Data is currently unavailable. Check back closer to trip date.`
            }
        })
    }).catch(error => console.log('Weatherbit Error:', error));

    // retrieves URL of first image returned from Pixabay using city name as a search term
    await pixabayAPI.getPixabayImg(tripDetails.cityName).then(pixabayData => {
        tripDetails.imageURL = pixabayData.hits[0].webformatURL;
    }).catch(error => console.log('Pixabay Error:', error));

    try {
        res.send(tripDetails)
    } catch(error){
        console.log(error)
    }
})

const server = app.listen(port, listening(port));
