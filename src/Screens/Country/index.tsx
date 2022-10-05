import React, { useState, useCallback } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

// components
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SearchList from "./SearchList";

// Api
import { apiConfig } from "../../config";
import axios from "axios";

// Helper
import { debounce } from "../../helper";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface propType {
  navigation: {
    navigate: Function;
  };
  route: {};
}

const Country = (props: propType) => {
  const { navigation } = props;

  const [inputText, setInputText] = useState<string>("");
  const [searchData, setSearchData] = useState<[] | null>(null);
  const [countryDetail, setCountryDetail] = useState<{} | unknown>(null);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  // handle text chagne
  const handleChange = async (e: string) => {
    try {
      setInputText(typeof e === "string" ? e : "");
      if (e.length === 0) {
        setSearchData(null);
        setIsDisable(true);
        return;
      }
      if (typeof e === "string" && e !== "") {
        debounceFn(e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle button click
  const handleSubmit = (event: any) => {
    navigation.navigate("CountryDetail", { countryDetail });
  };

  // Get country list based on entered text
  const handleSearch = async (e: { e: string }) => {
    try {
      const response = await axios.get(`${apiConfig.countryApi}/${e}`);

      setSearchData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce function
  const debounceFn = useCallback(debounce(handleSearch, 500), []);

  return (
    <ImageBackground
      source={require("../../assets/country.png")}
      resizeMethod="auto"
      resizeMode="stretch"
      style={styles.img}
      blurRadius={2}
    >
      <View style={styles.container}>
        <CustomInput
          placeholder={"Select Country"}
          onChange={handleChange}
          value={inputText}
          placeholderTextColor="#f5f5fa"
          textColor="#fff"
        />
        {inputText.length > 0 && Array.isArray(searchData) && (
          <View>
            <View style={{ position: "relative", margin: 10, height: 250 }}>
              <SearchList
                data={searchData}
                setCountryDetail={setCountryDetail}
                setIsDisable={setIsDisable}
              />
            </View>
          </View>
        )}
        <CustomButton
          onPress={handleSubmit}
          text="Submit"
          disable={isDisable}
        />
      </View>
    </ImageBackground>
  );
};

export default Country;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  img: {
    height: screenHeight,
    width: screenWidth
  }
});
