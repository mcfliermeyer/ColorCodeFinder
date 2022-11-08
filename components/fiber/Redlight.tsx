import React from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import SVG, { Path } from "react-native-svg";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFrame";

const Redlight = () => {
  const animation = useRequestAnimationFrame(500);

  return (
    <TouchableOpacity style={styles.container}>
      <Animated.View style={{ opacity: animation, ...styles.view }}>
        <SVG>
          <Path
            stroke={`hsl(0, 100%, 50%, 1)`}
            strokeWidth={1.9}
            d={`M32.5 15 l0 100 0 0`}
          />
        </SVG>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    width: 200,
    height: 200,
  },
  svg: {
    width: 200,
    height: 200,
  },
});

export default Redlight;
