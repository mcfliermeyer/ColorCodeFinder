import { useRef, useState } from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import SVG, { Path, Rect, G, SvgProps, Image, SvgUri } from "react-native-svg";
import RedlightSVG from "./RedlightSVG";

const Redlight = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [redLightVisible, setRedLightVisible] = useState(true);

  const fadeIn = () => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeInOrOut = () => {
    if (redLightVisible) {
      setRedLightVisible((prev) => !prev);
      fadeOut();
    } else {
      setRedLightVisible((prev) => !prev);
      fadeIn();
    }
  };
  setInterval(fadeInOrOut, 1000)

  return (
    <TouchableOpacity style={styles.container} onPress={fadeInOrOut}>
      <Animated.View style={{ opacity: fadeAnim, ...styles.view }}>
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
