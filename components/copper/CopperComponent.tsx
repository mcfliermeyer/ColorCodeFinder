import { View } from "react-native";
import React from "react";
import CopperInput from "./CopperInput";
import CopperPairSelector from "./CopperPairSelector";
import TouchableCopperPairComponent from "./TouchableCopperPairComponent";

const CopperComponent = () => {
  const [pair, setPair] = React.useState(1);
  const [pairSelectorVisible, setPairSelectorVisible] = React.useState(false);
  const addPair = () => {
    setPair((oldPair) => {
      if (oldPair >= 0) return oldPair + 1;
      return 1;
    });
  };
  const subtractPair = () => {
    setPair((oldPair) => {
      if (oldPair > 1) return oldPair - 1;
      return 1;
    });
  };
  const setPairNumber = (newPair: number) => {
    setPair(() => newPair);
  };
  const handlePress = () => {
    setPairSelectorVisible(true);
  };
  const handlePairSelected = (pairSelected: number) => {
    setPairSelectorVisible((oldValue) => !oldValue);
    setPair(() => pairSelected);
  };
  return (
    <View>
      <CopperPairSelector
        handlePairSelected={handlePairSelected}
        pairSelectorVisible={pairSelectorVisible}
      />
      <TouchableCopperPairComponent handlePress={handlePress} pair={pair} />
      <CopperInput
        pair={pair}
        setPair={setPairNumber}
        addPair={addPair}
        subtractPair={subtractPair}
      />
    </View>
  );
};
export default CopperComponent;
