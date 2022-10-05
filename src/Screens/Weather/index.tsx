import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import axios from "axios";

// Api
import { apiConfig } from "../../config";

//Components
import NoRecordsFound from "../../components/NoRecordsFound";
import Spinner from "../../components/Spinner";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// proptype
interface Proptype {
  route: {
    params: {
      capitalName: string;
    };
  };
}

// Weather detail type
interface WeatherDataType {
  current: {
    precip: number;
    temperature: number;
    wind_speed: number;
    weather_icons: [string];
    humidity: number;
    weather_descriptions: [string];
  };
  location: {
    localtime: string;
    name: string;
  };
  request: {};
}

const WeatherDetail = (props: Proptype) => {
  const [weatherDetail, setWeatherDetail] = useState<WeatherDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let params = props.route.params;

  let { capitalName } = params;

  // Get weather detail
  useEffect(() => {
    if (capitalName) {
      getWeatherDetail();
    }
  }, [capitalName]);

  const getWeatherDetail = async () => {
    const response = await axios.get(
      `${apiConfig.weatherApi}&query=${capitalName}`
    );

    setWeatherDetail(response.data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // TSX
  return (
    <ImageBackground
      source={require("../../assets/weather.png")}
      resizeMethod="auto"
      resizeMode="cover"
      style={styles.img}
      blurRadius={6}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#FFF" }}>
            Weather Details
          </Text>
        </View>
        <View style={styles.divider} />

        {/* Flag Image */}

        {weatherDetail?.current ? (
          // Weather icon
          <View >
            <View style={{ width: screenWidth - 25, flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text
                  style={{ paddingTop: 5, fontSize: 18, fontWeight: "600" }}
                >
                  {weatherDetail?.location?.name}
                </Text>
                <Text style={{ opacity: 0.6, fontSize: 12 }}>
                  {weatherDetail?.location?.localtime}
                </Text>
              </View>
              {weatherDetail?.current?.weather_icons[0] && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ paddingRight: 15 }}>
                    {weatherDetail?.current?.weather_descriptions[0]}
                  </Text>
                  <Image
                    source={{
                      uri: weatherDetail.current?.weather_icons[0],
                    }}
                    style={styles.weatherIcon}
                  />
                </View>
              )}
            </View>

            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 50, color: "#fff", marginTop: "10%" }}>
                {weatherDetail.current.temperature} °C
              </Text>
            </View>

            <View style={styles.flex}>
              <View style={{ paddingRight: "3%" }}>
                <Text style={{ color: "#fff", opacity: 0.6 }}>Temperature</Text>
                <Text style={styles.detailText}>
                  {weatherDetail.current.temperature} °C
                </Text>
              </View>

              <View style={{ paddingRight: "3%" }}>
                <Text style={{ color: "#fff", opacity: 0.6 }}>
                  Precipitation
                </Text>
                <Text style={styles.detailText}>
                  {weatherDetail.current.precip} %
                </Text>
              </View>

              <View style={{ paddingRight: "3%" }}>
                <Text style={{ color: "#fff", opacity: 0.6 }}>Wind Speed</Text>
                <Text style={styles.detailText}>
                  {weatherDetail.current.wind_speed} kmph
                </Text>
              </View>

              <View style={{ paddingRight: "3%" }}>
                <Text style={{ color: "#fff", opacity: 0.6 }}>Humidity</Text>
                <Text style={styles.detailText}>
                  {weatherDetail.current.humidity}
                </Text>
              </View>

            </View>
          </View>
        ) : (
          <NoRecordsFound />
        )}
      </View>
    </ImageBackground>
  );
};

export default WeatherDetail;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: "100%",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    // justifyContent: "center",
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 20,
  },
  weatherIcon: {
    width: 35,
    height: 35,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 15,
    color: "#fff",
    textAlign: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "20%",
    flexWrap: "wrap",
  },
  img: {
    height: screenHeight,
    width: screenWidth,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#c6c6c6",
  },
});
