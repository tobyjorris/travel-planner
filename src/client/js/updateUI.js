function updateUI(trip) {
    const tripHolder = document.querySelector('#tripCard')
    const weatherList = document.createElement('ul')
    weatherList.classList.add('weatherList')

    for (const day of trip.weather) {
        const weatherDay = document.createElement('li');
        if (trip.weather.length > 1) {
            weatherDay.classList.add('weatherIsList');
        } else {
            weatherDay.classList.add('weatherDay')
        }

        weatherDay.textContent = `${day.date} - low temp: ${day.low} | high temp: ${day.high}`;
        weatherList.appendChild(weatherDay)
    }

    console.log(weatherList)

    tripHolder.innerHTML = `
        <div class="tripCardBackground">
            <div class="tripDateTitle">Departure Date: </div>
            <div class="tripDate">${trip.departureDate}</div>
            <div class="tripDestinationTitle">Destination:</div>
            <div class="tripDestination">${trip.cityName}</div>
            <img class="tripImage" src="${trip.imageURL}"  alt="Picture of ${trip.cityName}">
            <div class="weatherHolder">Weather Forecast:</div> 
            <button type="button" class="save btn">Save Trip</button>
            <button class="cancel btn">Cancel Trip</button>
        </div>
    `
    const weatherHolder = document.querySelector('.weatherHolder')
    weatherHolder.appendChild(weatherList)

}

module.exports = {
    updateUI
}
