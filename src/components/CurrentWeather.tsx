import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWeatherActionCreator} from "../store/currentWeatherReducer";
import {RootState} from "../store/store";



const CurrentWeather: React.FC = () => {
    const dispatch = useDispatch()
    const hourlyWeather = useSelector((state:RootState) => state.todayWeather.todayWeather?.hourly)
    useEffect(() => {
        hourlyWeather &&
        dispatch(setCurrentWeatherActionCreator(hourlyWeather))
    }, [hourlyWeather]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>123</Text>
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
