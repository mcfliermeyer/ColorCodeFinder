type Props = { pairNumber: number };
enum TipColor {
  White = 1,
  Red,
  Black,
  Yellow,
  Violet,
}
const useTipColor = ({ pairNumber }: Props) => {
  const ringNumber = (pairNumber % 5) + 1;
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
      console.log("tip pair not uhmmm its out of bounds morty");
  }
};
export default useTipColor;
