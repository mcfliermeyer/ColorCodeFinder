import { StyleSheet, View, TouchableOpacity } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";

type Props = {};
const CopperPairSelector = (props: Props) => {
  return (
    <View style={styles.container}>
      <CopperPairSvgComponent
        tipColor={useTipColor(1)}
        ringColor={useRingColor(1)}
        width={10}
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
