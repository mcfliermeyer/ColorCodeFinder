import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  ViewToken,
} from "react-native";
import { MotiView } from "moti";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";
import FiberInput from "./FiberInput";
import Redlight from "./Redlight";

const screenWidth = Dimensions.get("screen").width;
const itemSize = screenWidth - 80;

interface Props {
  fiber: number;
}

const ScrollableFiberCable = (props: Props) => {
  const ref = React.useRef<FlatList>(null);
  const [fiber, setFiber] = React.useState(1);
  const scrolledToIndex = React.useRef<number>(fiber);

  React.useEffect(() => {
    const remainder = (props.fiber - 1) % 12;
    const base = props.fiber - 1 - remainder;
    const tubeNumber = base / 12;
    const offset = (tubeNumber) > 0 ? (tubeNumber) * 80 + 120 : 120 //all because the first seperator isnt calculated

    ref.current?.scrollToIndex({
      animated: true,
      index: tubeNumber + 2,
      viewPosition: 0.5,
      viewOffset: itemSize - offset,
    });
  }, [props.fiber]);

  // const addFiber = () => {
  //   setFiber((oldFiber) => {
  //     if (oldFiber >= 0) return oldFiber + 1;
  //     return 1;
  //   });
  // };
  // const subtractFiber = () => {
  //   setFiber((oldFiber) => {
  //     if (oldFiber > 1) return oldFiber - 1;
  //     return 1;
  //   });
  // };
  // const setFiberNumber = (newFiber: number) => {
  //   setFiber(() => newFiber);
  // };

  const createData = () => {
    const myArray = Array.from({ length: 13 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e), fiberNumber: e };
    });
    return mapped;
  };

  const viewabilityConfig = {
    minimumViewTime: 0,
    waitForInteraction: true,
    itemVisiblePercentThreshold: 10,
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        horizontal
        data={createData()}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: itemSize,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: index === 0 ? "#424549" : useFiberColor(index),
            }}
          ></View>
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index - index * 40,
          index: index,
        })}
        snapToInterval={itemSize + 40}
        decelerationRate={"normal"}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 30,
    marginTop: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424549",
  },
  view: {
    width: itemSize,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  seperator: {
    width: 40,
    height: 300,
  },
});
export default ScrollableFiberCable;
