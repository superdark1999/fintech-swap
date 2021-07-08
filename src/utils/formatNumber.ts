export default (number: Number) => {
  return new Intl.NumberFormat().format(+number.toFixed(2))
}