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
  const tubeRef = React.useRef<number | null>(1);
  const fiberContext = React.useContext(FiberContext);
  const remainder = propsFiberRef.current % 12;
  const base = propsFiberRef.current - remainder;
  const tubeNumber = base / 12;
  const offset = seperatorWidth * tubeNumber + 25;
  const tube = useTubeNumber(fiberContext);

  React.useEffect(() => {
    if (tubeRef.current !== useTubeNumber(fiberContext)) {
      tubeRef.current = useTubeNumber(fiberContext);
      if (tubeRef.current) {
        ref.current?.scrollToIndex({
          animated: true,
          index: tubeRef.current,
          viewPosition: 0.5,
          viewOffset: itemSize - offset + seperatorWidth * (tubeNumber + 2),
        });
      }
    }
  }, [fiberContext]);

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
        //check difference in tubeRef and multiply by 12 and add or subtract depending on left or right swipe
        if (
          tubeRef.current &&
          tubeRef.current < firstViewableFiberCableNumber
        ) {
          propsFiberRef.current = propsFiberRef.current + cableBase;
          console.log("we swiped to higher cable");
        } else {
          console.log(
            "we swiped to lower cable ",
            cableBase
          )

          propsFiberRef.current = propsFiberRef.current - cableBase;
        }
        //will need to check if viewableitems is greater or less than prev, to subtract or add to current fiber
        if (fiberContext) {
          fiberContext.setFiber(propsFiberRef.current);
          // tubeRef.current = useTubeNumber(fiberContext);
        }
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
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
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
