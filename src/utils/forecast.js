const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'Put your api url'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to fetch Weather Services!', undefined)
        }
        else if(body.error){
            callback('Unable to fetch weather API!', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The timezone is ' + body.timezone + ' .')
        }
    })
}

module.exports = forecast
