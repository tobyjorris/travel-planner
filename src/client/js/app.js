import { handleSubmit } from "./handeSubmit";
import {updateUI} from "./updateUI";

export const app = () => {
    const submitBtn = document.querySelector('#submit')
    submitBtn.addEventListener('click', handleSubmit)

    const dateInput = document.querySelector('#departureDate')
    dateInput.min = new Date().toISOString().substr(0, 10);

    if (window.localStorage.getItem('trip') !== null) {
        const existingTrip = JSON.parse(window.localStorage.getItem('trip'))
        console.log(existingTrip)
        updateUI(existingTrip)
    }
}

app();


