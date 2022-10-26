import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import CopperInput from "./components/CopperInput";
import CopperPairSelector from "./components/CopperPairSelector";
import TouchableCopperPairComponent from "./components/TouchableCopperPairComponent";

//TODO: make sure no letters cannot be typed into CopperInput and it cannot go below 1 por favor

export default function App() {
  const [pair, setPair] = React.useState(0);
  const [pairSelectorVisible, setPairSelectorVisible] = React.useState(false);
  const addPair = () => {
    setPair((oldPair) => {
      if (oldPair >= 0) return oldPair + 1;
      return 0;
    });
  };
  const subtractPair = () => {
    setPair((oldPair) => {
      if (oldPair >= 1) return oldPair - 1;
      return 0;
    });
  };
  const setPairNumber = (newPair: number) => {
    setPair(() => newPair);
  };
  const handlePress = () => {
    setPairSelectorVisible(true);
  };
  const handlePairSelected = (pairSelected: number) => {
    setPairSelectorVisible((oldValue) => !oldValue);
    setPair((oldPair) => pairSelected);
  };
  return (
    <View style={styles.container}>
      <CopperPairSelector
        handlePairSelected={handlePairSelected}
        pairSelectorVisible={pairSelectorVisible}
      />
      <TouchableCopperPairComponent handlePress={handlePress} pair={pair} />
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
  copperPairSelector: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#36393e",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
