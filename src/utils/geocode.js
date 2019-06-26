const request = require("request");

const geocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places"
const geocodeAccessToken = "access_token=pk.eyJ1IjoiYW1icjg5NzgiLCJhIjoiY2p3eTJiZmRxMTBsODN5bXpxcDZuMjFtdCJ9.6lkB89T60sshe2t0ZV0Ybw"

const geocode = (address, callback) => {
    let url = geocodingUrl + "/" + encodeURIComponent(address) + ".json?" + geocodeAccessToken;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search!", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode