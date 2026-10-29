export default function useFormattedNumber(number) {
  if(number === undefined) {
    return 0
  }
  const million = 1000000;
  const thousand = 1000;

  function formatNumber() {
    if (number >= million) {
      return (number / million).toFixed(1) + "M";
    } else if (number >= thousand) {
      return (number / thousand).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }

  return formatNumber();
}
