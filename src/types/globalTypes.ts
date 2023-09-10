import {IS_PENDING, SET_ERROR} from "../store/currentWeatherReducer";


export type IsPendingActionCreatorType = {type: typeof IS_PENDING, pendingStatus: boolean}
export type SetErrorActionCreatorType = {type: typeof SET_ERROR, error: Error}
