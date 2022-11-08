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
          strokeWidth={1.9}
          d={`M${props.width ? props.width/2 - 1.5 : 50} 0 l0 12 0 12`}
        />
      </SVG>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 12,
  },
});

export default Redlight;
