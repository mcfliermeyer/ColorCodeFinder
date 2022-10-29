import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import FiberCableSvg from "./FiberCableSvg";

interface Props {
  handlePress: () => void;
  fiber: number;
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
}
const TouchableFiberComponent = (props: Props) => {
  return (
      <TouchableOpacity style={styles.fiberContainer} onPress={props.handlePress}>
        <FiberCableSvg width={props.width} height={props.height} fiber={props.fiber}/>
      </TouchableOpacity>
    )
}
export default TouchableFiberComponent

const styles = StyleSheet.create({
  fiberContainer: {
    backgroundColor: "#424549",
    padding: 15,
    paddingHorizontal: 22,
    marginHorizontal: 8,
    marginBottom: 40,
    borderRadius: 10,
  },
});
