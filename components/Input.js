import React from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";

export default function Input(props) {
  return (
    <View style={styled.wrapper}>
      <TextInput
        {...props}
        style={[
          styled.input,
          props.error && { color: "red", borderColor: "red" },
          props.style,
        ]}
      />
      {props.errorText && (
        <Text style={styled.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
}

const styled = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: "#0984e3",
    borderRadius: 10,
    marginLeft: "3%",
    marginRight: "3%",
    padding: "3%",
  },
  wrapper: {},
  errorText: {
    marginTop: "1%",
    marginLeft: "2%",
    color: "red",
  },
});
