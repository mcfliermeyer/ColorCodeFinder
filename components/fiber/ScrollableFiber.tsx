import React from "react";
import SVG, { Path, Rect } from "react-native-svg";
import { FlatList, StyleSheet, View } from "react-native";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";

type Props = {};
const ScrollableFiber = (props: Props) => {
  return (
    <FlatList
      style={styles.container}
      data={Array.from({ length: 22 }, (_, i) => i)}
      renderItem={(item) => (
        <View style={styles.view}>
          <SVG>
            <Rect
              x="10"
              y="17"
              width="9"
              height="59"
              fill={useFiberColor(Number(item))}
              strokeWidth={0.3}
            />
          </SVG>
        </View>
      )}
      keyExtractor={(item, index) => fiberColorDictionary[index] + `${index}`}
    />
  );
};
export default ScrollableFiber;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  view: {
    backgroundColor: "#C0C2C9",
    width: 50,
    height: 50,
    margin: 10,
  },
});
//needing to add flatlist scroll with svg painted on each component
