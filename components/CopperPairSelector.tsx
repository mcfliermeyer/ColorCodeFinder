import { StyleSheet, View, Modal, Dimensions } from "react-native";
import useRingColor from "../hooks/useRingColor";
import useTipColor from "../hooks/useTipColor";
import CopperPairSvgComponent from "./CopperPairSvgComponent";
import TouchableCopperPairComponent from "./TouchableCopperPairComponent";

const screen = Dimensions.get("screen");
// TODO: measure height to fit 25 pairs on screen without looking crowded
// TODO: figure out how to autofill height and width

interface Props {
  handlePairSelected: (pairSelected: number) => void,
  pairSelectorVisible: boolean,
}

const CopperPairSelector = ({
  handlePairSelected,
  pairSelectorVisible,
}: Props) => {
  const padding = 33;
  const componentWidth = screen.width / 5 - padding * 2;
  const componentHeight = screen.height / 5 - padding * 2;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={pairSelectorVisible}
    >
      <View style={styles.pairsContainer}>
        {Array.from({ length: 5 }, (_, outter_index) => (
          <View style={styles.wrapper} key={outter_index}>
            {Array.from({ length: 5 }, (_, inner_index) => (
              <TouchableCopperPairComponent
                style={styles.pairButton}
                handlePress={() => handlePairSelected(
                  inner_index + 1 + 5 * outter_index
                )}
                pair={inner_index + 1 + 5 * outter_index}
                width={componentWidth}
                height={componentHeight}
                key={inner_index + 1 + 5 * outter_index}
              />
            ))}
          </View>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pairsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 10,
    top: 40,
    bottom: 0,
    left: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 10,
    backgroundColor: "#36393e",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#36393e",
    maxWidth: "100%",
    // backgroundColor: "peru",
    alignItems: "center",
    justifyContent: "center",
  },
  pairButton: {
    paddingVertical: 28,
  },
});

export default CopperPairSelector;
