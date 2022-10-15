enum RingColor {
  Blue = 1,
  Orange,
  Green,
  Brown,
  Slate,
}
const useRingColor = (pairNumber: number) => {
  const ringNumber = (pairNumber % 5);
  switch (ringNumber) {
    case RingColor.Blue:
      return "blue";
    case RingColor.Orange:
      return "orange";
    case RingColor.Green:
      return "green";
    case RingColor.Brown:
      return "sienna";
    case RingColor.Slate:
      return "slategray";
    default:
      return "slategray";
  }
};
export default useRingColor;
