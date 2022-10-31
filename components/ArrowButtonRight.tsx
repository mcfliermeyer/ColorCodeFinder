import * as React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";

interface ArrowButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ArrowButtonRight = (props: ArrowButtonProps) => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <ArrowButtonRightSVG />
  </TouchableOpacity>
);

const ArrowButtonRightSVG = (props: SvgProps) => (
  <Svg viewBox="8 8.202 59.513 111.362" width={24} height={24} {...props}>
    <Path
      fill="#d8d8d8"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={14}
      d="m8.083 8.202 59.43 55.113"
    />
    <Path
      fill="#d8d8d8"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={14}
      d="m8 119.564 59.43-55.113"
      data-bx-origin="0.522632 0.5"
    />
  </Svg>
);

export default ArrowButtonRight;
