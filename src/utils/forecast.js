const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b3598ea0213449bb7b1c866058f9e1e6/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to fetch Weather Services!', undefined)
        }
        else if(body.error){
            callback('Unable to fetch weather API!', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' C degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The temperature high can be around ' + body.daily.data[0].temperatureHigh + ' C degrees.')
        }
    })
}

module.exports = forecast
