const request=require('request')

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidXJndXJ1LTQ2NDgiLCJhIjoiY2s5M3g1b3ZtMDBodTNmbjNjZGhnNG55MCJ9.meD_7CzCkbPmHT-f3AalZg";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        (error = "Unable to connect to the location service"),
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback(
        (error = "Unable to find location.Try another search"),
        undefined
      );
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      });
    }
  });
};


module.exports=geoCode