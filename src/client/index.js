import { app } from './js/app'
import { handleSubmit } from './js/handeSubmit';
import { calculateDateDifference } from './js/dateCalculator';
import { convertCelsiusToFahrenheit } from './js/weatherHelpers/celsiusToFahrenheit';
import { updateUI } from './js/updateUI';
import { buildWeather } from './js/weatherHelpers/weatherBuilder'

import './styles/styles.scss'
import './styles/footer.scss'
import './styles/tripCard.scss'

import './assets/background.jpg'

export {
    handleSubmit,
    calculateDateDifference,
    convertCelsiusToFahrenheit,
    updateUI,
    buildWeather,
    app
}
