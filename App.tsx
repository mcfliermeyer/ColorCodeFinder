//TODO create seperate copper and fiber components
//TODO useFiber hook
//TODO setfiber add fiber subtract fiber
//TODO get all fiber colors set to variables
//TODO when fiber changes, have all 5 fibers in svg match what they should be

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
import FiberInput from "./components/fiber/FiberInput";
import TouchableFiberComponent from "./components/fiber/TouchableFiberComponent";

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
      if (oldPair > 1) return oldPair - 1;
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
  const handleFiberPress = () => {
    console.log("fiber pressed");
  };
  const [fiber, setFiber] = React.useState(3); //default to 3 because fiber view shows 5 fibers. looks better?
  const addFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber >= 0) return oldFiber + 1;
      return 0;
    });
  };
  const subtractFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber > 1) return oldFiber - 1;
      return 0;
    });
  };
  const setFiberNumber = (newFiber: number) => {
    setFiber(() => newFiber);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        {/* <CopperPairSelector
          handlePairSelected={handlePairSelected}
          pairSelectorVisible={pairSelectorVisible}
        />
        <TouchableCopperPairComponent handlePress={handlePress} pair={pair} />
        <CopperInput
          pair={pair}
          setPair={setPairNumber}
          addPair={addPair}
          subtractPair={subtractPair}
        /> */}
        <TouchableFiberComponent
          fiber={3}
          handlePress={handleFiberPress}
          height={480}
          width={180}
        />
        <FiberInput
          fiber={fiber}
          setFiber={setFiberNumber}
          addFiber={addFiber}
          subtractFiber={subtractFiber}
        />
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
