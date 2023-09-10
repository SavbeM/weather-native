import {CurrentWeatherActions,  SET_CURRENT_WEATHER} from "../store/currentWeatherReducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store/store";


export interface HourlyUnits  {
    time: string,
    temperature_2m: "°C",
    apparent_temperature: "°C",
    precipitation_probability: "%",
    precipitation: "mm",
    cloudcover: "%",
    visibility: "m",
}

export interface HourlyVar {
    time: Array<Date>,
    temperature_2m: Array<number>,
    apparent_temperature: Array<number>,
    precipitation_probability: Array<number>,
    visibility: Array<number>,
    precipitation: Array<number>,
    cloudcover: Array<number>

}

export interface CurrentWeather {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: string,
    hourly_units: HourlyUnits,
    hourly: HourlyVar
}

export interface CurrentWeatherState{
    currentWeather: CurrentWeather | undefined,
    isPending: boolean,
    error: Error | null
}


export type GetCurrentWeatherThunkType = ThunkAction<void, RootState, unknown,  CurrentWeatherActions>

export type SetCurrentWeatherActionCreatorType = {type: typeof SET_CURRENT_WEATHER, currentWeather: CurrentWeather}
