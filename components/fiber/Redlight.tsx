import React from "react";
import { Animated, StyleSheet } from "react-native";
import SVG, { Path } from "react-native-svg";
import useRequestAnimationFrame from "../../hooks/useRequestAnimationFrame";

interface Props {
  width?: number;
}

const Redlight = (props: Props) => {
  const animation = useRequestAnimationFrame(500);

  return (
    <Animated.View style={{ opacity: animation, ...styles.view }}>
      <SVG>
        <Path
          stroke={`hsl(0, 100%, 50%, .7)`}
          strokeWidth={5}
          d={`M0 0 l0 50 0 50`}
        />
      </SVG>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: 5,
  },
});

export default Redlight;
