import React from "react";
import SVG, { Path, Rect } from "react-native-svg";
import { FlatList, StyleSheet, View } from "react-native";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";

type Props = {};
const ScrollableFiber = (props: Props) => {

  const createData = () => {
    const myArray = Array.from({length: 20}, (e,i) => i+1)
    const mapped = myArray.map((e,i) => {
      return {fiberColor: useFiberColor(e), fiberNumber: e}
    })
    return mapped
  }

  return (
    <View>
      <FlatList
        style={styles.container}
        data={createData()}
        renderItem={({ item }) => (
          <View style={styles.view}>
            <SVG>
              <Rect
                x="10"
                y="17"
                width="9"
                height="59"
                fill={item.fiberColor}
                strokeWidth={0.3}
              />
            </SVG>
          </View>
        )}
        keyExtractor={(item, index) => fiberColorDictionary[index] + `${index}`}
        horizontal={true}
      />
    </View>
  );
};
export default ScrollableFiber;

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 200,
  },
  view: {
    backgroundColor: "#C0C2C9",
    width: 50,
    height: 50,
    margin: 10,
  },
});
//needing to add flatlist scroll with svg painted on each component
