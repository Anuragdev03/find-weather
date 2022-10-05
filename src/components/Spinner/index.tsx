import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Spinner() {
    return (
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1}}>
            <ActivityIndicator size="large" color="#f7bef6" />
        </View>
    )
}