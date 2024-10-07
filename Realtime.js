async function getWeatherData(apiUrl, elementId) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
        }

        const weatherData = await response.json();
        console.log(weatherData);

        const targetElement = document.getElementById(elementId);

        // Update the element with the fetched weather data
        targetElement.innerHTML = `
            Temperature: ${weatherData.current_weather.temperature} ${weatherData.current_weather_units.temperature}<br>
            Windspeed:   ${weatherData.current_weather.windspeed} ${weatherData.current_weather_units.windspeed}<br>
            Time:        ${weatherData.current_weather.time} (${weatherData.timezone})<br>
            It is currently: ${weatherData.current_weather.is_day ? 'day' : 'night'}<br>
        `;
    } catch (error) {
        console.error("Weather data fetch error: ", error);
    }
}

// Function to refresh weather data for multiple locations
async function refreshWeather() {
    const weatherLocations = [
        { apiUrl: 'https://api.open-meteo.com/v1/forecast?latitude=59.9111&longitude=10.7584&current_weather=true', elementId: 'data-oslo' },
        { apiUrl: 'https://api.open-meteo.com/v1/forecast?latitude=59.32788333706447&longitude=18.06858400017251&current_weather=true', elementId: 'data-stockholm' },
        { apiUrl: 'https://api.open-meteo.com/v1/forecast?latitude=60.171891686840056&longitude=24.938921542545287&current_weather=true', elementId: 'data-helsinki' },
    ];

    for (const location of weatherLocations) {
        await getWeatherData(location.apiUrl, location.elementId);
    }
}

// Counter to track how many times the data has been refreshed
let updateCounter = 1;

window.onload = function() {
    // Initial fetch and update of weather data
    refreshWeather();

    // Set up an interval to refresh data every 10 seconds
    setInterval(() => {
        refreshWeather();

        document.getElementById("counter").innerText = `Updated ${updateCounter} time(s)`;
        console.log(`Weather updated! Total updates: ${updateCounter++}`);
    }, 10000);
};
