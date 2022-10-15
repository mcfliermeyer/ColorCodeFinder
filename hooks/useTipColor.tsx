type Props = { pairNumber: number };
enum TipColor {
  White = 0,
  Red,
  Black,
  Yellow,
  Violet,
}
const useTipColor = (pairNumber: number) => {
  const ringNumber =
    pairNumber <= 25
      ? (pairNumber - 1 - ((pairNumber - 1) % 5)) / 5
      : (((pairNumber % 25 - 2 - ((pairNumber % 25 - 2) % 5))) / 5);
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
      return "violet";
    default:
      return "aqua";
  }
};
export default useTipColor;
