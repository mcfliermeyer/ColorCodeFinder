import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

interface Props{
  handlePress: () => void;
  pair: number;
}
const TouchableCopperPairComponent = ({handlePress, pair}: Props) => {
  return (
    <TouchableOpacity style={styles.copperPairContainer} onPress={handlePress}>
      <CopperPairSvgComponent
        tipColor={useTipColor(pair)}
        ringColor={useRingColor(pair)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  copperPairContainer: {
    backgroundColor: "#424549",
    padding: 5,
    paddingHorizontal: 50,
    margin: 15,
    borderRadius: 10,
  },
})
export default TouchableCopperPairComponent


