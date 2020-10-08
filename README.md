# Travel Planner - Capstone

This is the capstone project from the Front End Developer Nanodegree progam from [Udacity](https://www.udacity.com). This project utilizes three different API's to construct a trip based on user input (destination and departure date). The [Geonames API](http://geonames.org) returns the first found result of latitude, longitude, city name, state, and country of the location entered by the user. That information is then passed to the [Weatherbit API](http://weatherbit.io) which returns weather for the destination. Finally, the [Pixabay API](http://www.pixabay.com) is utlized to return a photo of the destination.

##Standout Feature

The extra feature added to this program utilizes local storage. When the API information is returned from the server, it is automatically stored into local storage. If the user reloads the page at this point, `app.js` reaches out to local storage to check for an existing trip. If it finds one, it calls `updateUi` with the trip object. The trip card displayed to the user also has a cancel button that will remove the trip from local storage. Additionally, if the user enters a new trip, it will erase the current trip in local storage and add the new trip in it's place. 

## Development Server

Run `npm run build-dev` for a dev server. Navigate to `http://localhost:3010/`.

## Production Server

Run `npm run build-prod` to create a new dist folder for production.

## Express Server

This app uses an express server running on Port 8010. Run `npm start` to launch. 

## Testing

This app uses Jest to test one aspect of the server and one aspect of the client code. In server.js, the /bookTrip post route is tested to return with a status code of 200. On the client side, the converCelsiusToFahrenheit method is tested to ensure it is converting temperatures properly. 
