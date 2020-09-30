import { handleSubmit } from "./handeSubmit";

export const app = () => {
    const submitBtn = document.querySelector('#submit')
    submitBtn.addEventListener('click', handleSubmit)

    const dateInput = document.querySelector('#departureDate')
    dateInput.min = new Date().toISOString().substr(0, 10);
}

app();


