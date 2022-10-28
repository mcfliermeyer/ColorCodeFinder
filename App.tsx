import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CopperInput from "./components/copper/CopperInput";
import CopperPairSelector from "./components/copper/CopperPairSelector";
import TouchableCopperPairComponent from "./components/copper/TouchableCopperPairComponent";
import FiberCableSvg from "./components/fiber/FiberCableSvg";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
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
        <FiberCableSvg />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
