//background images
import drizzle from '../resources/drizzle.png';
import foggy from '../resources/foggy.png';
import hot from '../resources/hot.png';
import meteorite from '../resources/meteorite.png';
import mostlyClear from '../resources/mostly-clear.png';
import mostlyCloudy from '../resources/mostly-cloudy.png';
import partlyCloudy from '../resources/partly-cloudy.png';
import raining from '../resources/raining.png';
import sky from '../resources/sky.png';
import snowy from '../resources/snowy.png';
import stormy from '../resources/stormy.png';
import sunny from '../resources/sunny.png';
import windy from '../resources/windy.png';

//what a card shows before its weather loads, or when the city can't be found
//(Yahoo's "not available" code fell through to the meteorite background too)
export const unknown = { condition: 'meteorites', background: meteorite };

//Open-Meteo weather codes (WMO) -> [condition, background]. Day/night pairs keep the
//backgrounds the Yahoo version picked for its matching day and night codes.
const conditions = {
  0: { day: ['Sunny', hot], night: ['Clear', sunny] },
  1: { day: ['Fair', sunny], night: ['Fair', mostlyClear] },
  2: { day: ['Partly Cloudy', sky], night: ['Partly Cloudy', partlyCloudy] },
  3: { day: ['Cloudy', sky], night: ['Cloudy', mostlyCloudy] },
  45: ['Foggy', foggy],
  48: ['Foggy', foggy],
  51: ['Drizzle', drizzle],
  53: ['Drizzle', drizzle],
  55: ['Drizzle', drizzle],
  56: ['Freezing Drizzle', drizzle],
  57: ['Freezing Drizzle', drizzle],
  61: ['Rain', raining],
  63: ['Rain', raining],
  65: ['Heavy Rain', raining],
  66: ['Freezing Rain', raining],
  67: ['Freezing Rain', raining],
  71: ['Light Snow', snowy],
  73: ['Snow', snowy],
  75: ['Heavy Snow', snowy],
  77: ['Snow Grains', snowy],
  80: ['Showers', raining],
  81: ['Showers', raining],
  82: ['Heavy Showers', raining],
  85: ['Snow Showers', snowy],
  86: ['Snow Showers', snowy],
  95: ['Thunderstorms', stormy],
  96: ['Thunderstorms And Hail', stormy],
  99: ['Thunderstorms And Hail', stormy],
};

//finds what weather condition the card has and the background that goes with it
export default function describe({ temp, code, isDay, wind }) {
  const dry = code <= 3;

  //Yahoo had its own "windy" and "hot" codes; Open-Meteo reports wind and temperature instead
  if (dry && wind >= 25) return { condition: 'Windy', background: windy };
  if (code <= 1 && isDay && temp >= 95) return { condition: 'Hot', background: hot };

  const match = conditions[code];
  if (!match) return unknown;
  const [condition, background] = Array.isArray(match) ? match : match[isDay ? 'day' : 'night'];
  return { condition, background };
}
