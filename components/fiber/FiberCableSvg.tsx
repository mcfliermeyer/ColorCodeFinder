import SVG, { Path, Rect } from "react-native-svg";
import useFiberColor from "../../hooks/useFiberColor";
import hexToHSL from "../utilities/hexToHSL";
import { StyleSheet } from "react-native";
interface Props {
  height?: number;
  width?: number;
  fiber: number;
}

const highlightStrandSvg = (
  howManyStrokes: number,
  strokeSize: number,
  baseColorHex: string
) => {
  const [h, s, l] = hexToHSL(baseColorHex);
  const lightenFiber = l + 25;

  return [...Array(howManyStrokes)].map((e, i) => {
    return (
      <SVG key={i}>
        {/* main column of fiber */}
        <Path
          stroke={`hsl(${h}, ${s}%, ${lightenFiber + i}%, ${1.0 - i / 12})`}
          strokeWidth={strokeSize}
          d={`m${32.5 - i * strokeSize} 0 l0 18 M${
            32.5 + i * strokeSize
          } 0 l0 18`}
        />
        {/* curved top of fiber */}
        <Path
          stroke={`hsl(${h}, ${s}%, ${lightenFiber + i}%, ${1.0 - i / 12})`}
          strokeWidth={strokeSize}
          d={`
              m${32.5 - i * strokeSize} 0 
              C${32.5 - i * strokeSize} 0 32.5 -5 ${32.5 + i * strokeSize} 0
            `}
        />
      </SVG>
    );
  });
};

const FiberCableSvg = (props: Props) => {
  return (
    <SVG viewBox="0 0 66 171" width={props.width} height={props.height}>
      {highlightStrandSvg(10, 0.12, useFiberColor(props.fiber))}
      <SVG style={styles.fiberOne}>
        <Path
          strokeWidth={9}
          stroke={
            props.fiber - 2 === 0 ? "#424549" : useFiberColor(props.fiber - 2)
          }
          d="m7.3 50 0 25"
        />
      </SVG>
      <Path
        stroke={
          props.fiber - 1 === 0 ? "#424549" : useFiberColor(props.fiber - 1)
        }
        strokeWidth={9}
        d="m19 44 0 30"
      />
      <Rect
        x="28"
        y="17"
        width="9"
        height="59"
        fill={useFiberColor(props.fiber)}
        strokeWidth={0.3}
      />
      <Path
        stroke={useFiberColor(props.fiber + 1)}
        strokeWidth={9}
        d="m45.5 44 0 30"
      />
      <Path
        strokeWidth={9}
        stroke={useFiberColor(props.fiber + 2)}
        d="m57 50 0 30"
      />
      <Rect
        stroke="#2e27a3"
        fill="#2623e0"
        strokeLinejoin="round"
        strokeLinecap="round"
        x={1}
        y={73.674}
        width={64}
        height={92.244}
        rx={4}
        ry={4}
      />
    </SVG>
  );
};
export default FiberCableSvg;

const styles = StyleSheet.create({
  fiberOne: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 10,
    top: 20,
  },
});
