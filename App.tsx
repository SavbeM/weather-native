import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CurrentWeather from "./src/components/CurrentWeather";
import {useEffect} from "react";
import {getGeolocationAccessThunk, getUserLocationThunk} from "./src/store/userInfoReducer";
import errorImage from "./assets/cancel.png"
import {ErrorAnimation} from "./src/animations/ErrorAnimation";
import React from 'react';
import {useAppSelector, useThunkDispatch} from "./src/hooks/hooks";




export const App = () => {

    const {
        lat,
        long,
        isPending,
        geolocationData,
        error,
        geolocationAccessStatus
    } = useAppSelector((state) => state.userInfo);

    const dispatch = useThunkDispatch

    useEffect(() => {
         dispatch(getGeolocationAccessThunk());
    }, []);

    useEffect(() => {
        lat && long &&
        dispatch(getUserLocationThunk(lat, long));
    }, [lat, long])

    if (geolocationAccessStatus === "undetermined" || isPending) {

        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </SafeAreaView>
        )
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
        console.log(geolocationData)
        return (
            <SafeAreaView style={styles.container}>
                <CurrentWeather/>
                <Text>Current weather</Text>
            </SafeAreaView>
        );
    }
    return
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
