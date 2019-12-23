const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()  //express is just a function

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vinit Prabhu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    helpText: "Use this site to get weather information!",
    name: "Vinit Prabhu"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Vinit Prabhu"
  })
})

app.get('/weather', (req,res) => {
  if(!(req.query.address)){
    return res.send({
      error: "Must provide an address"
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude,(error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: "Weather Forecast: " + forecastData,
        location: "Location: " + location,
        address: req.query.address
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Vinit Prabhu",
    errorMessage: "Page Not Found"
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
