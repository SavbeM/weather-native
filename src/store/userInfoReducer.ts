import {AnyAction, Dispatch} from "redux";
import {
    GeolocationAccessStatus, GetGeolocationAccessThunkType, GetUserLocationThunkType, SetCordsActionCreatorType,
    SetGeolocationAccessStatusActionCreatorType, SetGeolocationDataActionCreatorType,
    UserInfo,
    UserLocationData
} from "../types/userInfoTypes";

import {IS_PENDING, SET_ERROR} from "./currentWeatherReducer";
import {IsPendingActionCreatorType, SetErrorActionCreatorType} from "../types/globalTypes";
import * as Location from "expo-location";
import {getGeolocationData} from "../api/requests";

export const SET_GEOLOCATION_ACCESS_STATUS = "SET-GEOLOCATION-ACCESS-STATUS"
export  const SET_GEOLOCATION_DATA = "SET-GEOLOCATION-DATA"
export const SET_CORDS = "SET-CORDS"


const initialState: UserInfo = {
    long:  undefined,
    lat:  undefined,
    geolocationData: undefined,
    isPending: false,
    error: null,
    geolocationAccessStatus: "undetermined"
}

const isPendingActionCreator = (pendingStatus: boolean): IsPendingActionCreatorType => {
    return {type: IS_PENDING, pendingStatus}
}

const setErrorActionCreator = (error:  Error): SetErrorActionCreatorType => {
    return{type: SET_ERROR, error}
}

export const setGeolocationDataActionCreator = (geolocationData:  UserLocationData): SetGeolocationDataActionCreatorType => {
    return {type: SET_GEOLOCATION_DATA, geolocationData}
}

export const setCordsActionCreator = (coords :{long: number, lat: number}): SetCordsActionCreatorType  => {
    return{type: SET_CORDS, coords}
}

const setGeolocationAccessStatusActionCreator = (status: GeolocationAccessStatus): SetGeolocationAccessStatusActionCreatorType => {
    return{type: SET_GEOLOCATION_ACCESS_STATUS, status}
}

export const getGeolocationAccessThunk = (): GetGeolocationAccessThunkType => {
    return async (dispatch: Dispatch<AnyAction>) => {
            Location.requestForegroundPermissionsAsync().then(async ({status}) => {
                if(status === "granted"){

                    dispatch(setGeolocationAccessStatusActionCreator("granted"))
                    let location = await Location.getCurrentPositionAsync({})

                    dispatch(setCordsActionCreator({long: location.coords.longitude, lat:location.coords.latitude}))
                }
                else if( status === "denied"){
                    dispatch(setGeolocationAccessStatusActionCreator("denied"))
                }
            })

    }
}

export const getUserLocationThunk = (lat: number, long: number): GetUserLocationThunkType   => {
    return  async (dispatch: Dispatch<UserInfoActions>) => {
            dispatch(isPendingActionCreator(true))
            try{
            const response:  UserLocationData = await getGeolocationData(long, lat)
                dispatch(setGeolocationDataActionCreator(response))}
            catch(error: any) {
                dispatch(setErrorActionCreator(new Error(error)))
            }
            finally {
                dispatch(isPendingActionCreator(false))
            }
    }
}

export type UserInfoActions = IsPendingActionCreatorType | SetGeolocationAccessStatusActionCreatorType | SetErrorActionCreatorType | SetGeolocationDataActionCreatorType | SetCordsActionCreatorType

export const userInfoReducer = (state = initialState, action: UserInfoActions) => {
  switch (action.type){
      case SET_GEOLOCATION_DATA:
          return {...state, geolocationData: action.geolocationData}
      case SET_GEOLOCATION_ACCESS_STATUS:
          return {...state, geolocationAccessStatus: action.status}
      case SET_ERROR:
      return  {...state, error: action.error}
      case SET_CORDS:
          return {...state, long: action.coords.long, lat: action.coords.lat}
      case IS_PENDING:
          return {...state, isPending: action.pendingStatus}
      default:
          return state
  }
}
