import React, { useCallback } from "react";
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
import { fiberColorDictionary } from "../utilities/utilities";
import FiberInput from "./FiberInput";
import Redlight from "./Redlight";

const screenWidth = Dimensions.get("screen").width;
const itemSize = screenWidth - 80;

interface Props {
  fiber: number;
  setFiberCableNumber: (cableNum: number) => void;
}
type FiberItem = {
  fiberColor: string;
  fiberNumber: number;
  index: number;
};

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
      viewOffset: itemSize - offset + seperatorWidth * (tubeNumber + 2), 
    });
  }, [props.fiber]);

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
      console.log("item changing detected");

      const firstViewableFiberCableNumber: number =
        viewableItems[0]?.item.fiberNumber;
      if (viewableItems.length > 0) {
        scrolledToIndex.current = firstViewableFiberCableNumber;
        console.log("item changing detected", firstViewableFiberCableNumber);

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
      >
        <Text>{item.fiberNumber}</Text>
      </View>
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
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index + (seperatorWidth * (index + 1)),
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
