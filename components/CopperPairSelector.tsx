import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";
import useComponentSize from "../hooks/useComponentSize";

const screen = Dimensions.get("screen")

type Props = {};
const CopperPairSelector = () => {
  const [size, onLayout] = useComponentSize();
  // console.log(size);

  return (
    <View style={styles.container} onLayout={useComponentSize}>
      <CopperPairSvgComponent
        tipColor={useTipColor(1)}
        ringColor={useRingColor(1)}
        width={screen.width/6}
        height={80}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#36393e",
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "peru",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CopperPairSelector;
