import React from 'react';
import {View, Text, StyleSheet, Pressable, GestureResponderEvent} from 'react-native';

// Prop types
interface CustomButtonType {
    onPress: any;
    text: string;
    bgColor?: string;
    fgColor?: string;
    disable: boolean;
}

const CustomButton = ({onPress, text, bgColor, fgColor, disable}: CustomButtonType) => {
  
  return (
    <Pressable
      onPress={(e) => onPress(e)}
      disabled={disable}
      style={[
        styles.container,
        bgColor ? {backgroundColor: bgColor} : {},
        disable ? {backgroundColor: "#f073ee"} : styles[`container_PRIMARY`]
      ]}>
      <Text
        style={[
          styles.text,
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#f705f3",
  },

  text: {
    fontWeight: 'bold',
    color: "#fff"
  },

});

export default CustomButton;