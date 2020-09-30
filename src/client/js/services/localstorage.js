class localStorageService {
    constructor() {
    }

    static writeToLocalStorage(trip) {
        const existingTrip = JSON.parse(window.localStorage.getItem('trip'));
        if (existingTrip !== null) {
            existingTrip.push(trip);
            window.localStorage.setItem('trip', JSON.stringify(existingTrip));
        } else {
            window.localStorage.setItem('trip', JSON.stringify([trip]));
        }
    }

    static getFromLocalStorage() {
        return JSON.parse(window.localStorage.getItem('trip'));
    }

    static clearLocalStorage() {
        window.localStorage.removeItem('trip');
    }
}

module.exports = {
    localStorageService
}

