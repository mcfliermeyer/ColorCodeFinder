import React from "react";
import SVG, { Path, Rect } from "react-native-svg";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";

const screenWidth = Dimensions.get("screen").width;
const horizontalMargin = 50;
const fiberMargin = 4;
const itemSize = (screenWidth - horizontalMargin * 2) / 5;

{
  /* need scrollable fiber to show 5 fibers at a time, pretty close together and different sizes 
          that change on scroll the closer to the center the taller */
}
// need to center svg and have width and height change with size of view

type Props = {};
const ScrollableFiber = (props: Props) => {
  const ref = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState(9);

  // React.useEffect(() => {
  //   ref.current?.scrollToIndex({animated: true, index: index})
  // }, [])

  const createData = () => {
    const myArray = Array.from({ length: 24 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e), fiberNumber: e };
    });
    return mapped;
  };

  return (
    <FlatList
      ref={ref}
      style={styles.container}
      data={createData()}
      initialScrollIndex={index} //problem with this working
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
      snapToAlignment="start"
      decelerationRate={"normal"}
      snapToInterval={itemSize}
    />
  );
};
export default ScrollableFiber;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 150,
    width: screenWidth - horizontalMargin * 2,
    backgroundColor: "orange",
  },
  view: {
    backgroundColor: "#C0C2C9",
    width: itemSize - fiberMargin * 2,
    height: 150,
    marginHorizontal: fiberMargin,
  },
});
