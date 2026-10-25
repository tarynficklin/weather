// Current weather from Open-Meteo (free, no API key), replacing Yahoo's YQL weather API,
// which shut down in 2019. https://open-meteo.com/en/docs
import states from './components/inputs/states';

//"ut" or "Utah" -> "utah"
const stateName = (state = '') => {
  const value = state.trim().toLowerCase();
  const match = states.find(([code, name]) => code.toLowerCase() === value || name.toLowerCase() === value);
  return match ? match[1].toLowerCase() : value;
};

//finds the US city, preferring one in the given state
const findPlace = async (city, state) => {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: city.trim(), count: 10, language: 'en', format: 'json', countryCode: 'US' });
  const { results = [] } = await (await fetch(url)).json();
  const wanted = stateName(state);
  return results.find((place) => place.admin1?.toLowerCase() === wanted) || results[0];
};

//returns { temp, code, isDay, wind } for "city, state", or null if the city isn't found
export default async function currentWeather(city, state) {
  if (!city?.trim()) return null;
  const place = await findPlace(city, state);
  if (!place) return null;

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: 'temperature_2m,weather_code,wind_speed_10m,is_day',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
  });
  const { current } = await (await fetch(url)).json();
  return {
    temp: Math.round(current.temperature_2m),
    code: current.weather_code,
    isDay: current.is_day === 1,
    wind: current.wind_speed_10m,
  };
}
