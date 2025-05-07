
import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
  hourly: {
    time: Date;
    temperature2m: number;
    relative_humidity_2m: number;
  }[];
}

export async function fetchWeatherHourly({
  location,
  variables,
}: {
  location: { latitude: number; longitude: number };
  variables: string[];
}) {
  /**
   * Work in progress!
   */
  const params = {
    ...location,
    hourly: variables,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const tmp = {
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
    //   ...Object.fromEntries(
    //     variables.map((variable, i) => [
    //       variable,
    //       hourly.variables(i)!.valuesArray()!,
    //     ])
    //   ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relative_humidity_2m: hourly.variables(1)!.valuesArray()!,
    },
  };

  const weatherData: WeatherData = { hourly: [] };

  // `tmp` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < tmp.hourly.time.length; i++) {
    weatherData.hourly.push({
      time: tmp.hourly.time[i],
    //   ...Object.fromEntries(
    //     variables.map((variable, i) => [variable, tmp.hourly[variable][i]])
    //   ),
      temperature2m: tmp.hourly.temperature2m[i],
      relative_humidity_2m: tmp.hourly.relative_humidity_2m[i],
    });
  }

  return weatherData;
}