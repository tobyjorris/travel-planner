import { updateUI } from "../index";
import { localStorageService } from "./services/localstorage";

export const handleSubmit = async event => {
    event.preventDefault();
    const tripInformation = {
        city: document.querySelector('#destination').value,
        date: document.querySelector('#departureDate').value,
    }

    await postDataToServer('http://localhost:8010/bookTrip', tripInformation)
        .then(serverTripData => {
            console.log(serverTripData);
            localStorageService.writeToLocalStorage(serverTripData);

            //save data to local storage using localstorage.js

            //update UI (might need to manually remove the loading spinner?)
            updateUI(serverTripData)
    })

    // can I render a spinning animation here to indicate loading? Then stop it in the 'then' block of postData?

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
