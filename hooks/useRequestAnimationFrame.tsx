import React from "react";
import { Animated } from "react-native";

const useRequestAnimationFrame = (animationDelay: number) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const requestRef = React.useRef<null | number>(null);
  const previousTimeRef = React.useRef<null | number>(null);
  const hasNotRedlightCycled = React.useRef(true);
  const [redLightVisible, setRedLightVisible] = React.useState(false);
  const firstCycleTime = animationDelay / 5; //to start near beginning of cycle
  const cycleFlagReset = animationDelay / 2;//to reset delay 

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [redLightVisible]);

  const animate = (time: number) => {
    if (previousTimeRef.current != null) {
      const animationCycles = previousTimeRef.current % animationDelay;
      if (animationCycles < firstCycleTime && hasNotRedlightCycled.current) {
        hasNotRedlightCycled.current = false;
        fadeInOrOut();
      }
      if (animationCycles > cycleFlagReset) {
        //resetting red light cycle flag
        hasNotRedlightCycled.current = true;
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  const fadeIn = () => {
    return Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    return Animated.timing(animation, {
      toValue: 0,
      duration: 300,
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
  return animation;
};
export default useRequestAnimationFrame;
