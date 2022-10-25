import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

interface Props {
  handlePress: () => void;
  pair: number;
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
}
const TouchableCopperPairComponent = ({
  handlePress,
  pair,
  ...props
}: Props) => {
  return (
    <TouchableOpacity style={styles.copperPairContainer} onPress={handlePress}>
      <CopperPairSvgComponent
        tipColor={useTipColor(pair)}
        ringColor={useRingColor(pair)}
        width={props.width}
        height={props.height}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  copperPairContainer: {
    backgroundColor: "#424549",
    padding: 15,
    paddingHorizontal: 22,
    marginHorizontal: 8,
    marginBottom: 40,
    borderRadius: 10,
  },
});
export default TouchableCopperPairComponent;
