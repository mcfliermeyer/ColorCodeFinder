import SVG, { Path, Rect, G, SvgProps } from "react-native-svg";

const RedlightSVG = () => {
  return (
    <SVG>
      <Path
        stroke={`hsl(0, 100%, 50%, 1)`}
        strokeWidth={0.9}
        d={`M32.5 15 l0 0 0 0`}
      />
    </SVG>
  );
};

export default RedlightSVG;

