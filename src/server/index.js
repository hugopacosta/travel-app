const path = require('path')
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const app = express()

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// app.post('/sentiment-analysis', function(req,res) {
//     const sentimentAnalysisURL = 'https://api.meaningcloud.com/sentiment-2.1?' + new URLSearchParams({
//                                                                                                 key: process.env.API_KEY,
//                                                                                                 lang: 'en',
//                                                                                                 url: req.body.url
//                                                                                             });



//     fetch(sentimentAnalysisURL, { method: 'POST' })
//                                  .then(response => response.json())
//                                  .then(data => res.send(data))
//                                  .catch(error => console.log('error', error));
// })

app.post('/getCoordinates', function (req, res) {
    const geonamesURL = 'http://api.geonames.org/searchJSON?' + new URLSearchParams({
        username: process.env.GEONAMES_USERNAME,
        maxRows: 1,
        name: req.body.cityName
    });


    fetch(geonamesURL, { method: 'GET' })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log('error', error));
})

app.post('/getWeather', function (req, res) {
    const geonamesURL = 'https://api.weatherbit.io/v2.0/forecast/daily?' + new URLSearchParams({
        key: process.env.WEATHERBIT_API_KEY,
        lat: req.body.cityData.geonames[0].lat,
        lon: req.body.cityData.geonames[0].lng
    });


    fetch(geonamesURL, { method: 'GET' })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log('error', error));
})

app.post('/getImage', function (req, res) {
    const geonamesURL = 'https://pixabay.com/api/?' + new URLSearchParams({
        key: process.env.PIXABAY_API_KEY,
        q: req.body.cityName,
        image_type: 'photo'
    });


    fetch(geonamesURL, { method: 'GET' })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log('error', error));
})