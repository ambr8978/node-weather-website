const request = require("request");

const forecastUrl = "https://api.darksky.net/forecast/7de3a1c3c21e2594811858382dcb9f83";

const forecast = (latitude, longitude, callback) => {
    let url = forecastUrl + "/" + latitude + "," + longitude;
    request({ url, json: true }, (error, {body} ) => {
        if (error) {
            callback("Unable to connect to forecast service!", undefined);
        } else if (body.error) {
            callback("Unable to find provided location: " + latitude + ", " + longitude + "!", undefined);
        } else {
            let dailySummary = body.daily.data[0].summary;
            let currentTemp = body.currently.temperature;
            let percipitationProbability = body.currently.precipProbability;
            callback(undefined, {                
                forecast: (dailySummary + " It is currently " + currentTemp + " degrees out. There is currently a " + percipitationProbability + "% chance of rain.") 
            })
        }
    });
}

module.exports = forecast;