import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

// Icon
import { AntDesign } from "@expo/vector-icons";

export default function SearchList({ data, setCountryDetail, setIsDisable }: any) {

  interface RenderListPropType {
    item: {
      flag: string;
      capital: string;
    };
    index?: number;
  }
  // Render list
  const renderList = ({ item, index }: any) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            setCountryDetail(item);
            setIsDisable(false);
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
            <View style={{flexDirection: "row"}}>
              <Image
                source={{ uri: item?.flags?.png }}
                style={styles.countryImage}
              />
              <Text style={styles.countryName}>{item?.name.common}</Text>
            </View>

            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={{ paddingRight: 5 }}
            />
        </Pressable>
      </View>
    );
  };

  // Item separator
  const itemSeparator = () => (
    <View style={{ width: "100%", height: 0.5, backgroundColor: "#c8c8c8" }} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderList}
      style={{}}
      ItemSeparatorComponent={itemSeparator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    width: "100%",
  },
  countryImage: {
    width: 25,
    height: 25,
  },
  countryName: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 10,
    color: "#fff",
  },
});
