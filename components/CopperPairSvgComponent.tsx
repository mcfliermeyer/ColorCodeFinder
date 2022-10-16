import * as React from "react";
import SVG, { Path } from "react-native-svg";

interface Props {
  tipColor: string;
  ringColor: string;
  width?: number;
  height?: number;
}

const CopperPairSvgComponent = (props: Props) => (
  <SVG
  viewBox="0 0 25 110" width="25" height="140"
  preserveAspectRatio="none"
  >
    <Path
      strokeLinecap="round"
      stroke={props.ringColor}
      strokeWidth="8.625px"
      d="M 4.063 4.438 C 2.904 21.228 18.199 26.907 18.87 51.605 C 19.511 75.17 3.643 84.957 4.744 104.2"
    />
    <Path
      strokeLinecap="round"
      stroke={props.tipColor}
      strokeWidth="8.625px"
      d="M 5.174 103.962 C 4.015 87.172 19.31 81.493 19.981 56.795 C 20.622 33.23 4.753 23.443 5.855 4.2"
      transform="matrix(-1, 0, 0, -1, 25.111259, 108.162003)"
    />
    <Path
      stroke={props.ringColor}
      strokeLinecap="round"
      strokeWidth="8.6px"
      d="M 8.043 69.739 L 18.084 88.595"
      transform="matrix(0.62932, 0.777146, -0.777146, 0.62932, 65.101997, 18.988882)"
    />
  </SVG>
);

export default CopperPairSvgComponent;
