import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ArrowButtonLeft from "./ArrowButtonLeft";
import ArrowButtonRight from "./ArrowButtonRight";

type Props = {};
const CopperInput = (props: Props) => {
  return (
    <View>
      <ArrowButtonLeft />
      <TextInput style={styles.textInput} />
      <ArrowButtonRight />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    height: 30,
    width: "50%",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default CopperInput;
