// Simple Weather App using Open-Meteo (no API key)
// Uses geocoding: https://geocoding-api.open-meteo.com/v1/search
// and forecast: https://api.open-meteo.com/v1/forecast

// first target input field, button and result div
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

// when click on search get the city name
searchButton.addEventListener('click', () => handleSearch());

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showMessage('Please enter a city name.', 'error');
    return;
  }

  showMessage('Loading...');

  try {
    const place = await getCoordinates(city);
    if (!place) {
      showMessage('City not found. Try another name.', 'error');
      return;
    }

    const { latitude, longitude, name, country } = place;
    const weather = await getForecast(latitude, longitude);
    if (!weather) {
      showMessage('Could not fetch weather. Try again later.', 'error');
      return;
    }

    renderWeather(name, country, weather);
  } catch (err) {
    console.error(err);
    showMessage('Something went wrong. Check console for details.', 'error');
  }
}

function showMessage(text, kind = '') {
  weatherResult.innerHTML = `<p class="${kind}">${text}</p>`;
}

// getCoordinates uses Open-Meteo geocoding. returns first match or null
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

// getForecast uses Open-Meteo forecast API and returns a small object
async function getForecast(lat, lon) {
  // daily fields: max/min temps and weathercode
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto&windspeed_unit=kmh&temperature_unit=celsius`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();

  // destructure the important parts
  const current = data.current_weather || null;
  const daily = data.daily || null;

  if (!current || !daily) return null;

  // Build small structured object
  return {
    current: {
      temp: current.temperature,
      wind: current.windspeed,
      code: current.weathercode
    },
    daily: {
      dates: daily.time,
      max: daily.temperature_2m_max,
      min: daily.temperature_2m_min,
      code: daily.weathercode
    }
  };
}

// map Open-Meteo weathercode to emoji + text (simple)
function decodeWeather(code) {
  if (code === 0) return { emoji: '☀️', text: 'Clear' };
  if (code === 1 || code === 2) return { emoji: '🌤️', text: 'Partly cloudy' };
  if (code === 3) return { emoji: '☁️', text: 'Overcast' };
  if (code === 45 || code === 48) return { emoji: '🌫️', text: 'Fog' };
  if ([51,53,55,80,81,82].includes(code)) return { emoji: '🌧️', text: 'Rain' };
  if ([56,57,66,67].includes(code)) return { emoji: '🌧️', text: 'Freezing rain / sleet' };
  if ([61,63,65].includes(code)) return { emoji: '🌧️', text: 'Rain' };
  if ([71,73,75,85,86].includes(code)) return { emoji: '❄️', text: 'Snow' };
  if (code === 77) return { emoji: '❄️', text: 'Snow grains' };
  if (code === 95) return { emoji: '⛈️', text: 'Thunderstorm' };
  if (code === 96 || code === 99) return { emoji: '⛈️', text: 'Thunderstorm with hail' };
  return { emoji: '🌈', text: 'Unknown' };
}

function renderWeather(cityName, country, weather) {
  const { current, daily } = weather;
  const currentDesc = decodeWeather(current.code);

  // show current
  let html = `
    <div class="current">
      <div>
        <div class="temp">${Math.round(current.temp)}°C</div>
        <div class="small">Wind: ${current.wind} km/h</div>
      </div>
      <div>
        <div class="location">${cityName}, ${country}</div>
        <div class="small">${currentDesc.emoji} ${currentDesc.text}</div>
      </div>
    </div>
  `;

  // build 3-day forecast (use first 3 days from daily arrays)
  const days = [];
  for (let i = 0; i < Math.min(3, daily.dates.length); i++) {
    const date = daily.dates[i];
    const max = Math.round(daily.max[i]);
    const min = Math.round(daily.min[i]);
    const wc = decodeWeather(daily.code[i]);
    days.push(`
      <div class="forecast-item">
        <div><strong>${date}</strong></div>
        <div class="small">${wc.emoji} ${wc.text}</div>
        <div class="small">High: ${max}°C</div>
        <div class="small">Low: ${min}°C</div>
      </div>
    `);
  }

  html += `<div class="forecast">${days.join('')}</div>`;

  weatherResult.innerHTML = html;
}
