import { app } from './js/app'
import { handleSubmit } from './js/handeSubmit';
import { localStorageService } from './js/services/localstorage';
import { calculateDateDifference } from './js/dateCalculator';
import { convertCelsiusToFahrenheit } from './js/celsiusToFahrenheit';
import { updateUI } from './js/updateUI';

import './styles/styles.scss'
import './styles/navbar.scss'
import './styles/footer.scss'
import './styles/tripCard.scss'

import './assets/background.jpg'

export {
    handleSubmit,
    localStorageService,
    calculateDateDifference,
    convertCelsiusToFahrenheit,
    updateUI,
    app
}
