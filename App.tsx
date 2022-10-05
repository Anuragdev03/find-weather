import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ImageBackground } from "react-native";

// React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Country from "./src/Screens/Country";
import CountryDetail from "./src/Screens/Country/CountryDetail";
import WeatherDetail from "./src/Screens/Weather";

type RootStackParamList = {
  Main: undefined;
  CountryDetail: undefined;
  WeatherDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const reactQueryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          {/* Select Country Screen */}
          <Stack.Screen
            name="Main"
            component={Country}
            options={{ title: "Find Weather" }}
          />

          {/* Country Detail Screen */}
          <Stack.Screen
            name="CountryDetail"
            component={CountryDetail}
            options={{ title: "Country" }}
          />

          {/* Weather Detail Screen */}
          <Stack.Screen
            name="WeatherDetail"
            component={WeatherDetail}
            options={{ title: "Weather" }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
