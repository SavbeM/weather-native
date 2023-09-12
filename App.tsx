import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CurrentWeather from "./src/components/CurrentWeather";
import {FC, useEffect} from "react";
import {getGeolocationAccessThunk, getUserLocationThunk} from "./src/store/userInfoReducer";
import errorImage from "./assets/cancel.png"
import {ErrorAnimation} from "./src/animations/ErrorAnimation";
import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import {RootState} from "./src/store/store";
import {AppThunkDispatch} from "./src/types/globalTypes";
import {getTodayWeatherThunk} from "./src/store/todayWeatherReducer";




export const App: FC = () => {

    const {
        lat,
        long,
        isPending,
        geolocationData,
        error,
        geolocationAccessStatus
    } = useSelector((state: RootState) => state.userInfo);

    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        lat && long &&
            dispatch(getTodayWeatherThunk(lat, long))
    }, [lat, long]);
    useEffect(() => {
        geolocationAccessStatus !== "granted" &&
         dispatch(getGeolocationAccessThunk());
    }, []);

    useEffect(() => {
        lat && long && !geolocationData &&
        dispatch(getUserLocationThunk(lat, long));
    }, [lat, long])

    if (isPending) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </SafeAreaView>
        )
    }

    if(geolocationAccessStatus === "denied"){
       return <SafeAreaView style={styles.container}>
            <Text>
                Please allow the application to use your geolocation data
            </Text>
        </SafeAreaView>
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorAnimation>
                    <View style={styles.errorImageWrapper}>
                        <Image style={styles.errorImage} source={errorImage}></Image>
                    </View>
                </ErrorAnimation>
                <Text>{error.message}</Text>
            </SafeAreaView>
        )
    }
    if (geolocationData) {
         return (
             <SafeAreaView style={styles.container}>
                 <CurrentWeather/>
             </SafeAreaView>
         );
     }
   else {
       return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    errorImageWrapper: {
        padding: 10,
        margin: 50,
        borderWidth: 2,
        borderColor: "#FF0000",
        borderRadius: 100,
    },

    errorImage: {
        height: 50,
        width: 50,
        alignSelf: 'center',
    },
});
