const convert = require('../weatherHelpers/celsiusToFahrenheit')

function buildWeather(tripDetails, weatherData, weatherResponse) {
    const builtWeatherObject = {};
    builtWeatherObject.weather = [];
    const daysTillDeparture = weatherData.daysTillDeparture;

    if (daysTillDeparture <= 7) {
        builtWeatherObject.weatherMessage = `The weather for the next week in ${tripDetails.cityName} is:`
        for (const day of weatherResponse.data) {
            builtWeatherObject.weather.push({
                date: day.valid_date,
                low: convert.convertCelsiusToFahrenheit(day.low_temp),
                high: convert.convertCelsiusToFahrenheit(day.high_temp),
            })
        }
    } else if (daysTillDeparture > 7 && daysTillDeparture <=16) {
        builtWeatherObject.weatherMessage = `The forecast average temperature for ${tripDetails.cityName} on the day of your arrival is:`
        builtWeatherObject.weather.push({
            date: weatherResponse.data[weatherData.daysTillDeparture].valid_date,
            low: convert.convertCelsiusToFahrenheit(weatherResponse.data[weatherData.daysTillDeparture].low_temp),
            high: convert.convertCelsiusToFahrenheit(weatherResponse.data[weatherData.daysTillDeparture].high_temp),
            avgLow: convert.convertCelsiusToFahrenheit(weatherResponse.data[weatherData.daysTillDeparture].min_temp),
            avgHigh: convert.convertCelsiusToFahrenheit(weatherResponse.data[weatherData.daysTillDeparture].max_temp)
        })
    } else if (daysTillDeparture > 16) {
        builtWeatherObject.weatherMessage = `Weather Data is currently unavailable. Check back closer to trip date.`
    }
    return builtWeatherObject;
}

module.exports = {
    buildWeather
}

