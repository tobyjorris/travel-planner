const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config');
const buildWeather = require('../client/js/weatherHelpers/weatherBuilder')
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

app.post('/bookTrip', async (req, res) => {
    const tripDetails = {
        departureDate: req.body.date,
    };

    // get latitude & longitude of trip destination from Geonames API - needed to retrieve weather from Weatherbit
    await geonamesAPI.getGeonamesData(req.body.city).then(geonamesData => {
        tripDetails.cityName = geonamesData.geonames[0].name;
        tripDetails.lat = Number(geonamesData.geonames[0].lat);
        tripDetails.lon = Number(geonamesData.geonames[0].lng);
        tripDetails.state = geonamesData.geonames[0].adminName1;
        tripDetails.country = geonamesData.geonames[0].countryName;
    }).catch(error => console.log('Geonames Error:', error))

    // uses lat & lon of destination to retrieve forecast of trip destination, departure date to determine which forecast to return
    await weatherAPI.getWeatherbitData(tripDetails.lat, tripDetails.lon, tripDetails.departureDate).then(weatherData => {
        weatherData.response.then(weatherResponse => {
            const weatherObject = buildWeather.buildWeather(tripDetails, weatherData, weatherResponse);
            tripDetails.weather = weatherObject.weather;
            tripDetails.weatherMessage = weatherObject.weatherMessage;
            console.log('tripDetails', tripDetails)
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
