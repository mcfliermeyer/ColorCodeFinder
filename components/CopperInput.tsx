import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ArrowButtonLeft from "./ArrowButtonLeft";
import ArrowButtonRight from "./ArrowButtonRight";

interface Props {
  pair: number;
  setPair: (newPair: number) => void;
  addPair: () => void;
  subtractPair: () => void;
}
const CopperInput = ({ pair, setPair, addPair, subtractPair }: Props) => {
  return (
    <View style={styles.container}>
      <ArrowButtonLeft style={styles.arrowButton} onPress={subtractPair} />
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        value={pair + ""}
        onChangeText={(newVal) => setPair(Number(newVal))}
        placeholder="pair"
      />
      <ArrowButtonRight style={styles.arrowButton} onPress={addPair} />
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
    marginHorizontal: 15,
    borderRadius: 5,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 18,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: "#424549",
    borderRadius: 8,
  },
});

export default CopperInput;
