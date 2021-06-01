document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.datepicker');
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);
    const instances = M.Datepicker.init(elems, { minDate: new Date(), maxDate: maxDate, autoClose: true });
    document.getElementById('travel-button').addEventListener('click', retrieveTravelData);
});

$('#travel-first-day').datepicker({
    autoclose: true
}).on('change', function(e) {
    const firstDay = e.target.M_Datepicker.date;
    if (firstDay != null) {
        firstDay.setDate(firstDay.getDate() + 1);
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 15);
        const lastDay = new Date($('#travel-last-day').val());

        $('#travel-last-day').datepicker({

            defaultDate: firstDay,
            minDate: firstDay,
            maxDate: maxDate,
            autoClose: true,
        })
        if (lastDay != null && lastDay < firstDay) {
            const lastDayInputField = M.Datepicker.getInstance($('#travel-last-day'));
            lastDayInputField.setDate(firstDay);
            lastDayInputField._finishSelection();
        }
    }
});

//Main method for retrieving data from the APIs
async function retrieveTravelData(e) {
    e.preventDefault();
    if (validateForm()) {
        const cityName = document.getElementById('city-input').value;
        updateLoading();
        try {
            const cityData = await getCoordinates(cityName);
            const imageData = await getImage(cityName);
            let weather;
            if (daysUntilTravel() + travelDuration() < 7) {
                //Fetch current weather info
                weather = await getCurrentWeather(cityData);
            } else {
                //Fetch forecast
                weather = await getWeather(cityData);
            }
            updateUI(cityData, imageData, weather);
        } catch (error) {
            console.log("Error fetching API response");
        }
    }
}

//Fetch coordinates from geonames API
async function getCoordinates(cityName) {
    const response = await fetch('/api/getCoordinates', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    }).catch(function() {
        console.log("Error retreving data from API");
    });
    if (response.ok) {
        const coordinates = response.json();
        return coordinates;
    } else throw new Error(response.statusText);
}

//Fetch current weather data for travels within 7 days from weatherbit
async function getCurrentWeather(cityData) {
    const response = await fetch('/api/getCurrentWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cityData: cityData
        })
    }).catch(function() {
        console.log("Error retreving data from API");
    });
    if (response.ok) {
        const weather = response.json();
        return weather;
    } else throw new Error(response.statusText);
}

//Fetch weather forecast data from weatherbit
async function getWeather(cityData) {
    const response = await fetch('/api/getWeather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityData: cityData })
    }).catch(function() {
        console.log("Error retreving data from API");
    });
    if (response.ok) {
        const weather = response.json();
        return weather;
    } else throw new Error(response.statusText);
}

//Fetch image from pixabay
async function getImage(cityName) {
    const response = await fetch('/api/getImage', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName: cityName })
    }).catch(function() {
        console.log("Error retreving data from API");
    });
    if (response.ok) {
        const imageData = response.json();
        return imageData;
    } else throw new Error(response.statusText);
}

//Update UI with loading text
function updateLoading() {
    $('#card-main-info').fadeOut(function() {
        $('#card-main-info').html("Loading..");
        $('#card-main-info').fadeIn();
    })
}

//Update UI with fetched data
function updateUI(cityData, imageData, weather) {
    updateCard(cityData, imageData);
    setCardOverviewText(cityData);
    setCardWeatherInfo(weather);
}

//Update card with retrieved info
function updateCard(cityData, imageData) {
    $('#card-title').html(cityData.geonames[0].name + '<i id="card-icon" style="pointer-events:none" class="fas fa-ellipsis-v right activator"></i>');
    $('#card-title').addClass("activator");
    $('#card-img').addClass("activator");
    $('#card-icon').removeClass("scale-out");
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const randomImg = random(0, imageData.hits.length);
    $('#card-img-container').height(250);
    $('#card-img').attr('src', imageData.hits[randomImg].webformatURL)
}

//Set the main text of the card
function setCardOverviewText(cityData) {
    if (daysUntilTravel() == 0) {
        $('#card-main-info').html(`Your travel to ${cityData.geonames[0].name} is today!`)
    } else if (daysUntilTravel() == 1) {
        $('#card-main-info').html(`Your travel to ${cityData.geonames[0].name} is tomorrow!`)
    } else {
        $('#card-main-info').html(`Your travel to ${cityData.geonames[0].name} is in ${daysUntilTravel()} days!`)
    }
    if (travelDuration() == 0 || travelDuration() == 1) {
        $('#card-main-info').append(`It is a one day trip.`)
    } else {
        $('#card-main-info').append(`It will last for ${travelDuration()} days.`)
    }
}

//Set weather info on the card
function setCardWeatherInfo(weather) {
    $('#card-reveal-info-text').html(`The average temperature is ${weather.data[0].temp} Celsius.
                                      The weather will be mostly ${weather.data[0].weather.description}.`);
    $('#card-reveal-weather-img').attr("src", `https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`);


}

//Return number of days until the first day of the travel
function daysUntilTravel() {
    const todayDate = new Date();
    const firstDay = new Date($('#travel-first-day').val());
    firstDay.setHours(todayDate.getHours(), todayDate.getMinutes() + 1, todayDate.getSeconds());
    var time_difference = firstDay.getTime() - todayDate.getTime();
    var days = time_difference / (1000 * 60 * 60 * 24);
    return Math.round(days);
}

//Return number of days the travel will last for
function travelDuration() {
    const firstDay = new Date($('#travel-first-day').val());
    const lastDay = new Date($('#travel-last-day').val());
    var time_difference = lastDay.getTime() - firstDay.getTime();
    var days = time_difference / (1000 * 60 * 60 * 24);
    return Math.round(days);
}

//Validate input from user
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

export { retrieveTravelData, updateUI }