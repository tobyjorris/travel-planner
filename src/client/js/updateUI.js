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

    tripHolder.innerHTML = `
        <div class="tripCardBackground" id="currentTrip">
            <div class="tripDateTitle">Departure Date: </div>
            <div class="tripDate">${trip.departureDate}</div>
            <div class="tripDestinationTitle">Destination:</div>
            <div class="tripDestination">${trip.cityName}</div>
            <img class="tripImage" src="${trip.imageURL}"  alt="Picture of ${trip.cityName}">
            <div class="weatherHolder">
                <div class="weatherMessage">${trip.weatherMessage}</div>
            </div> 
            <button class="cancel btn">Cancel Trip</button>
        </div>
    `
    const weatherHolder = document.querySelector('.weatherHolder')
    weatherHolder.appendChild(weatherList)

    const cancelButton = document.querySelector('.cancel');
    cancelButton.addEventListener('click', () => {
        window.localStorage.removeItem('trip');
        const currentTrip = document.getElementById('currentTrip');
        currentTrip.remove();
    })

}

module.exports = {
    updateUI
}
