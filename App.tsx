<<<<<<< Updated upstream
import React, { useRef, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
  View,
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

=======
import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import { useFonts } from "expo-font";
import CardHolder from "./components/CardHolder";
import CopperComponent from "./components/copper/CopperComponent";
import ScrollableFiber from "./components/fiber/ScrollableFiber";
import SwipeableCardDeck from "./components/SwipeableCardDeck";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Lato-Regular.ttf"),
  });
>>>>>>> Stashed changes
  return (
    // for scroll to work, this cannot wrap whole screen, as it will remove and gestures i think
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
<<<<<<< Updated upstream
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
        <ScrollableFiber />
=======
        <View style={{ padding: 40 }} />
        <SwipeableCardDeck>
          <ScrollableFiber />
          <CopperComponent />
        </SwipeableCardDeck>
>>>>>>> Stashed changes
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36393e",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
