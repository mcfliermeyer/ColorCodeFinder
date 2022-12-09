import React, { useCallback, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  ViewToken,
  ListRenderItemInfo,
  ListRenderItem,
  TextBase,
  Text,
} from "react-native";
import { MotiView } from "moti";
import useFiberColor from "../../hooks/useFiberColor";
import useTubeNumber from "../../hooks/useTubeNumber";
import { fiberColorDictionary } from "../utilities/utilities";
import FiberInput from "./FiberInput";
import Redlight from "./Redlight";
import { FiberContext } from "./ScrollableFiber";

const screenWidth = Dimensions.get("screen").width;
const itemSize = screenWidth - 80;

interface Props {
  fiber: number;
  setFiberCableNumber: (fiberNum: number) => void;
}
type FiberItem = {
  fiberColor: string;
  fiberNumber: number;
  index: number;
};

const ScrollableFiberCable = (props: Props) => {
  const ref = React.useRef<FlatList>(null);
  const scrolledToIndex = React.useRef<number>(1);
  const propsFiberRef = React.useRef<number>(props.fiber);
  const fiberContext = React.useContext(FiberContext);
  const remainder = propsFiberRef.current % 12;
  const base = propsFiberRef.current - remainder;
  const tubeNumber = base / 12;
  const offset = seperatorWidth * tubeNumber + 25;
  const tube = useTubeNumber(fiberContext)

  React.useEffect(() => {
    if (fiberContext) {
      console.log("changing fiber: ", fiberContext.fiber);
      console.log("tube: ", tube);
      // fiberContext.setFiber(propsFiberRef.current)
      if (fiberContext.fiber % 12 === 0 ) {//changes to new tube when forward but not backwards
        console.log("fiber context is at 11 or 12?")
        propsFiberRef.current = fiberContext.fiber;
      }
    }
    ref.current?.scrollToIndex({
      animated: true,
      index: tubeNumber + 1,
      viewPosition: 0.5,
      viewOffset: itemSize - offset + seperatorWidth * (tubeNumber + 2),
    });
  }, [fiberContext]);

  React.useEffect(() => {
    console.log("changing tube: ", tubeNumber);
    if (fiberContext) {
      // fiberContext.setFiber(propsFiberRef.current)
      // propsFiberRef.current = fiberContext.fiber;
    }
    ref.current?.scrollToIndex({
      animated: true,
      index: tubeNumber + 1,
      viewPosition: 0.5,
      viewOffset: itemSize - offset + seperatorWidth * (tubeNumber + 2),
    });
  }, [propsFiberRef.current]);

  const createData = () => {
    const myArray = Array.from({ length: 20 }, (_, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e), fiberNumber: e, index: i };
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
      if (viewableItems.length > 0) {
        scrolledToIndex.current = firstViewableFiberCableNumber;
        const cableBase = (firstViewableFiberCableNumber - 1) * 12;
        const newFiber = cableBase + propsFiberRef.current;
        propsFiberRef.current = newFiber;
        if (fiberContext) {
          fiberContext.setFiber(propsFiberRef.current);
        }

        console.log("new fiber: ", newFiber);
      }
    },
    []
  );

  const viewabilityConfig = {
    minimumViewTime: 150,
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
  };

  const renderItem: ListRenderItem<FiberItem> = ({
    item,
  }: {
    item: FiberItem;
  }) => {
    return (
      <View
        style={{
          width: itemSize,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: item.fiberColor,
          marginLeft: item.index === 0 ? 25 : 0,
        }}
      ></View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        horizontal
        data={createData()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        onViewableItemsChanged={viewableItemsChanged}
        // viewabilityConfigCallbackPairs={useRef([{viewabilityConfig: viewabilityConfig, onViewableItemsChanged: viewableItemsChanged}]).current}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index + seperatorWidth * (index + 1),
          index: index,
        })}
        snapToInterval={itemSize + seperatorWidth}
        decelerationRate={0.88}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={3}
      />
    </View>
  );
};

const seperatorWidth = 40;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.93,
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
