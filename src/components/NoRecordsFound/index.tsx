import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function NoRecordsFound() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "column"}}>
        <Image
          source={require("../../assets/np_records.png")}
          style={styles.image}
        />
        <Text style={styles.text}>No Records Found</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 5,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  }
});
