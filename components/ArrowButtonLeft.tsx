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

const ArrowButtonLeft = (props: ArrowButtonProps) => (
  <TouchableOpacity style={props.style} onPress={props.onPress}>
    <ArrowButtonLeftSVG />
  </TouchableOpacity>
);

const ArrowButtonLeftSVG = (props: SvgProps) => (
  <Svg viewBox="8 8.202 59.513 111.362" width={24} height={24} {...props}>
    <Path
      fill="#d8d8d8"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={14}
      d="M8 63.315 67.43 8.202"
      transform="rotate(180 37.715 35.758)"
    />
    <Path
      fill="#d8d8d8"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={14}
      d="m5.393 64.451 59.43 55.113"
      data-bx-origin="0.522632 0.5"
      transform="rotate(180 36.453 92.007)"
    />
  </Svg>
);

export default ArrowButtonLeft;
