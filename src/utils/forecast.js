const request = require("request");

const forecast = (lat, long, callback) => {
  const url_param = decodeURIComponent(lat + "," + long);
  const url =
    "http://api.weatherstack.com/current?access_key=b1f43fdba534b3ffb006099b3ff9bc5c&query="+url_param;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Weather API", undefined);
    } else if (response.body.success===false) {
      callback(response.body.error.info, undefined);
    } else {
        const {temperature,weather_descriptions,precip,weather_icons}=response.body.current
      callback(undefined, {
        temperature,
        precip,
        weather_descriptions,
        weather_icons,
        location:response.body.location.country
      });
    }
  });
};

module.exports = forecast;
