const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/7004b732580bda9450afba82ed027851/' + latitude + ',' + longitude
  request({url, json:true}, (error, {body}) => {
    if(error){
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find the location', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + " degrees outside")
    }
  })
}

module.exports = forecast
