import { checkUrl } from './urlChecker'

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', retrieveTravelData);
    document.getElementById('twitter-icon').appendChild(twitter);
});

async function retrieveTravelData(e) {
    e.preventDefault();
    const cityName = document.getElementById('city-input').value;
    document.getElementById('status').innerHTML = 'Loading...';
    const cityData = await getCoordinates(cityName);
    const weather = await getWeather(cityData);
    const imageData = await getImage(cityName);
    console.log(imageData)
}

async function getCoordinates(cityName) {
    const response = await fetch('http://localhost:8081/getCoordinates', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    })
    const coordinates = response.json();
    return coordinates;
}

async function getWeather(cityData){
    const response = await fetch('http://localhost:8081/getWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityData: cityData })
    })
    const weather = response.json();
    return weather;
}

async function getImage(cityName){
    const response = await fetch('http://localhost:8081/getImage', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    })
    const imageData = response.json();
    return imageData;
}


function updateUI(response) {
    document.getElementById('status').innerHTML = 'Success!'
    document.getElementById('agreement').innerHTML = `${response.geonames[0].lat}`
    document.getElementById('confidence').innerHTML = `${response.geonames[0].lng}`
    document.getElementById('irony').innerHTML = `${response.geonames[0].countryName}`
    document.getElementById('subjectivity').innerHTML = `${response.subjectivity}`
    document.getElementById('score').innerHTML = `${response.score_tag}`
}

function cleanUI() {
    document.getElementById('agreement').innerHTML = '';
    document.getElementById('confidence').innerHTML = '';
    document.getElementById('irony').innerHTML = '';
    document.getElementById('subjectivity').innerHTML = '';
    document.getElementById('score').innerHTML = '';
}

export { updateUI }
