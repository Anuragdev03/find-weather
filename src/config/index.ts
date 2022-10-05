import { WEATHER_ACCESS_KEY } from "@env";

interface ApiConstant {
    countryApi: string;
    weatherApi: string;
}

export const apiConfig: ApiConstant = {
    countryApi: "https://restcountries.com/v3.1/name",
    weatherApi: `http://api.weatherstack.com/current?access_key=${WEATHER_ACCESS_KEY}`
}
