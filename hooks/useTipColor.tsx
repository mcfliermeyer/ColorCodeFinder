type Props = { pairNumber: number };
enum TipColor {
  White = 0,
  Red,
  Black,
  Yellow,
  Violet,
}
const useTipColor = (pairNumber: number) => {
  let pair = pairNumber;
  if (pairNumber > 25) {
    pair = pairNumber % 25;
    if (pair === 0) {
      return "mediumorchid";
    }
  }
  const ringNumber = (pair - 1 - ((pair - 1) % 5)) / 5;
  switch (ringNumber) {
    case TipColor.White:
      return "white";
    case TipColor.Red:
      return "red";
    case TipColor.Black:
      return "black";
    case TipColor.Yellow:
      return "yellow";
    case TipColor.Violet:
      return "mediumorchid";
    default:
      return "aqua";
  }
};
export default useTipColor;
