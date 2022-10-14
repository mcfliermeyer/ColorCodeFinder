import * as React from "react";
import SVG, { Path } from "react-native-svg";

interface Props {
  tipColor: string;
  ringColor: string;
}

const CopperPairSvgComponent = (props: Props) => (
  <SVG
    // viewBox="18 23.621 40 80"
    viewBox="18 28 40 80"
    width={40}
    height={169}
    // {...props}
  >
    <Path
      strokeLinecap="round"
      stroke={props.ringColor}
      strokeWidth="13"
      d="M61.216 152.744c-6.265-26.486-19.598-35.294-23.101-68.917C34.892 52.898 57.2 23.113 58.395 1.968"
      transform="rotate(180 43.134 88.183)"
    />
    <Path
      strokeLinecap="round"
      stroke={props.tipColor}
      strokeWidth="12"
      d="M53.069 23.751c-3.2 26.368-20.841 35.457-24.344 69.08-3.223 30.929 19.195 60.033 20.39 81.178"
    />
    <Path
      stroke={props.ringColor}
      strokeLinecap="round"
      strokeWidth="12.8px"
      d="m43.244 125.565-10 28"
      transform="rotate(.999 38.242 139.566)"
    />
  </SVG>
);

export default CopperPairSvgComponent;
