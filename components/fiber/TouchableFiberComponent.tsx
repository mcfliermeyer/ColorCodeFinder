import React, { useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = () => {
    fadeIn();
  };
  return (
    <TouchableOpacity style={styles.fiberContainer} onPress={handlePress}>
      <FiberCableSvg
        width={props.width}
        height={props.height}
        fiber={props.fiber}
        // fadeAnim={fadeAnim}
      />
    </TouchableOpacity>
  );
};
export default TouchableFiberComponent;

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
