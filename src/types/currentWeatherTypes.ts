import {SET_CURRENT_WEATHER} from "../store/currentWeatherReducer";
import {HourlyData} from "./WeatherTypes";






export interface CurrentWeatherState{
    currentWeather: CurrentWeather | undefined,
}

interface CurrentWeather {
    temperature_2m: number;
    apparent_temperature: number;
    precipitation_probability: number;
    precipitation: number;
    cloudcover: number;
    windspeed_10m: number;
}

export type SetCurrentWeatherActionCreatorType = {type: typeof SET_CURRENT_WEATHER, hourlyData: HourlyData}

