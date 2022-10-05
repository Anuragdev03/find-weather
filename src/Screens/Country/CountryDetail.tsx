import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import NoRecordsFound from "../../components/NoRecordsFound";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// Prop type
interface PropType {
  route: {
    params: {
      countryDetail: {
        flags?: {
          png: string;
          svg: string;
        };
        capital: string[];
        population: number;
        latlng: string[];
      };
    };
  };
  navigation: {
    navigate: Function;
  };
}

const CountryDetail = (props: PropType): JSX.Element => {
  let params = props.route.params;

  const { navigation } = props;

  // Country Detail
  let countryDetail = params?.countryDetail;

  return (
    <>
      <ImageBackground
        source={require("../../assets/country_detail.png")}
        resizeMethod="auto"
        resizeMode="stretch"
        style={styles.img}
        blurRadius={1}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
              Country Details
            </Text>
          </View>

          {/* Flag Image */}
          {countryDetail ? (
            <>
              <Image
                source={{ uri: countryDetail?.flags?.png }}
                style={styles.flagImage}
              />

              {/* Country Detail */}
              <View style={{ alignItems: "flex-start", width: "80%" }}>
                <View style={styles.flex}>
                  <Text style={{ color: "#FFF", opacity: 0.6 }}>Capital:</Text>
                  <Text style={styles.detailText}>
                    {countryDetail.capital[0]}
                  </Text>
                </View>

                <View style={styles.flex}>
                  <Text style={{ color: "#FFF", opacity: 0.6 }}>
                    Country Population:
                  </Text>
                  <Text style={styles.detailText}>
                    {countryDetail.population}
                  </Text>
                </View>

                <View style={styles.flex}>
                  <Text style={{ color: "#FFF", opacity: 0.6 }}>Latitude:</Text>
                  <Text style={styles.detailText}>
                    {countryDetail.latlng[0]}°
                  </Text>
                </View>

                <View style={styles.flex}>
                  <Text style={{ color: "#FFF", opacity: 0.6 }}>
                    Longitude:
                  </Text>
                  <Text style={styles.detailText}>
                    {countryDetail.latlng[1]}°
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <CustomButton
                    text="Capital Weather"
                    onPress={() =>
                      navigation.navigate("WeatherDetail", {
                        capitalName: countryDetail.capital[0],
                      })
                    }
                    disable={false}
                  />
                </View>
              </View>
            </>
          ) : (
            <NoRecordsFound />
          )}
        </View>
      </ImageBackground>
    </>
  );
};

export default CountryDetail;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 20,
  },
  flagImage: {
    width: "80%",
    height: 250,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 15,
    color: "#FFF",
  },
  flex: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
  },
});
