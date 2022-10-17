import React, { useCallback } from "react";
import { LayoutChangeEvent } from "react-native";
const useComponentSize = () => {
  const [size, setSize] = React.useState<{
    height: number;
    width: number;
  } | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(width)
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
export default useComponentSize;
