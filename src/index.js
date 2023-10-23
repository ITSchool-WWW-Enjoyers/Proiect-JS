const apiKey = "8a15946d573d485bb8971932231610";
const searchBtn = document.getElementById("searchBtn");



searchBtn.addEventListener("click", function () {
    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value;
    function logSubmit(event) {
        event.preventDefault();
    }
    const form = document.getElementById("form");

    form.addEventListener("submit", logSubmit);

    if (cityName) {
        getTodayWeatherData(apiKey, cityName);
        getForecastWeatherData(apiKey, cityName);
    } else {
        alert("Please enter city name.");
    }
});

async function getTodayWeatherData(apiKey, city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    let apiResponse = await fetch(apiUrl);
    let jsonResponse = await apiResponse.json();

    if (jsonResponse !== undefined && jsonResponse !== null) {
        const weatherData = {
            temperature: jsonResponse.current.temp_c,
            weatherDescription: jsonResponse.current.condition.text,
            humidity: jsonResponse.current.humidity,
            windSpeed: jsonResponse.current.wind_kph,
        };

        displayWeatherData(weatherData);
    } else {
        alert("City not found. Please check the city name.");
    }

}

function displayWeatherData(data) {
    const weatherDataContainer = document.getElementById("weatherData");
    const temperatureElement = document.getElementById("temperature");
    const weatherDescriptionElement = document.getElementById("weatherDescription");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");

    temperatureElement.textContent = data.temperature;
    weatherDescriptionElement.textContent = data.weatherDescription;
    humidityElement.textContent = data.humidity;
    windSpeedElement.textContent = data.windSpeed;

    weatherDataContainer.classList.remove("hidden");
}

async function getForecastWeatherData(apiKey, city) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no`;
    let apiResponse = await fetch(apiUrl);
    let jsonResponse = await apiResponse.json();

    if (jsonResponse.error) {
        alert(jsonResponse.error.message);
    }
    if (jsonResponse !== undefined && jsonResponse !== null) {
        for (var i = 1; i < jsonResponse.forecast.forecastday.length; i++) {
            const weatherDataForecast = {
                temperature: jsonResponse.forecast.forecastday[i].day.avgtemp_c,
                weatherDescription: jsonResponse.forecast.forecastday[i].day.condition,
                humidity: jsonResponse.forecast.forecastday[i].day.avghumidity,
                windSpeed: jsonResponse.forecast.forecastday[i].day.maxwind_kph,
            };
            displayForecastWeatherData(weatherDataForecast, i);
        }
    } else {
        alert("City not found. Please check the city name.");
    }

}

function displayForecastWeatherData(forecastData, index) {
    const weatherForecastContainer = document.getElementById("forecastData");
    const temperatureElementForecast = document.getElementById(`temperatureForecast${index}`);
    const weatherDescriptionElementForecast = document.getElementById(`weatherDescriptionForecast${index}`);
    const humidityElementForecast = document.getElementById(`humidityForecast${index}`);
    const windSpeedElementForecast = document.getElementById(`windSpeedForecast${index}`);

    temperatureElementForecast.textContent = forecastData.temperature;
    weatherDescriptionElementForecast.textContent = forecastData.weatherDescription.text;
    humidityElementForecast.textContent = forecastData.humidity;
    windSpeedElementForecast.textContent = forecastData.windSpeed;
    weatherForecastContainer.classList.remove("hidden");
}
