import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { View, Animated, Dimensions, PanResponder } from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
type Props = {
  children: ReactNode[];
};
const SwipeableCardDeck = ({ children }: Props) => {
  const childArray = Children.toArray(children); //ensures children will be array

  //then move guaranteed children array into state
  const [cardArray, setCardArray] = useState(
    childArray.map((component) => cardBuilder(component))
  );
  const BASEOFFSET = -30;

  //whenever state changes, bring all cards back to correct position in an offset deck
  useEffect(() => {
    cardArray.map((card, index) => {
      const offset = BASEOFFSET * index;
      Animated.spring(card.yPosition, {
        toValue: offset,
        speed: 5,
        useNativeDriver: false,
      }).start();
    });
  }, [cardArray]);

  //gives card slight rotation when swiping vertically
  const rotateCard = (yPosition: Animated.Value) => {
    return yPosition.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 10, SCREEN_WIDTH / 2],
      outputRange: ["-15deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });
  };

  //gives each card a seperate gesture reader and seperate y coordinates to keep track of itself
  //when card is swiped far enough, triggers state change which moves card to back of deck
  function cardBuilder(component: ReactNode) {
    const yPosition = useRef(new Animated.Value(0)).current;
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        yPosition.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (
          // if swipe up or down isnt far enough, bring back to center
          gestureState.dy > -SCREEN_HEIGHT / 2 + 200 &&
          gestureState.dy < SCREEN_HEIGHT / 2 - 200
        ) {
          //animates card back to center
          Animated.spring(yPosition, {
            toValue: 0,
            speed: 5,
            bounciness: 5,
            useNativeDriver: false,
          }).start();
        } else {
          //swipe was far enough up or down, move card out
          if (gestureState.dy < -SCREEN_HEIGHT / 2 + 200) {
            //swiped up
            Animated.timing(yPosition, {
              toValue: -SCREEN_HEIGHT,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            //swiped down
            Animated.timing(yPosition, {
              toValue: SCREEN_HEIGHT,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
          //moves card from index 0 to last index in state call
          setCardArray((prevDeck) => {
            let copyDeck = [...prevDeck];
            const cardToMove = copyDeck.shift()!;
            copyDeck.push(cardToMove);
            return copyDeck;
          });
        }
      },
    });
    return {
      component: component,
      panResponder: panResponder,
      yPosition: yPosition,
    };
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {cardArray.map((component, index) => (
        <Animated.View
          {...cardArray[index].panResponder.panHandlers}
          key={index}
          style={{
            height: SCREEN_HEIGHT - 140,
            width: SCREEN_WIDTH - 40,
            padding: 10,
            position: "absolute",
            backgroundColor: "gray",
            borderRadius: 10,
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 2,
            transform: [
              { translateY: cardArray[index].yPosition },
              { rotate: rotateCard(cardArray[index].yPosition) },
            ],
          }}
        >
          {component.component}
        </Animated.View>
      )).reverse()}
    </View>
  );
};
export default SwipeableCardDeck;
