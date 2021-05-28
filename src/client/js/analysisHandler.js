import { checkUrl } from './urlChecker'

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, { minDate: new Date() });
    document.getElementById('travel-button').addEventListener('click', retrieveTravelData);
});

$('#travel-first-day').datepicker({
    autoclose: true
}).on('change', function(e) {
    const firstDay = e.target.M_Datepicker.date;
    const lastDay = new Date($('#travel-last-day').val());
    //on change of date on start datepicker, set end datepicker's date
    $('#travel-last-day').datepicker({
        defaultDate: firstDay,
        minDate: firstDay,
    })
    if (lastDay != null && lastDay < firstDay) {
        const lastDayInputField = M.Datepicker.getInstance($('#travel-last-day'));
        lastDayInputField.setDate(firstDay);
        lastDayInputField._finishSelection();
    }
});


async function retrieveTravelData(e) {
    e.preventDefault();
    const cityName = document.getElementById('city-input').value;
    $('#card-main-info').fadeOut(function() {
        $('#card-main-info').html("Loading..");
        $('#card-main-info').fadeIn();
    })
    const cityData = await getCoordinates(cityName);
    const imageData = await getImage(cityName);
    const weather = await getWeather(cityData);
    console.log(cityData)
    console.log(weather)
    console.log(imageData)
    updateUI(cityData, imageData, weather);
}

async function getCoordinates(cityName) {
    const response = await fetch('/api/getCoordinates', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    })
    const coordinates = response.json();
    return coordinates;
}

async function getWeather(cityData) {
    const response = await fetch('/api/getWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityData: cityData })
    })
    const weather = response.json();
    return weather;
}

async function getImage(cityName) {
    const response = await fetch('/api/getImage', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    })
    const imageData = response.json();
    return imageData;
}


function updateUI(cityData, imageData, weather) {
    $('#card-title').fadeOut(function() {
        $(this).html(cityData.geonames[0].name);
        $(this).fadeIn();
    })
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const randomImg = random(0, imageData.hits.length);
    $('#card-img-container').height(250);
    $('#card-img').attr('src', imageData.hits[randomImg].webformatURL)
        // document.getElementById('status').innerHTML = 'Success!'
        // document.getElementById('agreement').innerHTML = `${response.geonames[0].lat}`
        // document.getElementById('confidence').innerHTML = `${response.geonames[0].lng}`
        // document.getElementById('irony').innerHTML = `${response.geonames[0].countryName}`
        // document.getElementById('subjectivity').innerHTML = `${response.subjectivity}`
        // document.getElementById('score').innerHTML = `${response.score_tag}`
}

function cleanUI() {
    document.getElementById('agreement').innerHTML = '';
    document.getElementById('confidence').innerHTML = '';
    document.getElementById('irony').innerHTML = '';
    document.getElementById('subjectivity').innerHTML = '';
    document.getElementById('score').innerHTML = '';
}

export { updateUI }