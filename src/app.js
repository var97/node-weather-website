const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//defined paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Varun Agarwal'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Varun Agarwal'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Sample Help Message',
        name: "Varun Agarwal"
    })
})

app.get('/weather', (req, res)=>{
    const loc = req.query.address
    if(!loc){
        return res.send({
            error: 'No address! Please provide an address'
        })
    }
    else{
        geocode(loc, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
        
               res.send({
                   location: location,
                   forecastData: forecastData,
                   address: loc
               })
        })
        })
    }
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//wildcard character for 404 page if match not found
app.get('/help/*', (req, res)=>{
    res.render('404page', {
        title: '404',
        errorMessage: 'Help Article not found',
        name: 'Varun Agarwal'
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Varun Agarwal'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.com
