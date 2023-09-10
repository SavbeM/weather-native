import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {CurrentWeather} from "../types/currentWeatherTypes";
import {UserLocationData} from "../types/userInfoTypes";


const axiosConfig: AxiosRequestConfig = {
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.open-meteo.com/v1/forecast',
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },

};

const reqInstance = axios.create(axiosConfig);

export const getCurrentWeather = async (long: number, lat: number) =>
    reqInstance.get(`?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,cloudcover,visibility&forecast_days=1`)
        .then((res: AxiosResponse<CurrentWeather>) => res.data)

export const getGeolocationData = async (long: number, lat: number) =>
    axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
        .then((resp: AxiosResponse<UserLocationData>) => resp.data)


