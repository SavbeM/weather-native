import {IS_PENDING, SET_ERROR} from "../store/currentWeatherReducer";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";


export type IsPendingActionCreatorType = {type: typeof IS_PENDING, pendingStatus: boolean}
export type SetErrorActionCreatorType = {type: typeof SET_ERROR, error: Error}
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, any>
