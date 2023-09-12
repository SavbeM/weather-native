import {
    IS_PENDING_USER_INFO,
    SET_CORDS, SET_ERROR_USER_INFO,
    SET_GEOLOCATION_ACCESS_STATUS,
    SET_GEOLOCATION_DATA,
} from "../store/userInfoReducer";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {IS_PENDING_TODAY_WEATHER, SET_ERROR_TODAY_WEATHER} from "../store/todayWeatherReducer";

export type GeolocationAccessStatus = "granted" | "denied" | "undetermined"

export interface UserInfo {
    long: number | undefined,
    lat: number | undefined,
    geolocationData: UserLocationData | undefined,
    isPending: boolean,
    error: Error | null,
    geolocationAccessStatus: GeolocationAccessStatus
}

export interface UserLocationData {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        amenity: string;
        road: string;
        neighbourhood: string;
        suburb: string;
        borough: string;
        city: string;
        "ISO3166-2-lvl4": string;
        postcode: string;
        country: string;
        country_code: string;
    };
    boundingbox: Array<string>;
}

export type SetGeolocationAccessStatusActionCreatorType = {
    type: typeof SET_GEOLOCATION_ACCESS_STATUS, status: GeolocationAccessStatus
}

export type SetGeolocationDataActionCreatorType = {
    type: typeof SET_GEOLOCATION_DATA, geolocationData: UserLocationData
}

export type GetGeolocationAccessThunkType = ThunkAction<void, UserInfo, undefined, AnyAction>
export type GetUserLocationThunkType = ThunkAction<void, UserInfo, undefined, AnyAction>
export type SetCordsActionCreatorType = {
    type: typeof SET_CORDS, coords: {long: number, lat: number}
}

export type IsPendingActionCreatorType = {type: typeof IS_PENDING_USER_INFO, pendingStatus: boolean}
export type SetErrorActionCreatorType = {type: typeof SET_ERROR_USER_INFO, error: Error}
