/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const weatherAPIKey = '&appid=216f554eba2fc696fb25a057d168a2e9';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postDataToServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

const getWeatherInfo = async function(zip) {
    const request = await fetch(baseURL + zip + weatherAPIKey)
    try {
        return request.json();
    } catch (error) {
        console.log('error getting weather info', error)
    }
}

const getProjectDataFromServer = async (url='') => {
    const response = await fetch(url);
    try {
        return response.json();
    } catch (error) {
        console.log('error getting data from server', error)
    }
}

const updateUI = async (data) => {
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('temp').textContent = `Temperature: ${data.temp} degrees`;
    document.getElementById('content').textContent = `Feelings: ${data.userResponse}`;
}

const convertKelvinToFahrenheit = temp => (temp * 9/5 - 459.67).toFixed(0);

const onClickGenerate = () => {
    const zipCode = document.querySelector('#zip').value;
    const userResponse = document.querySelector('#feelings').value;
    let dataObject = {
        date: newDate,
        temp: '',
        userResponse: userResponse,
    };
    getWeatherInfo(zipCode)
        .then(data => dataObject['temp'] = convertKelvinToFahrenheit(data.main['temp']))
        .then(() => postDataToServer('/addData', dataObject))
        .then(() => getProjectDataFromServer('/returnData'))
        .then(data => updateUI(data));
}

document.getElementById('generate').addEventListener('click', onClickGenerate);
