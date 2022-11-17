import React, { useCallback } from "react";
import SVG, { Path, Rect } from "react-native-svg";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";
import FiberInput from "./FiberInput";

const screenWidth = Dimensions.get("screen").width;
const horizontalMargin = 50;
const fiberMargin = 4;
const itemSize = (screenWidth - horizontalMargin * 2) / 5;

{
  /* need scrollable fiber to show 5 fibers at a time, pretty close together and different sizes 
          that change on scroll the closer to the center the taller */
}
// need to center svg and have width and height change with size of view

interface Props {}

const ScrollableFiber = (props: Props) => {
  const ref = React.useRef<FlatList>(null);
  const [fiber, setFiber] = React.useState(5);

  const addFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber >= 0) return oldFiber + 1;
      return 1;
    });
  };
  const subtractFiber = () => {
    setFiber((oldFiber) => {
      if (oldFiber > 1) return oldFiber - 1;
      return 1;
    });
  };
  const setFiberNumber = (newFiber: number) => {
    setFiber(() => newFiber);
  };

  React.useEffect(() => {
    ref.current?.scrollToIndex({ animated: true, index: fiber - 1 });
  }, [fiber]);

  const createData = () => {
    const myArray = Array.from({ length: 24 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e), fiberNumber: e };
    });
    return mapped;
  };

  const viewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    const firstItemChanged = changed[0];
    const firstItemChangedFiberNumber: number = firstItemChanged.item.fiberNumber;
    const lastItemChanged = changed[changed.length - 1];
    const lastItemChangedFiberNumber: number = lastItemChanged.item.fiberNumber;
    console.log("first item changed: ", firstItemChanged.item.fiberNumber);
    console.log("last item changed: ", lastItemChanged.item.fiberNumber);
    if (firstItemChangedFiberNumber > 1 && lastItemChangedFiberNumber < 20) {
      if (firstItemChangedFiberNumber <= lastItemChangedFiberNumber) {
        setFiber((prevFiber) => prevFiber - 1);
      } else {
        setFiber((prevFiber) => prevFiber + 1);
      }
    }
  }, []);

  const viewabilityConfig = {
    waitForInteraction: true,
    // viewAreaCoveragePercentThreshold: 95,
    itemVisiblePercentThreshold: 20,
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        style={styles.flatlist}
        data={createData()}
        initialScrollIndex={fiber - 1}
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
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index,
          index: index,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.fiberInputWrapper}>
        <FiberInput
          fiber={fiber}
          setFiber={setFiber}
          addFiber={addFiber}
          subtractFiber={subtractFiber}
        />
      </View>
    </View>
  );
};
export default ScrollableFiber;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  flatlist: {
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
  fiberInputWrapper: {
    margin: 15,
  },
});
