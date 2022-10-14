import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CopperInput from "./CopperInput";
import CopperPairSvgComponent from "./CopperPairSvgComponent";
import useRingColor from "./hooks/useRingColor";

export default function App() {
  const [pair, setPair] = React.useState(0);
  const addPair = () => {
    setPair((oldPair) => {
      return oldPair + 1;
    });
  };
  const subtractPair = () => {
    setPair((oldPair) => {
      return oldPair - 1;
    });
  };
  const setPairNumber = (newPair: number) => {
    setPair(() => newPair);
  };
  return (
    <View style={styles.container}>
      <View style={styles.copperPairContainer}>
        <CopperPairSvgComponent tipColor={"white"} ringColor={"blue"} />
      </View>
      <CopperInput
        pair={pair}
        setPair={setPairNumber}
        addPair={addPair}
        subtractPair={subtractPair}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36393e",
    alignItems: "center",
    justifyContent: "center",
  },
  copperPairContainer: {
    backgroundColor: "#424549",
    padding: 5,
    paddingHorizontal: 50,
    margin: 15,
    borderRadius: 10,
  },
});
