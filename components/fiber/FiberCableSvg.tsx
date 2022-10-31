import SVG, { Path, Rect } from "react-native-svg";
import useFiberColor from "../../hooks/useFiberColor";

interface Props {
  height?: number;
  width?: number;
  fiber: number;
}

const FiberCableSvg = (props: Props) => {
  return (
    <SVG
      viewBox="0 0 66 171"
      width={props.width}
      height={props.height}
      {...props}
    >
      <Path
        strokeWidth={9}
        stroke={
          props.fiber - 2 === 0 ? "#424549" : useFiberColor(props.fiber - 2)
        }
        d="m6.373 37 .423 36.523"
        transform="translate(1.127)"
      />
      <Path
        stroke={
          props.fiber - 1 === 0 ? "#424549" : useFiberColor(props.fiber - 1)
        }
        strokeWidth={9}
        origin="0.5 0.36"
        d="m13.648 22 .423 50"
        transform="translate(5.858 2.518)"
      />
      <Path
        stroke="#28ba00"
        strokeOpacity={0.4}
        d="m33 3.227.255 15.828M31 3.2l.255 15.828"
      />
      <Rect
        x="26.373"
        y="15"
        width="9"
        height="59"
        stroke="#cef5c38d"
        fill={useFiberColor(props.fiber)}
        strokeWidth={2}
        transform="translate(1.4 2.518)"
      />
      <Path strokeOpacity={0.63} stroke="#cef5c3" d="m32 1 .255 18" />
      <Path
        stroke={useFiberColor(props.fiber + 1)}
        strokeWidth={9}
        origin="0.5 0.36"
        d="m38.981 22 .423 50"
        transform="translate(5.858 2.518)"
      />
      <Path
        strokeWidth={9}
        stroke={useFiberColor(props.fiber + 2)}
        origin="0.5 0.36"
        d="m56.315 37 .423 36.523"
        transform="translate(1.127)"
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
