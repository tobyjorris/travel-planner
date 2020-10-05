import { updateUI } from "../index";

export const handleSubmit = async event => {
    event.preventDefault();
    const tripInformation = {
        city: document.querySelector('#destination').value,
        date: document.querySelector('#departureDate').value,
    }

    if (tripInformation.city !== "" && tripInformation.date !== "") {
        await postDataToServer('http://localhost:8010/bookTrip', tripInformation)
            .then(serverTripData => {
                console.log(serverTripData)
                window.localStorage.setItem('trip', JSON.stringify(serverTripData))
                updateUI(serverTripData)
            })
    } else {
        alert('Must Enter Destination & Date!')
    }

}


const postDataToServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}
