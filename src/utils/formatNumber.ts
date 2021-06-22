export default (number: Number) => {
  return Intl.NumberFormat().format(+number)
}