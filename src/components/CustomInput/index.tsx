import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface CustomInputProps {
  onChange?: Function;
  placeholder?: string;
  key?: string | number;
  value?: string | number;
  onBlur?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  placeholderTextColor: string;
  textColor: string;
}
export default function CustomInput({
  onChange,
  onBlur,
  key,
  value,
  placeholder,
  placeholderTextColor,
  textColor,
}: CustomInputProps) {
  return (
    <View>
      <TextInput
        key={key}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange && onChange(text)}
        onBlur={onBlur}
        style={[styles.input, textColor ? { color: textColor } : {}]}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#bfc2db",
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
