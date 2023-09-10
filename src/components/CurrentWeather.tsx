import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {getCurrentWeatherThunk} from "../store/currentWeatherReducer";

import {useThunkDispatch} from "../hooks/hooks";


const CurrentWeather: React.FC = () => {
    const {lat, long} = useSelector((state: RootState) => state.userInfo)
    const weather = useSelector((state: RootState) => state.currentWeather)
    const dispatch = useThunkDispatch;

    useEffect(() => {
        lat && long &&
        dispatch(getCurrentWeatherThunk(lat, long))
    }, [])

    useEffect(() => {
        console.log(weather)
    }, [weather])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>NA</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CurrentWeather
