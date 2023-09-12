export interface HourlyData {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    cloudcover: number[];
    windspeed_10m: number[];
}

interface DailyData {
    time: string[];
    sunrise: string[];
    sunset: string[];
}

export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        temperature_2m: string;
        apparent_temperature: string;
        precipitation_probability: string;
        precipitation: string;
        cloudcover: string;
        windspeed_10m: string;
    };
    hourly: HourlyData;
    daily_units: {
        time: string;
        sunrise: string;
        sunset: string;
    };
    daily: DailyData;
}
