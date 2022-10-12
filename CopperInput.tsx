import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ArrowButtonLeft from "./ArrowButtonLeft";
import ArrowButtonRight from "./ArrowButtonRight";

type Props = {};
const CopperInput = () => {
  const [pair, setPair] = useState(0);
  const addPair = () => {setPair(oldPair => {
    return oldPair+1
  })}
  const subtractPair = () => {setPair(oldPair => {
    return oldPair-1
  })}

  return (
    <View style={styles.container}>
      <ArrowButtonLeft onPress={subtractPair} />
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        value={pair + ""}
        onChangeText={(newVal) => setPair(() => Number(newVal))}
        placeholder="pair"
      />
      <ArrowButtonRight onPress={addPair} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    height: 30,
    width: "20%",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 18,
  },
});

export default CopperInput;
