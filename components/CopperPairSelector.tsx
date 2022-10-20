import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

const screen = Dimensions.get("screen");
// TODO: measure height to fit 25 pairs on screen without looking crowded
// TODO figure out why 100% height is not filling whole screen

const CopperPairSelector = () => {
  return (
    <View style={styles.container}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity style={styles.pairButton} key={index}>
            <CopperPairSvgComponent
              tipColor={useTipColor(1)}
              ringColor={useRingColor(1)}
              width={screen.width / 20}
              height={screen.height / 5}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#36393e",
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "peru",
    alignItems: "center",
    justifyContent: "center",
  },
  pairButton: {
    padding: 25,
  }
});

export default CopperPairSelector;
