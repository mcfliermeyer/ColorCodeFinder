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
  setFiberCableNumber: (cableNum: number) => void;
}

const ScrollableFiberCable = (props: Props) => {
  const ref = React.useRef<FlatList>(null);
  const [fiber, setFiber] = React.useState(1);
  const scrolledToIndex = React.useRef<number>(1);
  const remainder = (props.fiber - 1) % 12;
  const base = props.fiber - 1 - remainder;
  const tubeNumber = base / 12;
  const offset = seperatorWidth * tubeNumber + 25;
  // figure out how i did scroll to index to set fiber
  React.useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index: tubeNumber + 1,
      viewPosition: 0.5,
      viewOffset: itemSize - offset,
    });
  }, [props.fiber]);

  const createData = () => {
    const myArray = Array.from({ length: 13 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e), fiberNumber: e };
    });
    return mapped;
  };
  const viewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const firstViewableFiberCableNumber: number =
        viewableItems[0]?.item.fiberNumber;
      scrolledToIndex.current = firstViewableFiberCableNumber; // might not need
      if (viewableItems.length > 0) {
        props.setFiberCableNumber(firstViewableFiberCableNumber);
      }
    },
    []
  );
  const scrollEnded = () => {
    // needs setTimeout because snapToInterval still needs to run, then scrolledToIndex needs
    // to get updated and the scroll might still be scrolling
    setTimeout(() => {
      // setFiber(scrolledToIndex.current);
    }, 280);
  };

  const viewabilityConfig = {
    minimumViewTime: 600,
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
              backgroundColor: useFiberColor(index + 1),
              marginLeft: index === 0 ? 25 : 0,
            }}
          ></View>
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index,
          index: index,
        })}
        snapToInterval={itemSize + seperatorWidth}
        decelerationRate={0.88}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const seperatorWidth = 40;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 30,
    marginTop: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#424549",
  },
  view: {
    width: itemSize,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    marginHorizontal: seperatorWidth,
  },
  seperator: {
    width: seperatorWidth,
    height: 300,
  },
});
export default ScrollableFiberCable;
