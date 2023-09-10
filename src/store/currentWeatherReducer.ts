import {
    CurrentWeather,
    CurrentWeatherState, GetCurrentWeatherThunkType, SetCurrentWeatherActionCreatorType,

} from "../types/currentWeatherTypes";
import {Dispatch} from "redux";
import {getCurrentWeather} from "../api/requests";
import {IsPendingActionCreatorType, SetErrorActionCreatorType} from "../types/globalTypes";


export const IS_PENDING = "IS_PENDING"
export const SET_ERROR = "SET_ERROR"
export const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER"

const initialState: CurrentWeatherState = {
    currentWeather: undefined,
    isPending: false,
    error: null
}

const isPendingActionCreator = (pendingStatus: boolean): IsPendingActionCreatorType => {
    return {type: IS_PENDING, pendingStatus}
}

const setErrorActionCreator = (error: Error): SetErrorActionCreatorType => {
    return {type: SET_ERROR, error}
}


const setCurrentWeatherActionCreator = (currentWeather: CurrentWeather): SetCurrentWeatherActionCreatorType => {
    return {type: SET_CURRENT_WEATHER, currentWeather}
}

export const getCurrentWeatherThunk = (long: number, lat: number): GetCurrentWeatherThunkType => {
    return async (dispatch: Dispatch<CurrentWeatherActions>) => {
        dispatch(isPendingActionCreator(true))
        try {
            const currentWeather = await getCurrentWeather(long, lat)
            dispatch(setCurrentWeatherActionCreator(currentWeather))
        } catch (error: any) {
            dispatch(setErrorActionCreator(new Error(error)))
        } finally {
            dispatch(isPendingActionCreator(false))
        }
    }
}

export type CurrentWeatherActions =
    SetCurrentWeatherActionCreatorType
    | SetErrorActionCreatorType
    | IsPendingActionCreatorType


export const currentWeatherReducer = (state = initialState, action: CurrentWeatherActions): CurrentWeatherState => {
    switch (action.type) {
        case "SET_CURRENT_WEATHER":
            return {...state, currentWeather: {...action.currentWeather}}
        case "IS_PENDING":
            return {...state, isPending: action.pendingStatus}
        case "SET_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
