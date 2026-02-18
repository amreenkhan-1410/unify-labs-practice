const button = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");

const API_KEY = "YOUR_API_KEY_HERE";

button.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  loading.classList.remove("hidden");
  weatherResult.textContent = "";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    weatherResult.innerHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
  } catch (error) {
    weatherResult.textContent = error.message;
  } finally {
    loading.classList.add("hidden");
  }
});
