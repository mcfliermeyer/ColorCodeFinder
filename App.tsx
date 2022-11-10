import React, { useRef, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import CopperInput from "./components/copper/CopperInput";
import CopperPairSelector from "./components/copper/CopperPairSelector";
import TouchableCopperPairComponent from "./components/copper/TouchableCopperPairComponent";
import FiberCableSvg from "./components/fiber/FiberCableSvg";
import FiberInput from "./components/fiber/FiberInput";
import Redlight from "./components/fiber/Redlight";
import ScrollableFiber from "./components/fiber/ScrollableFiber";
import TouchableFiberComponent from "./components/fiber/TouchableFiberComponent";
import useFiberColor from "./hooks/useFiberColor";

export default function App() {
  const [pair, setPair] = React.useState(0);
  const [pairSelectorVisible, setPairSelectorVisible] = React.useState(false);
  const [fiber, setFiber] = React.useState(3); //default to 3 because fiber view shows 5 fibers. looks better?



  const addPair = () => {
    setPair((oldPair) => {
      if (oldPair >= 0) return oldPair + 1;
      return 1;
    });
  };
  const subtractPair = () => {
    setPair((oldPair) => {
      if (oldPair > 1) return oldPair - 1;
      return 1;
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
  const handleFiberPress = () => {};

  const addFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber >= 0) return oldFiber + 1;
      return 1;
    });
  };
  const subtractFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber > 1) return oldFiber - 1;
      return 1;
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
        {/* <TouchableFiberComponent
          fiber={fiber}
          handlePress={handleFiberPress}
          height={480}
          width={180}
        />
        <FiberInput
          fiber={fiber}
          setFiber={setFiberNumber}
          addFiber={addFiber}
          subtractFiber={subtractFiber}
        /> */}
        <ScrollableFiber />
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
