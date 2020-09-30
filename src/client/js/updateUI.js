
function updateUI(trip) {
    const tripHolder = document.querySelector('#tripCard')
    const weatherList = document.createElement('ul')
    weatherList.classList.add('weatherList')

    for (const day of trip.weather) {
        const weatherDay = document.createElement('li');
        weatherDay.classList.add('weatherDay');
        weatherDay.textContent = `${day.date}: low: ${day.low} | high: ${day.high}`;
        weatherList.appendChild(weatherDay)
    }

    console.log(weatherList)

    tripHolder.innerHTML = `
        <div class="tripDate">${trip.departureDate}</div>
        <div class="tripDestination">${trip.cityName} ${trip.state}</div>
        <img class="tripImage" src="${trip.imageURL}"  alt="Picture of ${trip.cityName}">
        <div class="weatherHolder">Weather Forecast:</div> 
        <button type="submit" onsubmit="localStorageService.writeToLocalStorage(${trip})" class="save btn">Save Trip</button>
        <button class="cancel btn">Cancel Trip</button>
    `

    const weatherHolder = document.querySelector('.weatherHolder')
    weatherHolder.appendChild(weatherList)

}

module.exports = {
    updateUI
}

// <div class="holder trip">
//
//</div>
