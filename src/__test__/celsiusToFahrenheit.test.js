import { convertCelsiusToFahrenheit } from '../client/js/weatherHelpers/celsiusToFahrenheit';

test('test convertCelsiusToFahrenheit, rounds to nearest whole number and returns a string', () => {
    expect(convertCelsiusToFahrenheit(32)).toBe("90")
})
