const fetch = require('node-fetch')

async function getPixabayImg(cityParamTerm) {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${cityParamTerm}&category=places&image_type=photo`
    const encodedURL = encodeURI(url);

    const response = await fetch(encodedURL)
    try {
        return response.json();
    } catch (error) {
        console.log('error getting Pixabay data', error)
    }
}

module.exports = {
    getPixabayImg
}
