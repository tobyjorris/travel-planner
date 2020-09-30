const fetch = require('node-fetch');

async function getGeonamesData(city) {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.GEONAMES_KEY}`
    const encodedURL = encodeURI(url);

    const request = await fetch(encodedURL)
    try {
        return request.json();
    } catch (error) {
        console.log('error getting Geonames data', error)
    }
}

module.exports = {
    getGeonamesData
}
