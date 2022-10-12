import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ArrowButtonLeft from "./ArrowButtonLeft";
import ArrowButtonRight from "./ArrowButtonRight";
import CopperInput from "./CopperInput";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <CopperPairSvgComponent />
      <CopperInput />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f50",
    alignItems: "center",
    justifyContent: "center",
  },
});
