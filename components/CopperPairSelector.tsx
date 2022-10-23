import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

const screen = Dimensions.get("screen");
// TODO: measure height to fit 25 pairs on screen without looking crowded
// TODO figure out why 100% height is not filling whole screen

const CopperPairSelector = () => {
  const padding = 33;
  const componentWidth = screen.width / 5 - padding * 2;
  const componentHeight = screen.height / 5 - padding * 2;
  return (
    <View style={styles.pairsContainer}>
      {Array.from({ length: 5 }, (_, outter_index) => (
        <View style={styles.wrapper} key={outter_index}>
          {Array.from({ length: 5 }, (_, inner_index) => (
            <TouchableOpacity
              style={styles.pairButton}
              key={inner_index + 1 + 5 * outter_index}
            >
              <CopperPairSvgComponent
                tipColor={useTipColor(inner_index + 1 + 5 * outter_index)}
                ringColor={useRingColor(inner_index + 1)}
                width={componentWidth}
                height={componentHeight}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pairsContainer: {
    // flex: 1,
    // flexDirection: "column",
    // height: "100%",
    // width: "100%",
    position: "absolute",
    padding: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    // backgroundColor: "#36393e",
    maxWidth: "100%",
    backgroundColor: "peru",
    alignItems: "center",
    justifyContent: "center",
  },
  pairButton: {
    padding: 28,
  },
});

export default CopperPairSelector;
