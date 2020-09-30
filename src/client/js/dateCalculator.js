function calculateDateDifference(departureDate) {
    const todaysDate = new Date();
    const departDate = new Date(departureDate);
    return Math.ceil((departDate.getTime() - todaysDate.getTime()) / (1000 * 3600 * 24))
}

module.exports = {
    calculateDateDifference
}
