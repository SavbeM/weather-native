import {

    CurrentWeatherState, SetCurrentWeatherActionCreatorType,

} from "../types/currentWeatherTypes";

import {HourlyData} from "../types/WeatherTypes";

export const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER"

const initialState: CurrentWeatherState = {
    currentWeather: undefined,
}


export const setCurrentWeatherActionCreator = (hourlyData: HourlyData): SetCurrentWeatherActionCreatorType => {
    return {type: SET_CURRENT_WEATHER, hourlyData}
}



export type CurrentWeatherActions =
    SetCurrentWeatherActionCreatorType

export const currentWeatherReducer = (state = initialState, action: CurrentWeatherActions): CurrentWeatherState => {
    switch (action.type) {
        case "SET_CURRENT_WEATHER":
            const currentTime =  new Date().getHours()
            return {...state, currentWeather: {
                temperature_2m: action.hourlyData.temperature_2m[currentTime],
                    apparent_temperature: action.hourlyData.apparent_temperature[currentTime],
                    precipitation_probability: action.hourlyData.precipitation_probability[currentTime],
                    precipitation: action.hourlyData.precipitation[currentTime],
                    cloudcover: action.hourlyData.cloudcover[currentTime],
                    windspeed_10m: action.hourlyData.windspeed_10m[currentTime],
                }}
        default:
            return state
    }
}
