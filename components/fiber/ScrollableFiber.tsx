import React, { useCallback } from "react";
import SVG, { Rect } from "react-native-svg";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { MotiView } from "moti";
import useFiberColor from "../../hooks/useFiberColor";
import { fiberColorDictionary } from "../utilities/utilities";
import FiberInput from "./FiberInput";

const screenWidth = Dimensions.get("screen").width;
const horizontalMargin = 50;
const fiberMargin = 4;
const itemSize = (screenWidth - horizontalMargin * 2) / 5;



const ScrollableFiber = () => {
  const ref = React.useRef<FlatList>(null);
  const [fiber, setFiber] = React.useState(3);
  const scrolledToIndex = React.useRef<number>(fiber);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index: fiber + 1,
      viewPosition: 0.5,
    });
  }, [fiber]);

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

  const createData = () => {
    const myArray = Array.from({ length: 24 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e - 2), fiberNumber: e - 2 };
    });
    return mapped;
  };

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    const firstViewableFiberNumber: number = viewableItems[0].item.fiberNumber;
    if (viewableItems.length > 0) {
      scrolledToIndex.current = firstViewableFiberNumber;
    }
  }, []);

  const scrollEnded = () => {
    // needs setTimeout because snapToInterval still needs to run, then scrolledToIndex needs
    // to get updated and the scroll might still be scrolling
    setTimeout(() => {
      setFiber(scrolledToIndex.current);
    }, 300);
  };

  const viewabilityConfig = {
    minimumViewTime: 0,
    waitForInteraction: true,
    itemVisiblePercentThreshold: 10,
  };

  //helper for height of svg to see if its in view of flatlist
  const isInView = (fiberNum: number) => {
    if (fiberNum < fiber - 2 || fiberNum > fiber + 2) {
      return false;
    }
    return true;
  };
  //flatlist height of svgs in view
  const fiberHeight = (fiberNum: number) => {
    if (fiberNum <= 0) return 0; //adding first 2 spots to be empty
    if (fiberNum === fiber - 2) return 20;
    if (fiberNum === fiber - 1) return 50;
    if (fiberNum === fiber) return 100;
    if (fiberNum === fiber + 1) return 50;
    if (fiberNum === fiber + 2) return 20;
    return 0;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        style={styles.flatlist}
        data={createData()}
        initialScrollIndex={fiber - 1}
        keyExtractor={(item, index) => fiberColorDictionary[index] + `${index}`}
        horizontal={true}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={itemSize}
        getItemLayout={(data, index) => ({
          length: itemSize,
          offset: itemSize * index,
          index: index,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollEndDrag={scrollEnded}
        renderItem={({ item, index }) => (
          <View style={styles.view}>
            <MotiView
              style={styles.animatedView}
              from={{ height: 50 }}
              animate={{
                height: isInView(item.fiberNumber) ? fiberHeight(item.fiberNumber) : 0,
                backgroundColor: item.fiberColor
              }}
              transition={{
                type: "timing",
                duration: 500,
              }}
            />
          </View>
        )}
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
    backgroundColor: "#424549",
  },
  view: {
    width: itemSize - fiberMargin * 2,
    height: 150,
    marginHorizontal: fiberMargin,
    justifyContent: "flex-end",
  },
  fiberInputWrapper: {
    margin: 15,
  },
  animatedView: {
    margin: 15,
    width: 20,
  },
});
