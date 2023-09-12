import {
    GetTodayWeatherThunkType,
    IsPendingActionCreatorType,
    SetErrorActionCreatorType, SetTodayWeatherActionCreatorType,
    TodayWeatherActions,
    TodayWeatherState
} from "../types/todayWeatherTypes";
import {WeatherData} from "../types/WeatherTypes";
import {Dispatch} from "redux";
import {getTodayWeather} from "../api/requests";

const initialState: TodayWeatherState = {
    isPending: false,
    error: null,
    todayWeather: null
}

export const IS_PENDING_TODAY_WEATHER = "IS_PENDING_TODAY_WEATHER"
export const SET_ERROR_TODAY_WEATHER = "SET_ERROR_TODAY_WEATHER"
export const SET_TODAY_WEATHER = "SET_TODAY_WEATHER"

const isPendingActionCreator = (pendingStatus: boolean): IsPendingActionCreatorType => {
    return {type: IS_PENDING_TODAY_WEATHER, pendingStatus}
}

const setErrorActionCreator = (error: Error): SetErrorActionCreatorType => {
    return {type: SET_ERROR_TODAY_WEATHER, error}
}


const setTodayWeatherActionCreator = (todayWeather: WeatherData): SetTodayWeatherActionCreatorType => {
    return {type: SET_TODAY_WEATHER, todayWeather}
}


export const getTodayWeatherThunk = (long: number, lat: number): GetTodayWeatherThunkType => {
    return async (dispatch: Dispatch<TodayWeatherActions>) => {
        dispatch(isPendingActionCreator(true))
        try {
            const currentWeather = await getTodayWeather(long, lat)
            dispatch(setTodayWeatherActionCreator(currentWeather))
        } catch (error: any) {
            dispatch(setErrorActionCreator(new Error(error)))
        } finally {
            dispatch(isPendingActionCreator(false))
        }
    }
}

export const todayWeatherReducer = (state = initialState, action: TodayWeatherActions): TodayWeatherState => {
    switch (action.type) {
        case "SET_TODAY_WEATHER":
            return {...state, todayWeather: {...action.todayWeather}}
        case "IS_PENDING_TODAY_WEATHER":
            return {...state, isPending: action.pendingStatus}
        case "SET_ERROR_TODAY_WEATHER":
            return {...state, error: action.error}
        default:
            return state
    }
}
