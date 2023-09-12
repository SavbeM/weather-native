import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userInfoReducer} from "./userInfoReducer";
import {currentWeatherReducer} from "./currentWeatherReducer";
import thunk from "redux-thunk";
import {todayWeatherReducer} from "./todayWeatherReducer";


export const store = configureStore({
        reducer: combineReducers({
            userInfo: userInfoReducer,
            todayWeather: todayWeatherReducer,
            currentWeather: currentWeatherReducer
        }),
        middleware: [thunk],
    }
)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
