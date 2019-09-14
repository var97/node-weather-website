const request = require('request')

const geocode = (address, callback) => {

        const url = 'Put your api url'


    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to fetch the location Services', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to fetch the location. Try another!', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
