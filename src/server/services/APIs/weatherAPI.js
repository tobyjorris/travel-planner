const fetch = require('node-fetch');
const calculateDateDif = require('../../../client/js/dateCalculator');

async function getWeatherbitData(latitude, longitude, departureDate) {
    const daysTillDeparture = calculateDateDif.calculateDateDifference(departureDate);
    const futureForecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&days=16&key=${process.env.WEATHERBIT_KEY}`
    const sevenDayForecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&days=7&key=${process.env.WEATHERBIT_KEY}`
    const url = daysTillDeparture <= 7 ? sevenDayForecastURL : futureForecastURL;

    const response = await fetch(encodeURI(url))

    try {
        return {daysTillDeparture: daysTillDeparture, response: response.json()}
    } catch (error) {
        console.log('error getting Geonames data', error)
    }
}

module.exports = {
    getWeatherbitData
}
