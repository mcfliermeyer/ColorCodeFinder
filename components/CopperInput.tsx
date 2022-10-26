import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ArrowButtonLeft from "./ArrowButtonLeft";
import ArrowButtonRight from "./ArrowButtonRight";

interface Props {
  pair: number;
  setPair: (newPair: number) => void;
  addPair: () => void;
  subtractPair: () => void;
}

const handleNumberInput = (value: string, setPair: (pair: number) => void) => {
  const isPositiveNumber = /^\d+$/.test(value) && Number(value) > 0;
  if (isPositiveNumber) {
    setPair(Number(value));
  } else {
    setPair(0);
  }
};

const CopperInput = ({ pair, setPair, addPair, subtractPair }: Props) => {
  return (
    <View style={styles.container}>
      <ArrowButtonLeft style={styles.arrowButton} onPress={subtractPair} />
      {/* <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "height" : "height"}
        keyboardVerticalOffset={50}
        enabled
      > */}
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          value={pair + ""}
          onChangeText={(newVal) => handleNumberInput(newVal, setPair)}
          placeholder="pair"
        />
      {/* </KeyboardAvoidingView> */}
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
    marginHorizontal: 15,
    padding: 5,
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
