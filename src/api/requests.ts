import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {UserLocationData} from "../types/userInfoTypes";
import {WeatherData} from "../types/WeatherTypes";


const axiosConfig: AxiosRequestConfig = {
    baseURL: 'https://api.open-meteo.com/v1/forecast',
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },

};

const reqInstance = axios.create(axiosConfig);

export const getGeolocationData = async (long: number, lat: number) =>
    axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
        .then((resp: AxiosResponse<UserLocationData>) => resp.data)

export const getTodayWeather = async (long: number, lat: number ) =>
    reqInstance.get(`?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,windspeed_10m&daily=sunrise,sunset&timezone=auto&forecast_days=1`)
    .then((resp: AxiosResponse<WeatherData>) => resp.data)
