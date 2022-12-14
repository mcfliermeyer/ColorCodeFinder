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
import ScrollableFiberCable from "./ScrollableFiberCable";

export type FiberContextType = {
  fiber: number;
  setFiber: React.Dispatch<React.SetStateAction<number>>;
};
export const FiberContext = React.createContext<FiberContextType | null>(null);

const screenWidth = Dimensions.get("screen").width;
const horizontalMargin = 50;
const itemSize = (screenWidth - horizontalMargin * 2) / 6;

// need to resize margins and make sure any changes with const above will keep
// flatlist items cenetered.

const ScrollableFiber = () => {
  const ref = React.useRef<FlatList>(null);
  const [fiber, setFiber] = React.useState(1);
  const scrolledToIndex = React.useRef<number>(fiber);
  const isFirstRender = React.useRef(true);
  const fiberContext = React.useContext(FiberContext);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      viewPosition: 0.5,
      index: fiber + 3,
    });
    if (isFirstRender.current) {
      //hack to center both fiber and cable in flatlist.
      isFirstRender.current = false;
      setTimeout(() => {
        addFiber();
        subtractFiber();
      }, 100);
    }
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
  const setFiberNumber = React.useCallback((newFiber: number) => {
    setFiber(newFiber);
  }, []);

  // right here we need to check fibernum to add or subtract 12 from it per which cable we scrolled to
  const setFiberCableNumber = (oldFiber: number) => {
    setFiber(() => oldFiber);
  };

  const createData = () => {
    const myArray = Array.from({ length: 50 }, (e, i) => i + 1);
    const mapped = myArray.map((e, i) => {
      return { fiberColor: useFiberColor(e - 4), fiberNumber: e - 4 };
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
      const firstViewableFiberNumber: number =
        viewableItems[0]?.item.fiberNumber;
      if (viewableItems.length > 0) {
        scrolledToIndex.current = firstViewableFiberNumber + 4; //plus 2 so it doesnt backtrack by 2 to center list
      }
    },
    []
  );

  const tubeChanged = (tubeDifference: number) => {
    setFiber((prevFiber) => prevFiber + tubeDifference);
  };

  const scrollEnded = () => {
    setFiber(scrolledToIndex.current);
  };

  const viewabilityConfig = {
    minimumViewTime: 0,
    waitForInteraction: true,
    itemVisiblePercentThreshold: 10,
  };

  const fiberViewDimensions = (fiberNum: number, fiberColor: string) => {
    const difference =
      fiberNum - fiber >= 0 ? fiberNum - fiber : fiber - fiberNum;
    if (fiberNum <= 0) return { height: 0, backgroundColor: fiberColor };
    else if (difference === 3)
      return { height: 10, backgroundColor: fiberColor };
    else if (difference === 2)
      return { height: 20, backgroundColor: fiberColor };
    else if (difference === 1)
      return { height: 50, backgroundColor: fiberColor };
    else if (fiberNum === fiber)
      return {
        height: 110,
        backgroundColor: fiberColor,
      };
    else return { height: 0, backgroundColor: fiberColor };
  };

  return (
    <FiberContext.Provider value={{ fiber, setFiber }}>
      <View style={styles.container}>
        <FlatList
          ref={ref}
          style={styles.flatlist}
          data={createData()}
          keyExtractor={(item, index) =>
            fiberColorDictionary[index] + `${index}`
          }
          horizontal={true}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={itemSize}
          getItemLayout={(data, index) => ({
            length: itemSize,
            offset: itemSize * index - index * 10,
            index: index,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={scrollEnded}
          maxToRenderPerBatch={5}
          renderItem={({ item, index }) => (
            <View style={styles.view}>
              {fiber === item.fiberNumber && <Redlight />}
              <MotiView
                style={styles.animatedView}
                from={{ height: 10 }}
                animate={fiberViewDimensions(item.fiberNumber, item.fiberColor)}
                transition={{
                  type: "timing",
                  duration: 250,
                }}
              />
            </View>
          )}
        />
        <ScrollableFiberCable
          fiber={fiber}
          tubeChanged={tubeChanged}
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
    </FiberContext.Provider>
  );
};
export default ScrollableFiber;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  flatlist: {
    flexGrow: 0,
    height: 150,
    width: screenWidth - 30,
    backgroundColor: "#424549",
  },
  fiberInputWrapper: {
    margin: 15,
  },
  view: {
    width: itemSize,
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: -10,
  },
  animatedView: {
    width: itemSize,
    height: 10,
    borderTopStartRadius: 3,
    borderTopEndRadius: 3,
  },
});
