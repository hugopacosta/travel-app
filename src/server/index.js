const path = require('path')
const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const app = express()

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

console.log(__dirname)
console.log(`Your API key is ${process.env.API_KEY}`);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/sentiment-analysis', function(req,res) {
    const sentimentAnalysisURL = 'https://api.meaningcloud.com/sentiment-2.1?' + new URLSearchParams({
                                                                                                key: process.env.API_KEY,
                                                                                                lang: 'en',
                                                                                                url: req.body.url
                                                                                            });
                                                            
                                                                                        
                        
    fetch(sentimentAnalysisURL, { method: 'POST' })
                                 .then(response => response.json())
                                 .then(data => res.send(data))
                                 .catch(error => console.log('error', error));
})