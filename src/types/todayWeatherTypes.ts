import {WeatherData} from "./WeatherTypes";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store/store";
import {IS_PENDING_TODAY_WEATHER, SET_ERROR_TODAY_WEATHER, SET_TODAY_WEATHER} from "../store/todayWeatherReducer";


export interface TodayWeatherState {
    isPending: boolean,
    error: Error | null,
    todayWeather: WeatherData | null
}



export type TodayWeatherActions =
    SetTodayWeatherActionCreatorType
    | SetErrorActionCreatorType
    | IsPendingActionCreatorType


export type GetTodayWeatherThunkType = ThunkAction<void, RootState, unknown,  TodayWeatherActions>

export type SetTodayWeatherActionCreatorType = {type: typeof SET_TODAY_WEATHER, todayWeather: WeatherData}

export type IsPendingActionCreatorType = {type: typeof IS_PENDING_TODAY_WEATHER, pendingStatus: boolean}
export type SetErrorActionCreatorType = {type: typeof SET_ERROR_TODAY_WEATHER, error: Error}
