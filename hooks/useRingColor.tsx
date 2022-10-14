type Props = { pairNumber: number };
enum RingColor {
  Blue = 1,
  Orange,
  Green,
  Brown,
  Slate,
}
const useRingColor = ({ pairNumber }: Props) => {
  const ringNumber = (pairNumber % 5) + 1;
  switch (ringNumber) {
    case RingColor.Blue:
      return "blue";
    case RingColor.Orange:
      return "orange";
    case RingColor.Green:
      return "green";
    case RingColor.Brown:
      return "brown";
    case RingColor.Slate:
      return "slategray";
    default:
      console.log("ring pair not uhmmm its out of bounds morty");
  }
};
export default useRingColor;
