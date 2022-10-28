import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ArrowButtonLeft from "../ArrowButtonLeft";
import ArrowButtonRight from "../ArrowButtonRight";

interface Props {
  fiber: number;
  setFiber: (newPair: number) => void;
  addFiber: () => void;
  subtractFiber: () => void;
}

const handleNumberInput = (value: string, setFiber: (fiber: number) => void) => {
  const isPositiveNumber = /^\d+$/.test(value) && Number(value) > 0;
  if (isPositiveNumber) {
    setFiber(Number(value));
  } else {
    setFiber(0);
  }
};

const FiberInput = ({ fiber, setFiber, addFiber, subtractFiber }: Props) => {
  return (
    <View style={styles.container}>
      <ArrowButtonLeft style={styles.arrowButton} onPress={subtractFiber} />
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        value={fiber + ""}
        onChangeText={(newVal) => handleNumberInput(newVal, setFiber)}
        placeholder="fiber"
      />
      <ArrowButtonRight style={styles.arrowButton} onPress={addFiber} />
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

export default FiberInput;
