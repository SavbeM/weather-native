import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


const CurrentWeather: React.FC = () => {

    const weather = useSelector((state: RootState) => state.currentWeather)

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
