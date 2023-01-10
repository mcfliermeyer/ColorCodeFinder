import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import { useFonts } from "expo-font";
import CopperComponent from "./components/copper/CopperComponent";
import ScrollableFiber from "./components/fiber/ScrollableFiber";
import SwipeableCardDeck from "./components/SwipeableCardDeck";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Lato-Regular.ttf"),
  });
  return (
    // for scroll to work, this cannot wrap whole screen, as it will remove and gestures i think
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <SwipeableCardDeck>
          <CopperComponent />
          <ScrollableFiber />
        </SwipeableCardDeck>
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
