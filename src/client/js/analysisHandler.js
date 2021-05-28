import { checkUrl } from './urlChecker'

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, { minDate: new Date(), autoClose: true });
    document.getElementById('travel-button').addEventListener('click', retrieveTravelData);
});

$('#travel-first-day').datepicker({
    autoclose: true
}).on('change', function(e) {
    const firstDay = e.target.M_Datepicker.date;
    const lastDay = new Date($('#travel-last-day').val());
    $('#travel-last-day').datepicker({
        defaultDate: firstDay,
        minDate: firstDay,
        autoClose: true,
    })
    if (lastDay != null && lastDay < firstDay) {
        const lastDayInputField = M.Datepicker.getInstance($('#travel-last-day'));
        lastDayInputField.setDate(firstDay);
        lastDayInputField._finishSelection();
    }
});

async function retrieveTravelData(e) {
    e.preventDefault();
    if (validateForm()) {
        const cityName = document.getElementById('city-input').value;
        updateLoading();
        const cityData = await getCoordinates(cityName);
        const imageData = await getImage(cityName);
        const weather = await getWeather(cityData);
        console.log(cityData)
        console.log(weather)
        console.log(imageData)
        updateUI(cityData, imageData, weather);
    }
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

function updateLoading() {
    $('#card-main-info').fadeOut(function() {
        $('#card-main-info').html("Loading..");
        $('#card-main-info').fadeIn();
    })
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
    $('#card-main-info').html(`Your travel to ${cityData.geonames[0].name} is in ${daysUntilTravel()} days! It will last for ${travelDuration()} days.`)
        // document.getElementById('status').innerHTML = 'Success!'
        // document.getElementById('agreement').innerHTML = `${response.geonames[0].lat}`
        // document.getElementById('confidence').innerHTML = `${response.geonames[0].lng}`
        // document.getElementById('irony').innerHTML = `${response.geonames[0].countryName}`
        // document.getElementById('subjectivity').innerHTML = `${response.subjectivity}`
        // document.getElementById('score').innerHTML = `${response.score_tag}`
}

function daysUntilTravel() {
    const todayDate = new Date();
    const firstDay = new Date($('#travel-first-day').val());
    firstDay.setHours(todayDate.getHours(), todayDate.getMinutes() + 1, todayDate.getSeconds());
    var time_difference = firstDay.getTime() - todayDate.getTime();
    var days = time_difference / (1000 * 60 * 60 * 24);
    return Math.round(days);
}

function travelDuration() {
    const firstDay = new Date($('#travel-first-day').val());
    const lastDay = new Date($('#travel-last-day').val());
    var time_difference = lastDay.getTime() - firstDay.getTime();
    var days = time_difference / (1000 * 60 * 60 * 24);
    return Math.round(days);
}

function validateForm() {
    const cityInputValue = $('#city-input').val();
    const firstDayValue = $('#travel-first-day').val();
    const lastDayValue = $('#travel-last-day').val();
    if (cityInputValue != '' && firstDayValue != '' && lastDayValue != '') return true;
    else {
        if (cityInputValue == "") {
            $('#city-input').removeClass("valid")
            $('#city-input').addClass("invalid")
        } else {
            $('#city-input').removeClass("invalid")
            $('#city-input').addClass("valid")
        }
        if (firstDayValue == "") {
            $('#travel-first-day').removeClass("valid")
            $('#travel-first-day').addClass("invalid")
        } else {
            $('#travel-first-day').removeClass("invalid")
            $('#travel-first-day').addClass("valid")
        }
        if (lastDayValue == "") {
            $('#travel-last-day').removeClass("valid")
            $('#travel-last-day').addClass("invalid")
        } else {
            $('#travel-last-day').removeClass("invalid")
            $('#travel-last-day').addClass("valid")
        }
        $('#card-img-container').height(0);
        $('#card-title, #card-main-info').fadeOut(function() {
            $('#card-title').html("Error");
            $('#card-main-info').html("Please fill all the input fields");
            $('#card-title, #card-main-info').fadeIn();
        })
        return false;
    }
}

export { updateUI }