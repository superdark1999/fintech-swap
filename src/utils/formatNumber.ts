export const formatNumber = (number: Number) => {
  return Intl.NumberFormat().format(+number)
}